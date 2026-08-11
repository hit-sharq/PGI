from PIL import Image, ImageDraw, ImageFont

width, height = 800, 600
img = Image.new("RGB", (width, height), color="#1a1a2e")
draw = ImageDraw.Draw(img)

draw.rectangle([50, 50, 750, 550], outline="#e94560", width=4)

text_lines = ["Hello!", "PNG Image", "Created with Python"]
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 60)
except Exception:
    font = ImageFont.load_default()

y = 200
for line in text_lines:
    bbox = draw.textbbox((0, 0), line, font=font)
    text_width = bbox[2] - bbox[0]
    x = (width - text_width) / 2
    draw.text((x, y), line, fill="#e94560", font=font)
    y += 100

img.save("output.png")
print("Image saved as output.png")
