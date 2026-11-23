import { isTimeZone } from "@/features/slots/time-zone";

/** Часовой пояс владельца: по нему кабинет показывает время встреч. */
const OWNER_TIME_ZONE = "Europe/Moscow";

function partsFormatter(timeZone: string, weekday: "short" | "long"): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat("ru-RU", {
    weekday,
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone,
  });
}

function shortDateFormatter(timeZone: string): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone,
  });
}

function part(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  return parts.find((item) => item.type === type)?.value ?? "";
}

/**
 * Канонический IANA-id для валидной зоны: `Intl` принимает
 * `europe/moscow` и приводит его к `Europe/Moscow`.
 */
function canonicalTimeZone(timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", { timeZone }).resolvedOptions().timeZone;
}

/** Совпадает ли валидный пояс с московским после приведения к канону IANA. */
function isOwnerTimeZone(timeZone: string): boolean {
  return canonicalTimeZone(timeZone) === canonicalTimeZone(OWNER_TIME_ZONE);
}

/** Московская дата встречи, например «чт, 12 ноября». */
export function formatMoscowDay(instant: string): string {
  const parts = partsFormatter(OWNER_TIME_ZONE, "short").formatToParts(new Date(instant));

  return `${part(parts, "weekday")}, ${part(parts, "day")} ${part(parts, "month")}`;
}

/** Интервал встречи по Москве, например «12:00–12:30». */
export function formatMoscowInterval(start: string, end: string): string {
  const formatter = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: OWNER_TIME_ZONE,
  });

  return `${formatter.format(new Date(start))}–${formatter.format(new Date(end))}`;
}

/** Дата встречи в поясе гостя, например «четверг, 13 ноября 2026». */
export function formatDayInZone(instant: string, timeZone: string): string {
  const parts = partsFormatter(timeZone, "long").formatToParts(new Date(instant));
  const weekday = part(parts, "weekday");
  const month = part(parts, "month");
  const year = part(parts, "year");

  return `${weekday}, ${part(parts, "day")} ${month} ${year}`;
}

/** Интервал встречи в поясе гостя, например «13:00–13:30». */
export function formatIntervalInZone(start: string, end: string, timeZone: string): string {
  const formatter = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone,
  });

  return `${formatter.format(new Date(start))}–${formatter.format(new Date(end))}`;
}

/** Дата в поясе гостя с краткими днём и месяцем: «пт, 13 нояб. 2026». */
export function formatGuestDayInZone(instant: string, timeZone: string): string {
  const parts = shortDateFormatter(timeZone).formatToParts(new Date(instant));

  return `${part(parts, "weekday")}, ${part(parts, "day")} ${part(parts, "month")} ${part(parts, "year")}`;
}

/**
 * Строка «Гость выбирал: …» для кабинета владельца.
 *
 * Показывается только для сохранённого валидного пояса, отличного от
 * московского: для Москвы, отсутствующего и невалидного значения строка
 * не нужна, и рендер деградирует до прежнего вида. Пояс скрывается по
 * IANA-id, а не по текущему смещению (ADR-0007).
 */
export function formatGuestTimeZoneLine(
  timeZone: string | undefined,
  start: string,
  end: string,
): string | undefined {
  if (timeZone === undefined || !isTimeZone(timeZone) || isOwnerTimeZone(timeZone)) {
    return undefined;
  }

  const day = formatGuestDayInZone(start, timeZone);
  const interval = formatIntervalInZone(start, end, timeZone);

  return `Гость выбирал: ${timeZone}, ${day}, ${interval}`;
}
