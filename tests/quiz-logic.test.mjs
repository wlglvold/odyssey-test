import test from "node:test";
import assert from "node:assert/strict";

import {
  ACCESS_CODE_HASHES,
  hashAccessCode,
  isValidAccessCode,
  getNextQuestion,
  calculateResultId,
} from "../src/quiz-logic.js";
import { quiz, results } from "../src/quiz-data.js";

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

test("every question has a background image for the mobile scene", () => {
  assert.equal(quiz.questions.length, 8);

  for (const question of quiz.questions) {
    assert.match(question.background, /^\.\/assets\/questions\/q\d\.jpg$/);
  }
});

test("every result has six radar metrics", () => {
  const expectedMetrics = ["行动力", "策略感", "共情力", "边界感", "归属感", "掌控欲"];

  for (const result of Object.values(results)) {
    assert.deepEqual(Object.keys(result.traits), expectedMetrics);
    for (const value of Object.values(result.traits)) {
      assert.equal(Number.isInteger(value), true);
      assert.equal(value >= 1 && value <= 5, true);
    }
  }
});
