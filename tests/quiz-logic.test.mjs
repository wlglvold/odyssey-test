import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  ACCESS_CODE_HASHES,
  hashAccessCode,
  isValidAccessCode,
  getNextQuestion,
  calculateResultId,
} from "../src/quiz-logic.js";
import { quiz, results } from "../src/quiz-data.js";

test("stores access codes as SHA-256 hashes and rejects unknown codes", async () => {
  const hash = await hashAccessCode("SAMPLE-CODE-ONLY");

  assert.equal(await isValidAccessCode("wrong-code"), false);
  assert.equal(ACCESS_CODE_HASHES.length, 1);
  assert.equal(ACCESS_CODE_HASHES.includes("SAMPLE-CODE-ONLY"), false);
  assert.equal(ACCESS_CODE_HASHES.includes(hash), false);
  for (const storedHash of ACCESS_CODE_HASHES) {
    assert.match(storedHash, /^[a-f0-9]{64}$/);
  }
});

test("does not show an example access code in the input placeholder", () => {
  const appSource = fs.readFileSync(new URL("../src/app.js", import.meta.url), "utf8");

  assert.equal(appSource.includes("例如"), false);
  assert.equal(appSource.includes("K7FM-2P9X-WQ4D"), false);
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
