import os
from PIL import Image, ImageDraw, ImageFont

def create_3skill_cert():
    width, height = 1200, 840
    img = Image.new('RGB', (width, height), color='#FFFFFF')
    draw = ImageDraw.Draw(img)

    # Outer border & side decorative shapes
    draw.rectangle([20, 20, width-20, height-20], outline='#E2E8F0', width=2)
    
    # Modern Geometric Accents (Right side banner in purple/blue)
    draw.rectangle([width-280, 20, width-20, 160], fill='#1D4ED8') # Deep Blue
    draw.ellipse([width-360, 80, width-140, 300], fill='#8B5CF6')  # Purple circle
    draw.rectangle([width-280, height-260, width-20, height-20], fill='#A855F7') # Violet

    try:
        font_title = ImageFont.truetype("arialbd.ttf", 44)
        font_name = ImageFont.truetype("arialbd.ttf", 46)
        font_sub = ImageFont.truetype("arial.ttf", 22)
        font_bold = ImageFont.truetype("arialbd.ttf", 24)
        font_small = ImageFont.truetype("arial.ttf", 18)
    except:
        font_title = font_name = font_sub = font_bold = font_small = ImageFont.load_default()

    # 3SKILL Logo Header
    draw.rectangle([60, 50, 110, 100], fill='#8B5CF6')
    draw.text((130, 55), "3 SKILL", fill='#0F172A', font=font_title)
    draw.text((130, 105), "LEARN-GROW-SUCCEED", fill='#64748B', font=font_small)

    # Certificate Main Title
    draw.text((60, 160), "Internship Completion", fill='#1D4ED8', font=font_title)
    draw.text((60, 215), "Certificate", fill='#1D4ED8', font=font_title)

    draw.text((60, 290), "Awarded to", fill='#475569', font=font_bold)

    # Recipient Name
    draw.text((60, 340), "shaik mohammad mushraf", fill='#1E3A8A', font=font_name)
    draw.line([60, 400, 750, 400], fill='#93C5FD', width=3)

    # Content Description
    desc_lines = [
        "This certificate confirms the successful completion",
        "of 2 Month Internship in Data Analytics at 3Skill Training.",
        "The program emphasized practical skills, project-based learning,",
        "and professional development aligned with industry expectations."
    ]
    y_pos = 430
    for line in desc_lines:
        draw.text((60, y_pos), line, fill='#334155', font=font_sub)
        y_pos += 34

    # Signatures
    draw.line([60, 700, 280, 700], fill='#64748B', width=2)
    draw.text((170, 720), "Satyajit Swain\nFounder & CEO", fill='#0F172A', font=font_small, anchor='mm', align='center')

    draw.line([340, 700, 560, 700], fill='#64748B', width=2)
    draw.text((450, 720), "Adil Quadri\nCo-Founder & COO", fill='#0F172A', font=font_small, anchor='mm', align='center')

    # Cert ID Badge
    draw.rectangle([60, 760, 320, 805], outline='#1E293B', width=2)
    draw.text((75, 775), "CERTIFICATE ID: ID-INTERN260721", fill='#0F172A', font=font_small)

    img.save("3skill-certificate.jpg", "JPEG", quality=95)
    print("Created 3skill-certificate.jpg")

if __name__ == "__main__":
    create_3skill_cert()
