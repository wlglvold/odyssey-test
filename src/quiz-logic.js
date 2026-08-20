import { quiz } from "./quiz-data.js";

export const ACCESS_CODE_HASHES = [
  "a3bebc56ed020decc920f05cef4fe99d5acaa1cbcd19f987e99d1efce3dfada9",
];

export function normalizeAccessCode(code) {
  return String(code || "").trim().toUpperCase();
}

export async function hashAccessCode(code) {
  const normalized = normalizeAccessCode(code);

  if (globalThis.crypto?.subtle) {
    const bytes = new TextEncoder().encode(normalized);
    const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(digest)]
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(normalized).digest("hex");
}

export async function isValidAccessCode(code) {
  const hash = await hashAccessCode(code);
  return ACCESS_CODE_HASHES.includes(hash);
}

export function getNextQuestion(currentIndex) {
  const nextIndex = currentIndex + 1;
  return nextIndex < quiz.questions.length ? nextIndex : null;
}

export function calculateScores(answerResultIds) {
  return answerResultIds.reduce((scores, resultId, index) => {
    if (!resultId) return scores;

    const weight = quiz.questions[index]?.weight || 1;
    scores[resultId] = (scores[resultId] || 0) + weight;
    return scores;
  }, {});
}

export function calculateResultId(answerResultIds) {
  const scores = calculateScores(answerResultIds);
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topScore = ranked[0]?.[1];

  if (topScore == null) return null;

  const tiedResultIds = ranked
    .filter(([, score]) => score === topScore)
    .map(([resultId]) => resultId);
  const finalAnswer = answerResultIds[quiz.questions.length - 1];

  if (tiedResultIds.includes(finalAnswer)) {
    return finalAnswer;
  }

  return ranked[0][0];
}
