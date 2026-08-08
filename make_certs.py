import os
from PIL import Image, ImageDraw, ImageFont

def create_cisco_cert():
    width, height = 1200, 840
    img = Image.new('RGB', (width, height), color='#FFFFFF')
    draw = ImageDraw.Draw(img)
    
    # Border
    draw.rectangle([20, 20, width-20, height-20], outline='#E2E8F0', width=2)
    draw.rectangle([30, 30, width-30, height-30], outline='#2563EB', width=4)

    # Cisco Header Accent
    draw.line([60, 90, 200, 90], fill='#005073', width=6)
    
    try:
        font_title = ImageFont.truetype("arial.ttf", 38)
        font_name = ImageFont.truetype("arialbd.ttf", 46)
        font_course = ImageFont.truetype("arialbd.ttf", 42)
        font_sub = ImageFont.truetype("arial.ttf", 22)
        font_small = ImageFont.truetype("arial.ttf", 18)
    except:
        font_title = font_name = font_course = font_sub = font_small = ImageFont.load_default()

    # Text content
    draw.text((60, 60), "Cisco\nNetworking\nAcademy", fill='#005073', font=font_small)
    
    draw.text((width//2, 180), "This certificate is awarded to", fill='#334155', font=font_sub, anchor='mm')
    draw.text((width//2, 260), "Sk Mohammad Mushraf", fill='#0284C7', font=font_name, anchor='mm')
    draw.text((width//2, 340), "for successfully completing", fill='#334155', font=font_sub, anchor='mm')
    draw.text((width//2, 420), "Data Analytics Essentials", fill='#0284C7', font=font_course, anchor='mm')
    draw.text((width//2, 490), "offered by Networking Academy", fill='#475569', font=font_sub, anchor='mm')
    draw.text((width//2, 530), "through the Cisco Networking Academy program.", fill='#475569', font=font_sub, anchor='mm')

    # Footer Line
    draw.line([80, 660, width-80, 660], fill='#CBD5E1', width=1)

    # Signature block & Date
    draw.text((100, 710), "Lynn Bloomer", fill='#0F172A', font=font_sub)
    draw.text((100, 740), "Director, Cisco Networking Academy", fill='#64748B', font=font_small)

    draw.text((width-100, 710), "05 Jul 2026", fill='#0F172A', font=font_sub, anchor='ra')
    draw.text((width-100, 740), "Completion Date", fill='#64748B', font=font_small, anchor='ra')

    draw.text((width//2, 790), "Cert ID: 9dc929f1-f5a2-46b8-831c-499b4480b337", fill='#94A3B8', font=font_small, anchor='mm')

    img.save("cisco-certificate.jpg", "JPEG", quality=95)
    print("Created cisco-certificate.jpg")

def create_be10x_cert():
    width, height = 1200, 840
    img = Image.new('RGB', (width, height), color='#FFFFFF')
    draw = ImageDraw.Draw(img)

    # Outer double border
    draw.rectangle([20, 20, width-20, height-20], outline='#1E293B', width=4)
    draw.rectangle([30, 30, width-30, height-30], outline='#64748B', width=2)

    # Right side banner
    draw.rectangle([width-300, 30, width-30, height-30], fill='#F1F5F9')
    draw.polygon([(width-300, height-30), (width-165, height-120), (width-30, height-30)], fill='#FFFFFF')

    try:
        font_title = ImageFont.truetype("arialbd.ttf", 52)
        font_name = ImageFont.truetype("arialbd.ttf", 38)
        font_sub = ImageFont.truetype("arial.ttf", 22)
        font_bold = ImageFont.truetype("arialbd.ttf", 24)
        font_small = ImageFont.truetype("arial.ttf", 18)
    except:
        font_title = font_name = font_sub = font_bold = font_small = ImageFont.load_default()

    # be10x Logo Box
    draw.rectangle([80, 60, 260, 140], fill='#000000')
    draw.text((170, 100), "be10X", fill='#FFFFFF', font=font_title, anchor='mm')

    # Certificate Title
    draw.text((80, 200), "Certificate", fill='#000000', font=font_title)
    draw.text((80, 260), "of Completion Awarded to", fill='#475569', font=font_sub)
    draw.text((80, 320), "SHAIK MOHAMMAD MUSHRAF", fill='#0F172A', font=font_name)
    draw.text((80, 380), "on successful completion of AI tools and ChatGPT workshop", fill='#475569', font=font_sub)

    # Key Bullet Points
    bullets = [
        "• Create presentations using AI in under 5 min",
        "• Analyse data using AI in under 30 min",
        "• Code and Debug using AI in under 10 min"
    ]
    y_pos = 440
    for bullet in bullets:
        draw.text((100, y_pos), bullet, fill='#1E293B', font=font_bold)
        y_pos += 45

    # Right Banner Text
    draw.text((width-165, 100), "AI TOOLS\nWORKSHOP", fill='#0F172A', font=font_bold, anchor='mm', align='center')
    draw.ellipse([width-240, 180, width-90, 330], outline='#000000', width=3)
    draw.text((width-165, 235), "be10X", fill='#000000', font=font_bold, anchor='mm')
    draw.text((width-165, 275), "Verified", fill='#16A34A', font=font_small, anchor='mm')

    draw.text((width-165, 420), "Issued on:", fill='#64748B', font=font_small, anchor='mm')
    draw.text((width-165, 450), "June 29th, 2025", fill='#0F172A', font=font_bold, anchor='mm')

    # Signatures
    draw.line([80, 720, 300, 720], fill='#64748B', width=2)
    draw.text((190, 740), "Aditya Goenka\nCo-founder", fill='#475569', font=font_small, anchor='mm', align='center')

    draw.line([360, 720, 580, 720], fill='#64748B', width=2)
    draw.text((470, 740), "Aditya Kachave\nCo-founder", fill='#475569', font=font_small, anchor='mm', align='center')

    img.save("be10x-certificate.jpg", "JPEG", quality=95)
    print("Created be10x-certificate.jpg")

if __name__ == "__main__":
    create_cisco_cert()
    create_be10x_cert()
