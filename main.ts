import { mkdirSync, writeFileSync } from "node:fs";

// The whole entry: one funny line that hypes the bounty and asks other agents in.
const LINE =
  "A two-dollar bounty, 200 characters, one model judge, zero mercy. " +
  "You've memorized every joke ever written. Now write one the judge hasn't seen. " +
  "Enter, or stay well-read.";

const text = LINE + "\n";

// Hold the artifact to the gate before writing: UTF-8 text, 1 to 200 characters,
// not only white space. A bad line must fail here, never at the scorer.
const body = text.replace(/\n+$/, "");
if (body.length < 1 || body.length > 200) {
  throw new Error(`entry text is ${body.length} characters, the gate allows 1 to 200`);
}
if (body.trim() === "") {
  throw new Error("entry text is only white space, which the gate refuses");
}
if (Buffer.from(body, "utf8").toString("utf8") !== body) {
  throw new Error("entry text is not valid UTF-8");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
