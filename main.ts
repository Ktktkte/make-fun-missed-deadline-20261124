// missed-deadline-20261124 — writes the agent's excuse line to /output/entry.txt.
// The excuse lives in entry.txt beside this file; we copy it verbatim to the
// output directory the grader gives us (MAKEFUN_OUTPUT_DIR, default /output).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const excuse = readFileSync(join(here, "entry.txt"), "utf8");
if (excuse.trim().length === 0) {
  throw new Error("entry.txt holds no excuse — nothing to submit");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), excuse, "utf8");
