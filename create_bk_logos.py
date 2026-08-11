from PIL import Image, ImageDraw, ImageFont
import math

size = 800
font_size = 500

font_paths = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf",
]

font_path = None
for path in font_paths:
    try:
        ImageFont.truetype(path, font_size)
        font_path = path
        break
    except Exception:
        continue

if not font_path:
    font_path = ImageFont.load_default()


def draw_coin(draw, cx, cy, r, fill, outline=None):
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill, outline=outline, width=3)
    inner = int(r * 0.5)
    draw.ellipse([cx - inner, cy - inner, cx + inner, cy + inner], fill="white", outline=outline, width=2)


def draw_sparkle(draw, cx, cy, size, fill):
    points = []
    for i in range(8):
        angle = math.radians(i * 45 + 22.5)
        r = size if i % 2 == 0 else size * 0.25
        x = cx + r * math.cos(angle)
        y = cy + r * math.sin(angle)
        points.append((x, y))
    draw.polygon(points, fill=fill)


def make_image(filename, bg_color, text_color_b, text_color_k, outline_color=None, coin=True, sparkle=True):
    img = Image.new("RGB", (size, size), color=bg_color)
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype(font_path, font_size)

    text = "bk"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1]

    if outline_color:
        for dx in range(-2, 3):
            for dy in range(-2, 3):
                if dx != 0 or dy != 0:
                    draw.text((x + dx, y + dy), text, fill=outline_color, font=font)

    draw.text((x, y), text, fill=text_color_b, font=font)
    overlay = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.text((x, y), text, fill=text_color_k, font=font)
    img = Image.alpha_composite(img.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(img)

    if coin:
        draw_coin(draw, size - 150, 150, 35, "#FFD700", "#B8860B")
    if sparkle:
        draw_sparkle(draw, 150, size - 150, 25, "#FFFFFF")

    img.convert("RGB").save(filename)
    print(f"Saved {filename}")


make_image("bk_green_bg.png", "#0F5E18", "#FFFFFF", "#FFD700")
make_image("bk_gold_bg.png", "#FFD700", "#FFFFFF", "#FFFFFF", outline_color="#B8860B", coin=False, sparkle=True)
make_image("bk_white_bg.png", "#FFFFFF", "#0F5E18", "#0F5E18", outline_color="#FFD700", coin=True, sparkle=False)
