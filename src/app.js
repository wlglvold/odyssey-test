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

function renderRadarChart(traits) {
  const entries = Object.entries(traits);
  const center = 120;
  const radius = 72;
  const maxValue = 5;
  const angleStep = (Math.PI * 2) / entries.length;
  const startAngle = -Math.PI / 2;

  const pointAt = (index, value = maxValue) => {
    const angle = startAngle + index * angleStep;
    const distance = radius * (value / maxValue);
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance,
    };
  };

  const polygon = entries
    .map(([, value], index) => {
      const point = pointAt(index, value);
      return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
    })
    .join(" ");

  const rings = [1, 2, 3, 4, 5]
    .map((level) => {
      const points = entries
        .map((_, index) => {
          const point = pointAt(index, level);
          return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
        })
        .join(" ");
      return `<polygon class="radar-ring" points="${points}" />`;
    })
    .join("");

  const axes = entries
    .map((_, index) => {
      const point = pointAt(index);
      return `<line class="radar-axis" x1="${center}" y1="${center}" x2="${point.x.toFixed(
        1,
      )}" y2="${point.y.toFixed(1)}" />`;
    })
    .join("");

  const labels = entries
    .map(([label, value], index) => {
      const point = pointAt(index, 6.05);
      return `
        <div class="trait-label" style="left:${point.x}px; top:${point.y}px">
          <span>${escapeHtml(label)}</span>
          <strong>${value}</strong>
        </div>
      `;
    })
    .join("");

  return `
    <section class="radar-card" aria-label="人格倾向图">
      <div class="radar-title">
        <span>人格倾向</span>
        <small>1-5 仅表示叙事侧重</small>
      </div>
      <div class="radar-wrap">
        <svg viewBox="0 0 240 240" role="img" aria-label="六项人格倾向蜘蛛网图">
          ${rings}
          ${axes}
          <polygon class="radar-area" points="${polygon}" />
          ${entries
            .map(([, value], index) => {
              const point = pointAt(index, value);
              return `<circle class="radar-dot" cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(
                1,
              )}" r="4" />`;
            })
            .join("")}
        </svg>
        ${labels}
      </div>
    </section>
  `;
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
    <section class="quiz-screen scene-enter">
      <div class="scene-background" style="background-image: url('${question.background}')"></div>
      <div class="scene-vignette"></div>
      <header class="quiz-header">
        <p>第 ${progress} / ${quiz.questions.length} 题</p>
        <div class="progress-track" aria-hidden="true">
          <span style="width: ${progressPercent}%"></span>
        </div>
      </header>

      <article class="question-block">
        <div class="question-card">
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
        </div>
      </article>
    </section>
  `;

  document.querySelectorAll(".option-button").forEach((button) => {
    button.addEventListener("click", () => {
      const optionIndex = Number(button.dataset.option);
      const selected = question.options[optionIndex];

      document.querySelectorAll(".option-button").forEach((optionButton) => {
        optionButton.disabled = true;
      });
      state.answers[state.currentQuestion] = selected.resultId;
      button.classList.add("selected");

      const nextQuestion = getNextQuestion(state.currentQuestion);
      if (nextQuestion === null) {
        state.resultId = calculateResultId(state.answers);
        saveState();
        renderResult();
        return;
      }

      state.currentQuestion = nextQuestion;
      saveState();
      window.setTimeout(renderQuestion, 180);
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

      ${renderRadarChart(result.traits)}

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
