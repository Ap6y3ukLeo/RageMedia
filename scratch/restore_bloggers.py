import re

original_array = """const BLOGGERS: BloggerItem[] = [
  { name: "Неркин", followers: "2.3M", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "exclusive", platform: "youtube", color: "from-emerald-500 to-teal-700", link: "https://www.youtube.com/@Nerkin" },
  { name: "PWGood", followers: "1.2M", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "exclusive", platform: "youtube", color: "from-blue-500 to-indigo-700", link: "https://www.youtube.com/@pwgood" },
  { name: "40 Литров Пива", followers: "500k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "partner", platform: "youtube", color: "from-amber-500 to-orange-700", link: "https://www.youtube.com/@40_JIuTpoB_IIuBa" },
  { name: "SKIJL", followers: "450k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "partner", platform: "youtube", color: "from-purple-500 to-pink-700", link: "https://www.youtube.com/@SKIJL" },
  { name: "Шут", followers: "600k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "exclusive", platform: "youtube", color: "from-red-500 to-rose-700", link: "https://www.youtube.com/@шут-228" },
  { name: "Honey", followers: "800k", tagRU: "Лайфстайл", tagEN: "Lifestyle", engagement: "exclusive", platform: "youtube", color: "from-pink-500 to-rose-700", link: "https://www.youtube.com/@Honey_l1fe" },
  { name: "Лолотрек", followers: "3.5M", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "partner", platform: "youtube", color: "from-green-500 to-emerald-700", link: "https://www.youtube.com/@lolotrack_minecraft" },
  { name: "Квист", followers: "350k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "partner", platform: "youtube", color: "from-cyan-500 to-blue-700", link: "https://www.youtube.com/@kW1sst" },
  { name: "Магмуст", followers: "400k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "exclusive", platform: "youtube", color: "from-teal-500 to-emerald-700", link: "https://www.youtube.com/@MagmustX" },
  { name: "Mud Flaps На Русском", followers: "426k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "exclusive", platform: "youtube", color: "from-yellow-500 to-amber-700", link: "https://youtube.com/@mudflapsrussian" },
  { name: "Myles На Русском", followers: "300k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "partner", platform: "youtube", color: "from-indigo-500 to-violet-700", link: "https://youtube.com/@mylesmcrussian" },
  { name: "Нео", followers: "1.5M", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "exclusive", platform: "youtube", color: "from-violet-500 to-fuchsia-700", link: "https://www.youtube.com/@neo_archangel" },
  { name: "Гельмо", followers: "250k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "partner", platform: "youtube", color: "from-rose-500 to-red-700", link: "https://www.youtube.com/@Gelmo" },
  { name: "KtoWho", followers: "180k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "partner", platform: "youtube", color: "from-slate-500 to-neutral-700", link: "https://youtube.com/@ktowho" },
  { name: "Мэншен", followers: "700k", tagRU: "Лайфстайл", tagEN: "Lifestyle", engagement: "exclusive", platform: "youtube", color: "from-fuchsia-500 to-pink-700", link: "https://www.youtube.com/@itsmansion/videos" },
  { name: "ReyZone", followers: "900k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "exclusive", platform: "youtube", color: "from-blue-600 to-indigo-800", link: "https://www.youtube.com/@ReyZone" },
  { name: "Soilinf", followers: "600k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "partner", platform: "youtube", color: "from-lime-500 to-emerald-700", link: "https://youtube.com/@soilinf" },
  { name: "Краун4к", followers: "850k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "exclusive", platform: "youtube", color: "from-orange-500 to-red-700", link: "https://www.youtube.com/@krayngame" },
  { name: "EnoT", followers: "550k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "exclusive", platform: "youtube", color: "from-emerald-600 to-teal-800", link: "https://www.youtube.com/@EnoT47" },
  { name: "Tearz", followers: "400k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "partner", platform: "youtube", color: "from-pink-600 to-rose-800", link: "https://www.youtube.com/@Tearzed" }
];"""

updates = {
    "неркин": {"followers": "225k", "tagRU": "Майнкрафт", "tagEN": "Minecraft", "eng": "partner"},
    "pwgood": {"followers": "3M", "tagRU": "Майнкрафт", "tagEN": "Minecraft", "eng": "partner"},
    "40 литров пива": {"followers": "700k", "tagRU": "Майнкрафт", "tagEN": "Minecraft", "eng": "partner"},
    "skijl": {"followers": "415k", "tagRU": "Майнкрафт", "tagEN": "Minecraft", "eng": "partner"},
    "шут": {"followers": "600k", "tagRU": "Майнкрафт", "tagEN": "Minecraft", "eng": "exclusive"},
    "honey": {"followers": "120k", "tagRU": "Майнкрафт", "tagEN": "Minecraft", "eng": "exclusive"},
    "лолотрек": {"followers": "225k", "tagRU": "Майнкрафт", "tagEN": "Minecraft", "eng": "partner"},
    "квист": {"followers": "250k", "tagRU": "Майнкрафт", "tagEN": "Minecraft", "eng": "partner"},
    "магмуст": {"followers": "700k", "tagRU": "Майнкрафт", "tagEN": "Minecraft", "eng": "partner"},
    "mud flaps на русском": {"followers": "2.5M", "tagRU": "Майнкрафт", "tagEN": "Minecraft", "eng": "exclusive"},
    "myles на русском": {"followers": "250k", "tagRU": "Майнкрафт", "tagEN": "Minecraft", "eng": "exclusive"},
    "нео": {"followers": "115k", "tagRU": "Майнкрафт", "tagEN": "Minecraft", "eng": "partner"},
    "гельмо": {"followers": "50k", "tagRU": "Майнкрафт", "tagEN": "Minecraft", "eng": "partner"},
    "ktowho": {"followers": "95k", "tagRU": "Гейминг", "tagEN": "Gaming", "eng": "partner"},
    "мэншен": {"followers": "100k", "tagRU": "Гейминг", "tagEN": "Gaming", "eng": "partner"},
    "reyzone": {"followers": "100k", "tagRU": "Гейминг", "tagEN": "Gaming", "eng": "exclusive"},
    "soilinf": {"followers": "120k", "tagRU": "Гейминг", "tagEN": "Gaming", "eng": "exclusive"},
    "краун4к": {"followers": "180k", "tagRU": "Гейминг", "tagEN": "Gaming", "eng": "exclusive"},
    "enot": {"followers": "300k", "tagRU": "Гейминг", "tagEN": "Gaming", "eng": "partner"},
    "tearz": {"followers": "60k", "tagRU": "Гейминг", "tagEN": "Gaming", "eng": "partner"}
}

lines = original_array.split('\n')
for i in range(len(lines)):
    line = lines[i]
    m = re.search(r'name: "([^"]+)"', line)
    if m:
        name = m.group(1).lower()
        if name in updates:
            u = updates[name]
            line = re.sub(r'followers: "[^"]+"', f'followers: "{u["followers"]}"', line)
            line = re.sub(r'tagRU: "[^"]+"', f'tagRU: "{u["tagRU"]}"', line)
            line = re.sub(r'tagEN: "[^"]+"', f'tagEN: "{u["tagEN"]}"', line)
            line = re.sub(r'engagement: "[^"]+"', f'engagement: "{u["eng"]}"', line)
            lines[i] = line

new_array = '\n'.join(lines)

with open("h:/RageMedia/RageMedia/src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = re.sub(
    r"const BLOGGERS: BloggerItem\[\] = \[\s*\{[\s\S]*?\];",
    new_array,
    content
)

with open("h:/RageMedia/RageMedia/src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Restored original 20 bloggers with updated tags and followers.")
