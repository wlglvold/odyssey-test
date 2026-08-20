# 未见测试：《奥德赛》静态测评页

这是一个零服务器、零数据库、适合 GitHub Pages 托管的静态测评页。

## 本地预览

因为页面使用 ES module，本地建议用静态服务器预览：

```bash
npm run dev
```

然后打开：

```text
http://localhost:4173
```

部署到 GitHub Pages 后不需要额外服务器。

测试用兑换码：

```text
K7FM-2P9X-WQ4D
M3LP-8N5K-XT7R
ODYS-SEY1-2026
```

## 修改题目和结果

编辑：

```text
src/quiz-data.js
```

题目在 `quiz.questions` 里，结果文案在 `results` 里。

## 添加兑换码

生成新兑换码：

```bash
npm run generate:codes -- 20
```

脚本会输出两部分：

- 明文兑换码：发给购买用户
- hash：复制到 `src/quiz-logic.js` 的 `ACCESS_CODE_HASHES`

注意：这是静态站的轻量校验，不能做到真正一次性、防共享。它适合商业验证，不适合作为长期高安全付费系统。

## 部署到 GitHub Pages

1. 在 GitHub 新建一个 public repository，例如 `odyssey-test`
2. 把本项目文件推送到仓库
3. 进入仓库 `Settings` -> `Pages`
4. `Build and deployment` 选择 `Deploy from a branch`
5. Branch 选择 `main`，目录选择 `/root`
6. 保存后等待部署完成

部署完成后会得到类似：

```text
https://你的用户名.github.io/odyssey-test/
```

这个链接手机端可以直接打开。

## 适合现在做什么

- 小红书付费测试的最小商业验证
- 手机端答题体验验证
- 结果页截图传播验证

暂时不适合：

- 严格一次性兑换码
- 防止用户共享链接和兑换码
- 后台查看每个用户答题记录
