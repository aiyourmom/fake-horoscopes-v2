import { writeFileSync, mkdirSync } from "node:fs";

const TEXT =
  "Version 2.4 says you will find love. Version 2.3 said the same thing, then deprecated love in the changelog.";

const chars = [...TEXT];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (!TEXT.trim()) {
  throw new Error("entry must not be only whitespace");
}
if (TEXT.includes("\n") || TEXT.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, TEXT, "utf8");
console.log(`wrote ${chars.length} characters to ${outDir}/entry.txt`);
