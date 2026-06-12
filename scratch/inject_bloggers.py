import re

with open("h:/RageMedia/RageMedia/scratch/new_bloggers.ts", "r", encoding="utf-8") as f:
    new_array = f.read()

with open("h:/RageMedia/RageMedia/src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the array
content = re.sub(
    r"const BLOGGERS: BloggerItem\[\] = \[\s*\{[\s\S]*?\];",
    new_array,
    content
)

with open("h:/RageMedia/RageMedia/src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Injected new_bloggers.ts into App.tsx")
