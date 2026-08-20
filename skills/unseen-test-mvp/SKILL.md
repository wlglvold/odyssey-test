---
name: unseen-test-mvp
description: Use when creating, refining, or launching a zero-cost mobile-first Xiaohongshu personality or role test, especially with GitHub Pages/static hosting, daily access keys, narrative quiz copy, result pages, cover images, or paid validation constraints.
---

# Unseen Test MVP

## Overview

Use this skill to turn a paid-test idea for 「未见测试」 into the fastest credible MVP: a mobile-first static test site, a simple access-key gate, polished narrative questions/results, Xiaohongshu-ready visual packaging, and clear upgrade choices when real one-time codes or backend state become necessary.

The core principle is commercial validation first. Keep the system understandable, inexpensive, and easy for the creator to edit.

## Platform Choice

Prefer GitHub Pages when the user wants no domain, no server, no monthly cost, and can accept a lightweight access gate.

Use a backend such as Next.js + SQLite/Prisma only when the user truly needs server-side validation, one-time code consumption, persistent sessions, admin code generation, or tamper-resistant result calculation.

Do not promise that a static GitHub Pages site can securely enforce one-time codes. A static site can hide plaintext keys by storing hashes, but every front-end gate is still a soft barrier.

Form tools such as 金数据 or 问卷星 are useful for simple surveys, but they often struggle with custom result pages, branching personality logic, image-heavy mobile storytelling, radar charts, and paid access-code recovery.

## MVP Shape

For a zero-cost static launch, use this simple file shape unless the repo already has a better pattern:

| Need | Simple implementation |
| --- | --- |
| Test content | `src/quiz-data.js` or `src/quiz-data.ts` |
| Scoring/branching | `src/quiz-logic.js` |
| UI | `index.html` + `styles.css` + small vanilla JS |
| Access gate | SHA-256 hash comparison with normalized input |
| Deployment | GitHub Pages from GitHub Actions |
| Private material | `private/` ignored by git |
| Launch assets | `marketing/` for cover image and post copy |

Keep dependencies minimal. Add libraries only when they remove real complexity.

## Test Design

Design the test as a finished cultural product, not a generic questionnaire.

- Start with the role/result map: 6-8 archetypes is usually enough for a first commercial test.
- Give each result a distinct desire, fear, wound, strategy, and social posture.
- Use 8-12 questions for a paid light test; keep each question easy to answer on a phone.
- Use 4 options per question when possible. Each option should express a recognizable behavior, not a label.
- Make questions situational and cinematic, but keep the decision clear. If users need to reread twice to understand the choice, simplify.
- Weight the final or most identity-revealing question slightly if the scoring model needs a strong closing signal.
- Result pages are the product. Include a title, subtitle, core reading, strengths, blind spot, relationship/work pattern, and a small radar chart of common traits.

For 「未见测试」, avoid language that makes the product feel like cheap entertainment when the brand wants a more serious meaning-service tone. Prefer phrases such as “命运叙事”, “意识结构”, “性格镜像”, “角色原型”, and “内在秩序”. Keep direct sales text off the aesthetic cover unless the user asks for transactional advertising.

## Visual And UI Pattern

Design mobile first. The user should be able to finish the test with one thumb and read the result comfortably.

- Home: one strong cover image, test title, short premise, access-key input, start button.
- Question page: one question at a time, visible progress, large tappable options, background image per question.
- Result page: calm reading layout, role image or symbolic background, radar chart, enough whitespace for long copy.
- Use subtle CSS transitions between pages; avoid heavy animation that makes reading harder.
- For background images, keep the image visible while preserving text contrast. A practical layering pattern is image at `z-index: 0`, soft dark overlay at `z-index: 1`, content at `z-index: 2`.
- Generate or source images that match the actual theme. Avoid generic AI-purple gradients, SaaS dashboards, glassmorphism, and decorative blobs.
- Export Xiaohongshu covers at a vertical ratio such as 1080x1440. Cover copy should sell the experience through curiosity and identity, not clutter.

## Access Key Workflow

For a static daily-key MVP:

1. Generate a memorable but nontrivial key, such as `ODYS-9K7M-Q4TX`.
2. Normalize input by trimming, uppercasing, and removing extra spaces.
3. Store only the SHA-256 hash in public code.
4. Keep the plaintext key in a private note or ignored file.
5. When rotating the key, replace the hash and redeploy.
6. Add tests that a known valid key passes and invalid keys fail without exposing valid plaintext in test names or public docs.

When the user asks for automatic per-purchase code delivery, explain the split:

- Static GitHub Pages cannot securely issue a unique unused code per buyer.
- For fastest manual validation, use a daily key and manual/private delivery.
- For true one-time codes, use a backend or an external card-delivery service plus a proper server-side validation endpoint.

## Xiaohongshu Launch Packaging

Prepare only what fits the user's actual channel:

- One vertical cover image.
- A concise note draft with the test name, promise, emotional hook, and access path.
- Remove wording like “1元一次”, “购买后发密钥”, or “娱乐向” from the image when it conflicts with the brand's meaning-service positioning.
- Keep product links, shop instructions, and key delivery details in the appropriate sales surface rather than the main aesthetic poster unless requested.

If asked to publish directly to Xiaohongshu, use the available Xiaohongshu publishing skill/tooling and get explicit final confirmation before posting.

## Verification Checklist

Before calling the work finished:

- The site works on a mobile viewport.
- The access key flow reaches the test.
- All questions can be answered through to a result.
- Refreshing or reopening gives an acceptable MVP experience for the chosen static/back-end model.
- Result text, radar chart, and images render without overlap.
- Tests pass, or any missing verification is clearly reported.
- GitHub Pages has deployed and the public URL returns the expected site.
- The user knows the current key and how to rotate it.

## Common Mistakes

Do not force 金数据/问卷星 when the desired experience depends on custom branching, result storytelling, or visuals.

Do not describe a static access key as secure DRM. Treat it as a friction gate for fast market validation.

Do not overbuild admin systems, databases, payment integrations, or login before the user has validated demand.

Do not bury the result page. The result is what the buyer feels they bought.
