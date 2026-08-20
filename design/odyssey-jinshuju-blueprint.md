# 《你最像电影〈奥德赛〉中的谁？》金数据配置蓝图

## 目标

用金数据最快搭建一个可售卖的付费测评 MVP：

- 用户购买后获得兑换码
- 进入金数据表单并输入兑换码
- 完成 8 道情景题
- 系统根据最高得分展示对应人格结果
- 后台可查看提交记录并导出数据

本版本优先验证商业闭环，不追求复杂后台和自建系统。

## 表单基础设置

表单名称：

《你最像电影〈奥德赛〉中的谁？》

表单描述：

海风吹过黑色的甲板，远处的岛屿像一个尚未说出口的预言。  
在这场归途中，你会如何选择，如何爱，如何等待，又如何面对命运递来的那把刀？

底部说明：

本测试为娱乐向人格探索，不构成任何心理诊断或心理测量结论。

建议设置：

- 手机端优先
- 一页一题
- 显示进度
- 关闭不必要的社交、评论、复杂收集项
- 允许提交后展示测评结果

## 视觉方向

关键词：

- 黑海
- 海雾
- 古典神话
- 羊皮纸
- 旧金
- 陶土红
- 安静、文学、有留白

色彩建议：

- 背景：`#F7F1E7`
- 正文：`#26211C`
- 辅助文字：`#8B6F47`
- 强调色：`#A84E32`
- 深色块：`#17212A`

界面原则：

- 封面页可以有强氛围图
- 题目页以文字为主，不要每题都放大图
- 选项保持纵向排列，点击区域要大
- 结果页要更有截图价值
- 不用紫色渐变、玻璃拟态、复杂动画

## 字段结构

### 1. 兑换码

字段类型：

单行文字

字段名：

输入你的测试兑换码

提示文案：

请填写购买后收到的兑换码。每个兑换码仅用于一次完整测试。

设置建议：

- 必填
- 使用白名单或指定填写人员能力限制可用兑换码
- 开启“不允许与已有数据重复”

### 2. 昵称

字段类型：

单行文字

字段名：

想在结果页怎么称呼你？

提示文案：

可以留空。这个名字只用于你的测试结果展示。

设置建议：

- 选填

### 3. 测评题

字段类型：

单项选择

计分方式：

- Q1-Q7：对应人物 +1
- Q8：对应人物 +2

结果判定：

展示得分最高的人物结果。

如果出现平分，优先使用 Q8 对应结果；如果金数据不支持复杂平分规则，就接受平台默认最高分结果。

## 结果维度

创建 8 个测评结果或维度：

1. 奥德修斯
2. 佩涅洛佩
3. 忒勒马科斯
4. 雅典娜
5. 喀耳刻
6. 卡吕普索
7. 欧迈俄斯
8. 安提诺俄斯

## 题目与选项

### Q1

题目：

夜色压下来时，海面忽然起了雾。桅杆发出细微的声响，船上的人都不再说话，只等有人先打破沉默。

选项：

A. 你会抬头看星位和风向，先确认真正能相信的东西  
计分：雅典娜 +1

B. 你会说出一个听起来足够清晰的计划，让所有人先稳住  
计分：奥德修斯 +1

C. 你会先走到角落里，看看有没有人已经在发抖  
计分：欧迈俄斯 +1

D. 你会站到最前面，告诉他们：现在不能再等别人救我们  
计分：安提诺俄斯 +1

### Q2

题目：

宴席开到深处，杯盏碰撞声越来越响。一个陌生人坐到了本不属于他的位置，还带着一种故意让人看见的从容。

选项：

A. 你不会立刻开口，只会记住他说过的每一句话  
计分：佩涅洛佩 +1

B. 你会微笑着替他斟酒，让他以为自己已经进入你的节奏  
计分：喀耳刻 +1

C. 你会感到不适，却先怀疑自己是不是想得太多  
计分：忒勒马科斯 +1

D. 你会直接把气氛按停，让他知道有些位置不是靠胆子就能坐的  
计分：安提诺俄斯 +1

### Q3

题目：

漂泊许久后，你抵达一座安静得近乎不真实的岛。这里有温热的食物、干净的床铺，还有一个人对你说：留下吧，再也不用回到风浪里。

选项：

A. 你会心动。太久没有人把“停下”说得这样温柔  
计分：卡吕普索 +1

B. 你会感谢这一切，但心里知道自己还有必须回去的地方  
计分：奥德修斯 +1

C. 你会先看清这份温柔背后，是邀请，还是圈禁  
计分：喀耳刻 +1

D. 如果还有人在远处等你，你无法安心把这里叫作家  
计分：欧迈俄斯 +1

### Q4

题目：

深夜，火光快要熄灭时，一个很久没有联系的人突然发来一句：“你还好吗？”那几个字停在屏幕上，像从旧日海水里浮上来的东西。

选项：

A. 你不会追问太多，只回一句：“我在。”  
计分：佩涅洛佩 +1

B. 你会反复看那句话，想他为什么现在回来，也想自己为什么还会在意  
计分：忒勒马科斯 +1

C. 你会从措辞和时间里判断，他真正想说的可能不是这四个字  
计分：雅典娜 +1

D. 你会直接问：“你到底想要什么？”  
计分：安提诺俄斯 +1

### Q5

题目：

港口的流言传得很快。有人误解了你，而这个误解正被越来越多人当成事实。你远远看见他们交头接耳，像看见一张慢慢收紧的网。

选项：

A. 你不会急着辩解。你会等到最关键的位置，再一次性翻盘  
计分：奥德修斯 +1

B. 你会把证据、时间线和每个人的动机整理清楚，不让情绪主导局面  
计分：雅典娜 +1

C. 你更担心身边重要的人会不会因此受伤  
计分：欧迈俄斯 +1

D. 你会后退一步。不是认输，而是不想在不被尊重的地方解释自己  
计分：喀耳刻 +1

### Q6

题目：

你在一座旧宫殿里发现一扇锁着的门。门缝里透出微弱的光，钥匙就放在旁边，像是有人故意留给你的。

选项：

A. 你会打开它。你不想永远活在别人替你讲好的故事里  
计分：忒勒马科斯 +1

B. 你会犹豫。你怕门后的真相，会带走现在仅剩的安稳  
计分：卡吕普索 +1

C. 你会记住钥匙的位置，等真正需要时再打开  
计分：佩涅洛佩 +1

D. 你会一个人进去。有些秘密不适合带观众  
计分：喀耳刻 +1

### Q7

题目：

黄昏时，队伍在陌生的山谷里迷了路。风从石壁间穿过，像某种警告。所有人都疲惫、饥饿，也开始彼此埋怨。

选项：

A. 你会先定一个方向，哪怕只能边走边修正  
计分：奥德修斯 +1

B. 你会走到最沉默的人旁边，确认他还能不能继续  
计分：欧迈俄斯 +1

C. 你会分配任务：谁探路，谁保留体力，谁记住来时的标记  
计分：雅典娜 +1

D. 你会接管局面。混乱的时候，总得有人让别人闭嘴听令  
计分：安提诺俄斯 +1

### Q8

题目：

最后一段航程前，船只能再承受一样东西的重量。天快亮了，远处隐约有岸。你必须亲手留下其余一切。

选项：

A. 一个能证明你曾经赢过的名字  
计分：安提诺俄斯 +2

B. 一盏始终为你留着的灯  
计分：佩涅洛佩 +2

C. 一张还没有画完的地图  
计分：忒勒马科斯 +2

D. 一个让时间变慢的拥抱  
计分：卡吕普索 +2

## 结果页文案结构

每个结果页建议按这个顺序排版：

1. 你的结果是
2. 人物名
3. 一句核心文案
4. 正文 4-5 段
5. 截图金句

结果页不要出现“得分”“维度”等后台语言。

## 配图策略

### 封面图

用途：

表单封面、购买页预览、小红书笔记首图备选。

已生成资产：

`design/assets/odyssey-cover.png`

画面：

古希腊木船航行在黑蓝色海面上，远处有雾和岛屿，黎明前的微光，古典油画质感。

### 题目页

不建议每题放大图。题目页以文本沉浸为主，减少加载和视觉干扰。

如果金数据允许设置统一背景，可以使用低对比度羊皮纸色背景。

### 结果页

每个结果配一张统一风格人物象征图：

- 奥德修斯：黑海、船、风暴、归途
- 佩涅洛佩：宫殿窗边、织物、灯、等待
- 忒勒马科斯：少年背影、黎明、未完成地图
- 雅典娜：石柱、月光、猫头鹰、棋局
- 喀耳刻：岛屿森林、药草、金杯、危险温柔
- 卡吕普索：洞穴海岸、黄昏、潮水、停留
- 欧迈俄斯：炉火、木屋、羊群、归人
- 安提诺俄斯：宴席、酒杯、空王座、野心

## AI 配图统一提示词

统一风格要求：

古希腊神话氛围，电影感构图，古典油画与细腻数字绘画结合，黑海蓝、羊皮纸暖白、旧金、陶土红配色，柔和颗粒感，克制、安静、有文学感。不要现代服装，不要电影海报文字，不要真实演员脸，不要品牌标志，不要水印。

### 封面图提示词

Ancient Greek wooden ship sailing through a dark blue misty sea before dawn, distant island barely visible through fog, worn sail, quiet mythological atmosphere, cinematic wide composition, classical oil painting fused with refined digital illustration, parchment warm highlights, old gold accents, terracotta undertones, subtle film grain, elegant negative space for mobile cover, no text, no logo, no watermark, no modern objects, no recognizable actors.

### 奥德修斯结果图提示词

A lone ancient Greek voyager standing on the deck of a wooden ship, storm clouds opening toward a distant homeland, intelligent and weary posture, black-blue sea, warm dawn line on the horizon, classical mythological oil painting style, cinematic, restrained, literary mood, no text, no logo, no modern objects, no recognizable actors.

### 佩涅洛佩结果图提示词

An ancient Greek queen-like figure seated beside a palace window at night, an unfinished woven cloth on her lap, a single oil lamp glowing, distant dark sea beyond the window, quiet strength and waiting, parchment and old gold palette, classical oil painting with refined digital detail, no text, no logo, no modern objects, no recognizable actors.

### 忒勒马科斯结果图提示词

A young ancient Greek traveler seen from behind at dawn, standing before an unfinished map spread on a stone table, distant sea and first light beyond broken columns, mood of uncertainty becoming courage, classical oil painting and cinematic digital illustration, black sea blue, parchment, old gold, no text, no logo, no modern objects.

### 雅典娜结果图提示词

An elegant ancient Greek goddess-like strategist in a moonlit colonnade, an owl nearby, a simple bronze strategy board on a stone table, calm intelligence and protective distance, old gold and deep blue palette, classical oil painting with subtle cinematic lighting, no text, no logo, no modern objects, no recognizable actors.

### 喀耳刻结果图提示词

A mysterious ancient island sorceress in a shadowed forest near the sea, herbs and a golden cup on a stone altar, beautiful but guarded atmosphere, warm terracotta and dark green accents, classical mythological oil painting style, refined digital detail, no text, no logo, no modern objects, no recognizable actors.

### 卡吕普索结果图提示词

A solitary immortal-like figure at the entrance of a sea cave during sunset, waves glowing gold below, a quiet island behind her, atmosphere of longing and suspended time, cinematic classical oil painting, black-blue sea, warm old gold light, no text, no logo, no modern objects, no recognizable actors.

### 欧迈俄斯结果图提示词

A humble ancient Greek shepherd's hut at night, warm hearth fire inside, sheep resting nearby, a traveler approaching from the dark road, atmosphere of loyalty, shelter, and quiet return, classical oil painting with refined digital detail, parchment warmth, deep blue shadows, no text, no logo, no modern objects.

### 安提诺俄斯结果图提示词

An ancient Greek banquet hall after sunset, a confident ambitious figure near an empty throne, bronze wine cups, scattered red cloth, dramatic but restrained old gold lighting, sense of charisma and danger, classical oil painting fused with cinematic digital illustration, no text, no logo, no modern objects, no recognizable actors.

## 金数据搭建顺序

1. 新建测评/问卷表单
2. 设置封面、标题、副标题和免责声明
3. 添加兑换码字段
4. 配置兑换码白名单和重复填写限制
5. 添加昵称字段
6. 添加 8 道单选题
7. 创建 8 个结果维度
8. 给每个选项设置对应人物分值
9. 添加 8 个结果页
10. 上传封面图和结果图
11. 手机端预览完整流程
12. 用 2-3 个测试兑换码完整提交
13. 检查后台记录、结果展示、重复兑换码限制
14. 上线并把表单链接放入购买后的交付信息

## 小红书销售页文案备选

标题：

你最像电影《奥德赛》里的谁？

正文：

不是普通性格测试。  
这是一场关于归途、等待、欲望和命运的 8 题航行。

你会得到一个属于自己的神话人物侧写：  
他可能是奥德修斯，也可能是佩涅洛佩、雅典娜、喀耳刻，或者那个还没有真正成为自己的忒勒马科斯。

测试完成后会生成完整人格结果。  
娱乐向，不做心理诊断，只是帮你看见一个也许被忽略很久的自己。
