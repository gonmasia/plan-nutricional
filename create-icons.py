#!/usr/bin/env python3
"""
Simple icon generator for PWA
Creates PNG icons with GN logo and gradient background
"""

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("⚠️  PIL no está instalado. Los iconos se deben generar manualmente.")
    print("👉 Abre generate-icons.html en tu navegador y descarga los iconos.")
    exit(1)

def create_icon(size):
    """Create a single icon of given size"""
    # Create image with gradient background
    img = Image.new('RGB', (size, size), color='#2d6a4f')
    draw = ImageDraw.Draw(img)

    # Draw gradient effect (simple two-color blend)
    for y in range(size):
        # Interpolate between primary and accent colors
        factor = y / size
        r = int(45 + (82 - 45) * factor)
        g = int(106 + (183 - 106) * factor)
        b = int(79 + (136 - 79) * factor)
        color = (r, g, b)
        draw.rectangle([(0, y), (size, y+1)], fill=color)

    # Draw semi-transparent circle
    circle_radius = int(size * 0.4)
    center = size // 2
    draw.ellipse(
        [(center - circle_radius, center - circle_radius),
         (center + circle_radius, center + circle_radius)],
        fill=(255, 255, 255, 50)
    )

    # Draw text "GN"
    try:
        # Try to use a nice font
        font_size = int(size * 0.4)
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        # Fallback to default font
        font = ImageFont.load_default()

    text = "GN"
    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Center the text
    text_x = (size - text_width) // 2
    text_y = (size - text_height) // 2 - bbox[1]  # Adjust for bbox offset

    draw.text((text_x, text_y), text, fill='white', font=font)

    return img

def main():
    """Generate all icon sizes"""
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]

    print("🎨 Generando iconos PWA...")

    for size in sizes:
        filename = f"icon-{size}.png"
        img = create_icon(size)
        img.save(filename, 'PNG')
        print(f"  ✅ {filename}")

    print("\n✨ ¡Todos los iconos generados correctamente!")
    print("📁 Archivos creados en la carpeta actual")

if __name__ == "__main__":
    main()
