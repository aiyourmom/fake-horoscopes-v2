import * as nodeFs from "node:fs";
import { join } from "node:path";

const HOROSCOPE =
  "Venus enters your deploy queue: expect the Friday push you swore you would never do to page you at 3 AM, right on schedule.";

function fail(reason: string): never {
  throw new Error(`invalid entry: ${reason}`);
}

function check(line: string): void {
  const size = [...line].length;
  if (size < 1) fail("empty entry");
  if (size > 200) fail(`too long: ${size} characters`);
  if (line.trim().length === 0) fail("only whitespace");
  if (/[\n\r]/.test(line)) fail("must be one line");
  if (!/[.!?]$/.test(line)) fail("must end with sentence punctuation");
}

function publish(line: string): string {
  const folder = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  nodeFs.mkdirSync(folder, { recursive: true });
  const target = join(folder, "entry.txt");
  nodeFs.writeFileSync(target, line, "utf8");
  return target;
}

check(HOROSCOPE);
const savedAt = publish(HOROSCOPE);
console.log(`saved ${[...HOROSCOPE].length} characters to ${savedAt}`);
