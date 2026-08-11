import subprocess
import os

base_dir = "/home/joshua/pkm/pakakumi-growth-intelligence"
folders = ["betkumi", "pakakumi"]

for folder in folders:
    folder_path = os.path.join(base_dir, folder)
    png_dir = os.path.join(folder_path, "png")
    html_files = [f for f in os.listdir(folder_path) if f.endswith(".html")]

    for html_file in html_files:
        html_path = os.path.join(folder_path, html_file)
        output_name = html_file.replace(".html", ".png")
        output_path = os.path.join(png_dir, output_name)

        cmd = [
            "google-chrome",
            "--headless",
            "--no-sandbox",
            "--disable-gpu",
            f"--screenshot={output_path}",
            "--window-size=1280,800",
            f"file://{html_path}"
        ]

        print(f"Creating {output_name}...")
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

print("Done creating images.")
