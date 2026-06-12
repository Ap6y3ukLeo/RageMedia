import json
import re

log_path = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17\.system_generated\logs\transcript.jsonl"

chunks = {}

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            # Check if this is a tool execution result for view_file
            if data.get('type') == 'VIEW_FILE' and data.get('status') == 'DONE':
                content = data.get('content', '')
                # Find start line and end line in the tool output header or parameters
                # Or we can just parse the numbered lines from the content!
                lines = content.split('\n')
                for l in lines:
                    match = re.match(r'^(\d+): (.*)$', l)
                    if match:
                        line_num = int(match.group(1))
                        line_content = match.group(2)
                        chunks[line_num] = line_content
        except Exception as e:
            pass

print(f"Reconstructed {len(chunks)} lines.")

# Write the reconstructed file
if chunks:
    max_line = max(chunks.keys())
    with open(r"h:\RageMedia\RageMedia\src\App.tsx", 'w', encoding='utf-8') as out:
        for idx in range(1, max_line + 1):
            out.write(chunks.get(idx, '') + '\n')
    print("App.tsx has been restored successfully!")
else:
    print("No lines reconstructed!")
