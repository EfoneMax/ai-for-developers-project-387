/**
 * Собирает отчёт о состоянии опубликованного приложения.
 *
 * Скрипт не меняет приложение и не требует секретов: он проверяет health,
 * каталог типов встреч и доступность страниц. Результат печатается JSON в
 * stdout; workflow сохраняет его артефактом и передаёт агенту.
 */

const appUrl = (process.env.APP_URL ?? "").replace(/\/+$/, "");
const trainingFinding = (process.env.TRAINING_FINDING ?? "").trim();
const runUrl = process.env.RUN_URL ?? "";

const REQUEST_TIMEOUT_MS = 10_000;

/** Один запрос с таймаутом и измерением длительности. */
async function request(path) {
  const startedAt = Date.now();
  try {
    const response = await fetch(`${appUrl}${path}`, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      headers: { "user-agent": "call-booking-audit" },
    });
    const body = await response.text();

    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      contentType: response.headers.get("content-type") ?? "",
      body,
      ms: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      contentType: "",
      body: "",
      ms: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function jsonBody(result) {
  try {
    return JSON.parse(result.body);
  } catch {
    return undefined;
  }
}

async function checkHealth() {
  const result = await request("/api/health");
  const body = jsonBody(result);

  return {
    name: "health",
    ok: result.ok && body?.status === "ok",
    status: result.status,
    ms: result.ms,
    detail: result.error ?? `status=${body?.status ?? "unknown"}`,
  };
}

async function checkMeetingTypes() {
  const result = await request("/api/meeting-types");
  const body = jsonBody(result);
  const count = Array.isArray(body?.items) ? body.items.length : 0;

  return {
    name: "meeting-types",
    ok: result.ok && count > 0,
    status: result.status,
    ms: result.ms,
    detail: result.error ?? `items=${count}`,
  };
}

async function checkPage(name, path) {
  const result = await request(path);

  return {
    name,
    ok: result.ok && result.contentType.includes("text/html"),
    status: result.status,
    ms: result.ms,
    detail: result.error ?? `content-type=${result.contentType}`,
  };
}

function findingFromCheck(check) {
  return {
    id: `check-${check.name}`,
    severity: "app",
    problem: `Проверка «${check.name}» не прошла: HTTP ${check.status}, ${check.detail}.`,
    action: `Воспроизвести проверку ${check.name} на опубликованном приложении и исправить причину.`,
    evidence: check,
  };
}

async function main() {
  const report = {
    generatedAt: new Date().toISOString(),
    appUrl,
    runUrl,
    dataAvailable: false,
    checks: [],
    findings: [],
    trainingFinding: trainingFinding === "" ? undefined : trainingFinding,
  };

  if (appUrl === "") {
    report.checks.push({
      name: "app-url",
      ok: false,
      status: 0,
      ms: 0,
      detail: "APP_URL не задан в переменных репозитория",
    });
  } else {
    report.checks = await Promise.all([
      checkHealth(),
      checkMeetingTypes(),
      checkPage("landing", "/"),
      checkPage("book", "/book"),
      checkPage("owner", "/owner"),
    ]);

    report.dataAvailable = report.checks.some((check) => check.ok);
    report.findings = report.checks.filter((check) => !check.ok).map(findingFromCheck);
  }

  if (report.trainingFinding !== undefined) {
    report.findings.push({
      id: "training-1",
      severity: "training",
      problem: report.trainingFinding,
      action: "Разобрать учебную находку, не считать её подтверждённым дефектом приложения.",
      evidence: { source: "workflow_dispatch.training_finding" },
    });
  }

  console.log(JSON.stringify(report, null, 2));
}

await main();
