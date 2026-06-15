import os
import time

workspace_dir = r"h:\RageMedia\RageMedia"
now = time.time()

print("Workspace files modified in the last 15 minutes:")
for root, dirs, files in os.walk(workspace_dir):
    # Exclude node_modules, .git, and dist
    if any(p in root for p in ["node_modules", ".git", "dist"]):
        continue
    for f in files:
        path = os.path.join(root, f)
        try:
            mtime = os.path.getmtime(path)
            age = now - mtime
            if age < 900:
                rel_path = os.path.relpath(path, workspace_dir)
                print(f"{rel_path}: age={age:.1f}s, size={os.path.getsize(path)}")
        except Exception as e:
            pass
