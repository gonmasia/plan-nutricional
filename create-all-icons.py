#!/usr/bin/env python3
"""Generate all PNG icons needed for PWA"""

try:
    from PIL import Image, ImageDraw, ImageFont

    def create_icon(size, filename):
        """Create a single icon of given size"""
        img = Image.new('RGB', (size, size), color='#2d6a4f')
        draw = ImageDraw.Draw(img)

        # Draw gradient effect overlay
        overlay = Image.new('RGBA', (size, size), (82, 183, 136, 128))
        img.paste(overlay, (0, 0), overlay)

        # Draw circle
        circle_radius = int(size * 0.35)
        circle_bbox = [
            size//2 - circle_radius,
            size//2 - circle_radius,
            size//2 + circle_radius,
            size//2 + circle_radius
        ]
        draw.ellipse(circle_bbox, fill=(255, 255, 255, 51))

        # Try to use a bold font
        font_size = int(size * 0.4)
        try:
            font = ImageFont.truetype("arialbd.ttf", font_size)
        except:
            try:
                font = ImageFont.truetype("Arial Bold.ttf", font_size)
            except:
                try:
                    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
                except:
                    try:
                        font = ImageFont.truetype("arial.ttf", font_size)
                    except:
                        font = ImageFont.load_default()

        # Draw text
        text = "GN"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]

        x = (size - text_width) // 2
        y = (size - text_height) // 2 - int(size * 0.02)

        draw.text((x, y), text, fill='white', font=font)

        # Save
        img.save(filename, 'PNG')
        print(f'Created: {filename} ({size}x{size})')

    # Create icons for iOS and PWA
    sizes = [
        (192, 'icon-192.png'),
        (512, 'icon-512.png'),
    ]

    for size, filename in sizes:
        create_icon(size, filename)

    print('\nAll icons created successfully!')

except ImportError:
    print('ERROR: Pillow library not installed')
    print('Install with: pip install Pillow')
    exit(1)
except Exception as e:
    print(f'ERROR: {e}')
    import traceback
    traceback.print_exc()
    exit(1)
