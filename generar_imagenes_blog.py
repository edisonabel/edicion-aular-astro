#!/usr/bin/env python3
"""
Generador de Imágenes para el Blog
Crea imágenes placeholder profesionales de 1200x800px
Requiere: pip install pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Configuración
OUTPUT_DIR = "public/img/blog"
WIDTH = 1200
HEIGHT = 800

# Datos de las imágenes
images_data = [
    {
        "filename": "marketing-digital-estrategia.webp",
        "title": "SALES FUNNEL",
        "subtitle": "La Máquina de Ventas",
        "color1": (102, 126, 234),  # #667eea
        "color2": (118, 75, 162)    # #764ba2
    },
    {
        "filename": "diseno-web-principios.webp",
        "title": "HOOK, STORY, OFFER",
        "subtitle": "Fórmula de Russell Brunson",
        "color1": (240, 147, 251),  # #f093fb
        "color2": (245, 87, 108)    # #f5576c
    },
    {
        "filename": "branding-identidad.webp",
        "title": "VALUE LADDER",
        "subtitle": "Escalera de Valor",
        "color1": (79, 172, 254),   # #4facfe
        "color2": (0, 242, 254)     # #00f2fe
    },
    {
        "filename": "meta-vs-google.webp",
        "title": "EXPERT SECRETS",
        "subtitle": "Autoridad y Liderazgo",
        "color1": (67, 233, 123),   # #43e97b
        "color2": (56, 249, 215)    # #38f9d7
    },
    {
        "filename": "seo-2025.webp",
        "title": "TRAFFIC SECRETS",
        "subtitle": "Dream 100 Strategy",
        "color1": (250, 112, 154),  # #fa709a
        "color2": (254, 225, 64)    # #fee140
    },
    {
        "filename": "lanzamiento-digital.webp",
        "title": "PERFECT WEBINAR",
        "subtitle": "Script de Ventas",
        "color1": (48, 207, 208),   # #30cfd0
        "color2": (51, 8, 103)      # #330867
    },
    {
        "filename": "video-marketing.webp",
        "title": "THE ONE THING",
        "subtitle": "Simplificación Máxima",
        "color1": (168, 237, 234),  # #a8edea
        "color2": (254, 214, 227)   # #fed6e3
    },
    {
        "filename": "streaming-profesional.webp",
        "title": "ATTRACTIVE CHARACTER",
        "subtitle": "Marca Personal Magnética",
        "color1": (255, 154, 158),  # #ff9a9e
        "color2": (254, 207, 239)   # #fecfef
    }
]

def create_gradient(width, height, color1, color2):
    """Crea un gradiente diagonal de color1 a color2"""
    base = Image.new('RGB', (width, height), color1)
    top = Image.new('RGB', (width, height), color2)
    mask = Image.new('L', (width, height))
    mask_data = []
    for y in range(height):
        for x in range(width):
            # Gradiente diagonal
            distance = ((x / width) + (y / height)) / 2
            mask_data.append(int(255 * distance))
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def create_blog_image(data, output_path):
    """Crea una imagen de blog con el diseño especificado"""
    
    # Crear imagen base con gradiente
    img = create_gradient(WIDTH, HEIGHT, data['color1'], data['color2'])
    
    # Overlay oscuro para mejor legibilidad
    overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 77))  # 30% opacity
    img = Image.alpha_composite(img.convert('RGBA'), overlay)
    
    # Preparar para dibujar texto
    draw = ImageDraw.Draw(img)
    
    try:
        # Intentar cargar fuentes del sistema
        font_title = ImageFont.truetype("arial.ttf", 80)
        font_subtitle = ImageFont.truetype("arial.ttf", 40)
        font_logo = ImageFont.truetype("arial.ttf", 100)
        font_watermark = ImageFont.truetype("arial.ttf", 28)
    except:
        # Si no encuentra Arial, usar fuente por defecto
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
        font_logo = ImageFont.load_default()
        font_watermark = ImageFont.load_default()
    
    # Logo "EA" en esquina superior izquierda (semi-transparente)
    draw.text((40, 80), "EA", fill=(255, 255, 255, 26), font=font_logo)  # 10% opacity
    
    # Título principal (centrado)
    title_bbox = draw.textbbox((0, 0), data['title'], font=font_title)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (WIDTH - title_width) // 2
    draw.text((title_x, 320), data['title'], fill=(255, 255, 255, 255), font=font_title)
    
    # Subtítulo (centrado)
    subtitle_bbox = draw.textbbox((0, 0), data['subtitle'], font=font_subtitle)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (WIDTH - subtitle_width) // 2
    draw.text((subtitle_x, 420), data['subtitle'], fill=(255, 255, 255, 230), font=font_subtitle)
    
    # Línea decorativa
    line_y = 470
    draw.line([(400, line_y), (800, line_y)], fill=(255, 0, 95, 255), width=4)  # #ff005f
    
    # Marca de agua
    watermark = "edicionaular.com"
    watermark_bbox = draw.textbbox((0, 0), watermark, font=font_watermark)
    watermark_width = watermark_bbox[2] - watermark_bbox[0]
    watermark_x = (WIDTH - watermark_width) // 2
    draw.text((watermark_x, 710), watermark, fill=(255, 255, 255, 179), font=font_watermark)  # 70% opacity
    
    # Guardar como PNG (WebP requiere dependencias adicionales)
    img = img.convert('RGB')
    img.save(output_path, 'PNG', optimize=True, quality=95)
    print(f"✅ Creada: {output_path}")

def main():
    """Función principal"""
    print("🎨 Generador de Imágenes del Blog")
    print(f"📁 Directorio de salida: {OUTPUT_DIR}\n")
    
    # Crear directorio si no existe
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Generar cada imagen
    for i, data in enumerate(images_data, 1):
        output_path = os.path.join(OUTPUT_DIR, data['filename'])
        try:
            create_blog_image(data, output_path)
        except Exception as e:
            print(f"❌ Error creando {data['filename']}: {e}")
    
    print(f"\n✅ Proceso completado. {len(images_data)} imágenes generadas.")
    print(f"\n📍 Las imágenes están en: {os.path.abspath(OUTPUT_DIR)}")
    print("\n🚀 Próximo paso: Recarga tu blog y verifica las imágenes")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Proceso cancelado por el usuario")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\n💡 Asegúrate de tener Pillow instalado: pip install pillow")
