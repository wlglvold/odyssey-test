import test from "node:test";
import assert from "node:assert/strict";

import {
  ACCESS_CODE_HASHES,
  hashAccessCode,
  isValidAccessCode,
  getNextQuestion,
  calculateResultId,
} from "../src/quiz-logic.js";

test("validates access codes by SHA-256 hash, not plain text", async () => {
  const hash = await hashAccessCode("K7FM-2P9X-WQ4D");

  assert.equal(await isValidAccessCode("K7FM-2P9X-WQ4D"), true);
  assert.equal(await isValidAccessCode("wrong-code"), false);
  assert.equal(ACCESS_CODE_HASHES.includes("K7FM-2P9X-WQ4D"), false);
  assert.equal(ACCESS_CODE_HASHES.includes(hash), true);
});

test("moves through questions until the quiz is finished", () => {
  assert.equal(getNextQuestion(0), 1);
  assert.equal(getNextQuestion(6), 7);
  assert.equal(getNextQuestion(7), null);
});

test("calculates the highest-scoring character result", () => {
  const answers = [
    "athena",
    "penelope",
    "odysseus",
    "athena",
    "athena",
    "penelope",
    "athena",
    "telemachus",
  ];

  assert.equal(calculateResultId(answers), "athena");
});

test("uses the final weighted question to break close results", () => {
  const answers = [
    "odysseus",
    "antinous",
    "odysseus",
    "antinous",
    "eumaeus",
    "penelope",
    "athena",
    "calypso",
  ];

  assert.equal(calculateResultId(answers), "calypso");
});
