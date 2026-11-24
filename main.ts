// Fortune in a Pot — one kind, funny fortune for a houseplant.
// The program writes a single line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falling back to /output/entry.txt), where the gate scorer checks it
// is UTF-8 text of 1 to 120 characters.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Your roots will find the drainage hole this week and treat it like a window to the world.";

// Guard: the sealed gate scorer requires 1 to 120 characters, one line,
// not only white space. Count code-points, the way the scorer counts
// UTF-8 text, and fail loudly instead of writing an invalid entry.
const len = [...LINE].length;
if (len < 1 || len > 120) {
  throw new Error(`fortune is ${len} characters, gate is 1-120`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("fortune must be a single non-empty line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
