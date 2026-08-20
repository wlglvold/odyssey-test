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

当前使用“单一访问密钥”模式。明文密钥不写在仓库里，公开代码只保存密钥的 SHA-256 hash。

## 修改题目和结果

编辑：

```text
src/quiz-data.js
```

题目在 `quiz.questions` 里，结果文案在 `results` 里。

## 更新访问密钥

生成新密钥和 hash：

```bash
npm run generate:codes -- 1
```

脚本会输出两部分：

- 明文密钥：发给购买用户
- hash：复制到 `src/quiz-logic.js` 的 `ACCESS_CODE_HASHES`

注意：这是静态站的轻量校验。用户拿到密钥后可以重复打开测试，也可能分享给别人。适合低成本商业验证，不适合作为长期高安全付费系统。

## 每日密钥流程

1. 每天生成一个新密钥
2. 把新密钥 hash 替换到 `src/quiz-logic.js`
3. 推送到 GitHub，等待 Pages 自动部署
4. 当天购买的用户统一发送当天密钥
5. 第二天换新密钥

如果销量起来，再升级到带数据库的一次性核销版本。

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
