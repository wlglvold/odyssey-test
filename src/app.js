import { quiz, results } from "./quiz-data.js";
import { calculateResultId, getNextQuestion, isValidAccessCode } from "./quiz-logic.js";

const STORAGE_KEY = "unseen-odyssey-test-v1";

const app = document.querySelector("#app");

const state = loadState();

function loadState() {
  try {
    return {
      unlocked: false,
      currentQuestion: 0,
      answers: [],
      resultId: null,
      ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"),
    };
  } catch {
    return {
      unlocked: false,
      currentQuestion: 0,
      answers: [],
      resultId: null,
    };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetState() {
  state.unlocked = false;
  state.currentQuestion = 0;
  state.answers = [];
  state.resultId = null;
  saveState();
  renderHome();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderHome(message = "") {
  app.innerHTML = `
    <section class="hero">
      <img class="hero-image" src="./assets/odyssey-cover.png" alt="黑海雾中的古希腊木船" />
      <div class="hero-copy">
        <p class="brand">未见测试</p>
        <h1>${escapeHtml(quiz.title)}</h1>
        <p class="subtitle">${escapeHtml(quiz.subtitle)}</p>
        <p class="intro">${escapeHtml(quiz.intro)}</p>
      </div>
    </section>

    <section class="panel">
      <form id="access-form" class="access-form">
        <label for="access-code">输入你的测试兑换码</label>
        <input
          id="access-code"
          name="access-code"
          autocomplete="one-time-code"
          inputmode="latin"
          placeholder="例如 K7FM-2P9X-WQ4D"
          required
        />
        ${message ? `<p class="form-message">${escapeHtml(message)}</p>` : ""}
        <button type="submit">开始航行</button>
      </form>
      <p class="fine-print">${escapeHtml(quiz.disclaimer)}</p>
    </section>
  `;

  document.querySelector("#access-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const code = new FormData(event.currentTarget).get("access-code");
    const submitButton = event.currentTarget.querySelector("button");

    submitButton.disabled = true;
    submitButton.textContent = "正在验证";

    if (await isValidAccessCode(code)) {
      state.unlocked = true;
      state.currentQuestion = state.resultId ? quiz.questions.length - 1 : state.currentQuestion || 0;
      saveState();
      state.resultId ? renderResult() : renderQuestion();
      return;
    }

    renderHome("兑换码无效。请检查大小写、横杠和空格后重试。");
  });
}

function renderQuestion() {
  if (!state.unlocked) {
    renderHome();
    return;
  }

  const question = quiz.questions[state.currentQuestion];
  const progress = state.currentQuestion + 1;
  const progressPercent = Math.round((progress / quiz.questions.length) * 100);

  app.innerHTML = `
    <section class="quiz-screen">
      <header class="quiz-header">
        <p>第 ${progress} / ${quiz.questions.length} 题</p>
        <div class="progress-track" aria-hidden="true">
          <span style="width: ${progressPercent}%"></span>
        </div>
      </header>

      <article class="question-block">
        <h2>${escapeHtml(question.text)}</h2>
        <div class="options">
          ${question.options
            .map(
              (option, index) => `
                <button class="option-button" data-option="${index}" type="button">
                  <span>${String.fromCharCode(65 + index)}</span>
                  ${escapeHtml(option.text)}
                </button>
              `,
            )
            .join("")}
        </div>
      </article>
    </section>
  `;

  document.querySelectorAll(".option-button").forEach((button) => {
    button.addEventListener("click", () => {
      const optionIndex = Number(button.dataset.option);
      const selected = question.options[optionIndex];

      state.answers[state.currentQuestion] = selected.resultId;

      const nextQuestion = getNextQuestion(state.currentQuestion);
      if (nextQuestion === null) {
        state.resultId = calculateResultId(state.answers);
        saveState();
        renderResult();
        return;
      }

      state.currentQuestion = nextQuestion;
      saveState();
      renderQuestion();
    });
  });
}

function renderResult() {
  if (!state.unlocked || !state.resultId) {
    renderHome();
    return;
  }

  const result = results[state.resultId];

  app.innerHTML = `
    <section class="result-screen">
      <p class="kicker">你的结果是</p>
      <h1>${escapeHtml(result.name)}</h1>
      <p class="result-line">${escapeHtml(result.line)}</p>

      <div class="result-body">
        ${result.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>

      <blockquote>${escapeHtml(result.quote)}</blockquote>

      <div class="result-actions">
        <button id="restart-button" type="button">重新测试</button>
        <button id="copy-button" type="button">复制结果</button>
      </div>
      <p class="fine-print">结果页可以截图保存。${escapeHtml(quiz.disclaimer)}</p>
    </section>
  `;

  document.querySelector("#restart-button").addEventListener("click", resetState);
  document.querySelector("#copy-button").addEventListener("click", async () => {
    const text = `我的《奥德赛》测试结果：${result.name}\n${result.line}\n${result.quote}`;
    await navigator.clipboard?.writeText(text);
    document.querySelector("#copy-button").textContent = "已复制";
  });
}

if (state.unlocked && state.resultId) {
  renderResult();
} else if (state.unlocked) {
  renderQuestion();
} else {
  renderHome();
}
