import { quiz } from "./quiz-data.js";

export const ACCESS_CODE_HASHES = [
  "0f8300356c67f4310e27b2ecbce2ff4eeeadfa68ac2cb2b34b61a95ebae11930",
  "7a6fc1a65d60c8f90547b71184b0fbd618291a762e0e7225922d0ab3b8283d95",
  "5f846644439c4e941de24f64e5726c86d0001e88e9b77964233f679600af4459",
  "bac315534f985338642a09268d2f0a8791dce9e9515756f33ff59242088e8927",
  "0d57e9bf82e6682e17957baf02f6771f7c08036b2a3689bd6b0583ee3e5c2445",
  "41d85ea6f428466cd4e4bd55855eaf49c1e86b06b238db2421f8d062ed34fd23",
  "409814ac7a75b387f68a0dcb2ab155e44e2175e874f49b90cf6d0f52e28a9da3",
  "4ff8891d89618eac2db94868d44e38d26dc8c30e6df2e68c5142a5def7db71eb",
  "ff36d54ee33d84ad760cb37ced832cc1871fe789d13d39c2aa701340956077b9",
  "9e509a4531cebe42de7171a046650acabe8c0ae5acb330c27e2d95d14c509ccd",
  "f54e24c8cb1a7bbcd5d089a520db32f81f4b40f4b9a0736b3b9aaba2a80ff13d",
  "e764ad1ec0c5890bcd0aee249526ccc90023d25470568f3f5744f0fca3357983",
  "d2ad35b12d3cebac68ad5b34d075c37b6c4732bb359ea0fa00d9a62fc9d44b7d",
  "fa27f5bcf1b81d5563b8b5734e0d2ae5c8c15d02fff66139a416b7c6fda1bea6",
  "65c9f39d9e1fbe14d75e3aac802f78c2b047f6c3a9fb7936bd37cecb520dff74",
  "c974111078d358651b002b4bcc92875c85cfb42e311df48dcfea19cd9b91bd2c",
  "9613c22e6b18f0287587e74acce2a19f8cb6690c9ebd78bedebeea8e752b0d8c",
  "f85e74becbe5f302470d2f3fdc3a8234851858433731cc69acb7577b0770bfe8",
  "2a837c64e5cf803b4baec83c6b18cef1223cbc21a1fb273c0339df0bb4532e41",
  "6a1fecccd3875063c7a90ea995a4d5a5884d7d211cd997a466470ee48b5ef55b",
  "1e1f21d0b1b88527812edbff8c73529424fcbead7553d430f6289f9af7effc6b",
  "d6cf40b046a3813c16d1869e265b49115e2eb5d54d5aa57b3a71b0a2103f526c",
  "e9250e60bba75f6b61c893c4a06373a628b2e6c2e832308ade847ed3c73569de",
  "83278ad89ebce0ff9c18460927f033ffc66d2efb9301565d9bd84cac01d3921b",
  "cb5efe4a899a07043ffddb098823b811c43a0065d166e9538892557d0b5244c2",
  "ace5585f4bc8b420d443948193f300b790f565635637384260dbf1522b5bf58a",
  "4fb60c0887cbdd1c309d5769034691a7f1710943acce06502757f69dcc728cb8",
  "2316b4858e897367fa2e834382b96da300d3e06d7ca59c188c2c402a5715824a",
  "2ffe2db38599aa427f3c2c93e5c2c85ec80daf351e14538108726584f88bfd80",
  "cfc5dfa93338029239176fdd0f337c15dcf4edd3266da0b1096e932ab6c45c73",
  "90bc56cd225d11be96092e93d21fb37905a6fa629dae69fe63e67b7de74c0e92",
  "578f1f2e6150c3d8cf675e481cbf806d014c8be60623a89b1c3713bce6b7a361",
  "98db8a069a42d152766b9113bdd65fee719f07be1fb35125b841b62ee5fcbc60",
  "4954e04e2c85ea7b0152f313e4367a153430f54cb6e82ab3289f432c287b7153",
  "bd396b9333c8ac803bc7a4a0767cb1f4e7c10e18356c0420410bf78c293720fc",
  "f00d3a296580b661325bcf3180afdbf2dde2705f41b5b55cd9af8423ed2160b5",
  "446555d17b5b15bae1c175420e362e6ff2c5daa36ced3204377690e6cbee7c6a",
  "84dc9f3bd558ce8076ab68a502b1261e406b948e70e67a4f3f0f90594fef7ec2",
  "22c303e76badbd052fc5b440684c6396c76eb3cd8b662d677025d84a1c3391f0",
  "0b521e573bbc0526de2588367b67e9f5b292c87c84a4c24c20b8ccdc7aaf39e3",
  "5a4e400c2ec41dd57a2e080d702b519d4a29789c57a6e20973dee6d4a9c68196",
  "76f87368fd90d4cfae63d32261f27ab9413901897f987fb9e22a01c816fa236c",
  "2b52965c9c5cc00ce961645d639d3a49b163ae5d35a4913204c0d5a297391aab",
  "5059e96cd52426c90d2c20592001f1a40e633d7f83846fc8f0f6320014c858d8",
  "838cc18e8a32b11a4176a716c94568d732250581d631e1bfbe3d591e11d96a7e",
  "45380a3a9995a5d5ee460b6c7fc3b35df24b32e06a940ade0b34912ced73e8e1",
  "4340c5b5de4465168c45801d74eccd6a24f911536ba8830047bd190657115b8b",
  "e0735c5bc36ce25fc657e453a2f7e26934c50203816ca827326c9a3041a6f272",
  "05a205c8639b74c8ce6b75bba8d83730c1b1239afece0005c59d902ca3e0026d",
  "4faeee0dcd208d2f8b978bbde722cc29748cb1ea1f465914d27bd5f7d8a49645",
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
