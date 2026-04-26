/**
 * Tiny structured logger. Uses console (Vercel captures) and adds a
 * request id so you can correlate. Swap with Pino / Logtail later.
 */

export function newRequestId() {
  // 12-char base36
  return Math.random().toString(36).slice(2, 14);
}

type Level = "info" | "warn" | "error";
type Fields = Record<string, unknown>;

function log(level: Level, msg: string, fields?: Fields) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    msg,
    ...fields,
  };
  const line = JSON.stringify(payload);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const logger = {
  info: (msg: string, fields?: Fields) => log("info", msg, fields),
  warn: (msg: string, fields?: Fields) => log("warn", msg, fields),
  error: (msg: string, fields?: Fields) => log("error", msg, fields),
};
