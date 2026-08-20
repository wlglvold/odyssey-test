import { createHash, randomBytes } from "node:crypto";

const count = Number(process.argv[2] || 10);
const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function segment(length) {
  let value = "";
  while (value.length < length) {
    const byte = randomBytes(1)[0];
    value += alphabet[byte % alphabet.length];
  }
  return value;
}

function createCode() {
  return `${segment(4)}-${segment(4)}-${segment(4)}`;
}

function hashCode(code) {
  return createHash("sha256").update(code.trim().toUpperCase()).digest("hex");
}

const codes = new Set();
while (codes.size < count) {
  codes.add(createCode());
}

console.log("明文兑换码，发给用户：");
for (const code of codes) {
  console.log(code);
}

console.log("\n复制下面这些 hash 到 src/quiz-logic.js 的 ACCESS_CODE_HASHES：");
for (const code of codes) {
  console.log(`  "${hashCode(code)}",`);
}
