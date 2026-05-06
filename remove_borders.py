import os
import glob

files = glob.glob('src/**/*.css', recursive=True)

for f in files:
    with open(f, 'r') as file:
        lines = file.readlines()
    
    with open(f, 'w') as file:
        for i, line in enumerate(lines):
            if "start-a-project/page.module.css" in f and "border-bottom: 1px solid var(--border);" in line:
                file.write(line)
                continue
            
            if "Contact.module.css" in f and "border-bottom: 1px solid var(--border);" in line:
                file.write(line)
                continue

            if "border-top: 1px solid var(--border);" in line or "border-bottom: 1px solid var(--border);" in line:
                continue
            file.write(line)

print("Done")
