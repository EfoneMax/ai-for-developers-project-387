import { describe, expect, it } from "vitest";
import {
  formatDayInZone,
  formatGuestDayInZone,
  formatGuestTimeZoneLine,
  formatIntervalInZone,
  formatMoscowDay,
  formatMoscowInterval,
} from "./format";

describe("время встречи в кабинете владельца", () => {
  it("показывает московскую дату и интервал", () => {
    expect(formatMoscowDay("2026-11-13T06:00:00.000Z")).toBe("пт, 13 ноября");
    expect(formatMoscowInterval("2026-11-13T06:00:00.000Z", "2026-11-13T06:30:00.000Z")).toBe(
      "09:00–09:30",
    );
  });

  it("переносит дату по Москве, даже если в UTC ещё предыдущий день", () => {
    expect(formatMoscowDay("2026-11-12T21:30:00.000Z")).toBe("пт, 13 ноября");
    expect(formatMoscowInterval("2026-11-12T21:30:00.000Z", "2026-11-12T22:00:00.000Z")).toBe(
      "00:30–01:00",
    );
  });
});

describe("время встречи в поясе гостя", () => {
  it("показывает дату и интервал в выбранном поясе", () => {
    expect(formatDayInZone("2026-11-13T06:00:00.000Z", "Europe/Berlin")).toBe(
      "пятница, 13 ноября 2026",
    );
    expect(
      formatIntervalInZone("2026-11-13T06:00:00.000Z", "2026-11-13T06:30:00.000Z", "Europe/Berlin"),
    ).toBe("07:00–07:30");
  });

  it("переносит дату при переходе через полночь по поясу гостя", () => {
    expect(formatDayInZone("2026-11-13T22:30:00.000Z", "Asia/Tokyo")).toBe(
      "суббота, 14 ноября 2026",
    );
  });
});

describe("строка пояса гостя в кабинете владельца", () => {
  it("форматирует пояс, местную дату и интервал по примеру Berlin", () => {
    expect(
      formatGuestTimeZoneLine(
        "Europe/Berlin",
        "2026-11-13T06:00:00.000Z",
        "2026-11-13T06:30:00.000Z",
      ),
    ).toBe("Гость выбирал: Europe/Berlin, пт, 13 нояб. 2026, 07:00–07:30");
  });

  it("переносит местную дату через полночь", () => {
    expect(
      formatGuestTimeZoneLine("Asia/Tokyo", "2026-11-13T22:30:00.000Z", "2026-11-13T23:00:00.000Z"),
    ).toBe("Гость выбирал: Asia/Tokyo, сб, 14 нояб. 2026, 07:30–08:00");
  });

  it("показывает минутный интервал и краткие день и месяц", () => {
    expect(formatGuestDayInZone("2026-11-13T06:00:00.000Z", "Europe/Berlin")).toBe(
      "пт, 13 нояб. 2026",
    );
    expect(
      formatGuestTimeZoneLine(
        "Europe/Berlin",
        "2026-11-13T06:00:00.000Z",
        "2026-11-13T06:45:00.000Z",
      ),
    ).toContain("07:00–07:45");
  });

  it("скрывает строку для Москвы, отсутствующего и невалидного пояса", () => {
    const start = "2026-11-13T06:00:00.000Z";
    const end = "2026-11-13T06:30:00.000Z";

    expect(formatGuestTimeZoneLine("Europe/Moscow", start, end)).toBeUndefined();
    expect(formatGuestTimeZoneLine(undefined, start, end)).toBeUndefined();
    expect(formatGuestTimeZoneLine("Not/AZone", start, end)).toBeUndefined();
  });

  it("скрывает строку для московского пояса в любом регистре", () => {
    const start = "2026-11-13T06:00:00.000Z";
    const end = "2026-11-13T06:30:00.000Z";

    expect(formatGuestTimeZoneLine("Europe/Moscow", start, end)).toBeUndefined();
    expect(formatGuestTimeZoneLine("europe/moscow", start, end)).toBeUndefined();
  });

  it("показывает строку для не-московского пояса в нижнем регистре", () => {
    expect(
      formatGuestTimeZoneLine(
        "europe/berlin",
        "2026-11-13T06:00:00.000Z",
        "2026-11-13T06:30:00.000Z",
      ),
    ).toBe("Гость выбирал: europe/berlin, пт, 13 нояб. 2026, 07:00–07:30");
  });
});
