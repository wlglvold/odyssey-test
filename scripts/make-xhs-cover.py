from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
src = ROOT / "assets" / "odyssey-cover.png"
out = ROOT / "marketing" / "xhs-odyssey-cover.png"

img = Image.open(src).convert("RGB")
width, height = 1080, 1440
scale = max(width / img.width, height / img.height)
resized = img.resize(
    (round(img.width * scale), round(img.height * scale)),
    Image.Resampling.LANCZOS,
)
left = (resized.width - width) // 2
top = int((resized.height - height) * 0.15)
base = resized.crop((left, top, left + width, top + height))

overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
draw_overlay = ImageDraw.Draw(overlay)
for y in range(height):
    top_alpha = max(0, 150 - y * 0.34)
    bottom_alpha = max(0, (y - height * 0.42) * 0.32)
    alpha = int(min(190, max(top_alpha, bottom_alpha)))
    draw_overlay.line([(0, y), (width, y)], fill=(8, 13, 18, alpha))

base = Image.alpha_composite(base.convert("RGBA"), overlay)

panel = Image.new("RGBA", (width, height), (0, 0, 0, 0))
panel_draw = ImageDraw.Draw(panel)
panel_draw.rounded_rectangle(
    (80, 905, 1000, 1302),
    radius=26,
    fill=(10, 16, 22, 132),
    outline=(232, 204, 145, 72),
    width=2,
)
base = Image.alpha_composite(base, panel)

draw = ImageDraw.Draw(base)
serif = "C:/Windows/Fonts/NotoSerifSC-VF.ttf"
sans = "C:/Windows/Fonts/NotoSansSC-VF.ttf"
font_brand = ImageFont.truetype(sans, 34)
font_title = ImageFont.truetype(serif, 84)
font_sub = ImageFont.truetype(serif, 44)
font_body = ImageFont.truetype(sans, 35)
font_small = ImageFont.truetype(sans, 28)
font_price = ImageFont.truetype(sans, 42)


def center_text(text, y, font, fill):
    bbox = draw.textbbox((0, 0), text, font=font)
    x = (width - (bbox[2] - bbox[0])) / 2
    draw.text((x, y), text, font=font, fill=fill)


center_text("未见测试", 76, font_brand, (221, 188, 124, 255))
center_text("你最像《奥德赛》", 178, font_title, (255, 248, 235, 255))
center_text("中的谁？", 284, font_title, (255, 248, 235, 255))
center_text("8题 · 角色人格测评", 418, font_sub, (242, 220, 188, 245))

lines = [
    "一场关于归途、等待、欲望",
    "和命运的航行测试",
    "测完生成你的神话人格结果",
]
y = 955
for line in lines:
    draw.text((128, y), line, font=font_body, fill=(255, 248, 235, 238))
    y += 58

draw.rounded_rectangle((128, 1168, 408, 1240), radius=36, fill=(168, 78, 50, 236))
draw.text((176, 1180), "¥1 / 次", font=font_price, fill=(255, 248, 235, 255))
draw.text((440, 1182), "购买后发访问密钥", font=font_body, fill=(238, 210, 162, 255))
draw.text((128, 1260), "娱乐向人格探索｜结果适合截图保存", font=font_small, fill=(220, 202, 170, 230))

out.parent.mkdir(parents=True, exist_ok=True)
base.convert("RGB").save(out, quality=92, optimize=True)
print(out)
