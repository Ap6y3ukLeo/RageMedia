import re

data = """KИPO	Э	https://www.youtube.com/@qiroooo	 Майнкрафт	10 000	5,000₽	5,000₽	14,000₽	Ссылка	FALSE
_Dane4ka_	Э	https://www.youtube.com/@Dane4kaHardyyy	 Майнкрафт	45 000	14,000 ₽	14,840 ₽	-	Ссылка	TRUE
Гельмо	П	https://www.youtube.com/@Gelmo	 Майнкрафт	50 000	16,000₽	16,960₽	-	Ссылка	TRUE
Квист Лайв	П	https://www.youtube.com/@kW1st	 Майнкрафт	50 000	16,000₽	16,960₽	25,000₽	Ссылка	TRUE
Mr Пупи 2	Э	https://www.youtube.com/@MrPupeTwo	 Майнкрафт	70 000	18,000₽	19,080₽	30,000₽	Ссылка	TRUE
Аквыч	П	https://www.youtube.com/@akvi4	 Майнкрафт	75 000	45,000 ₽	47,700 ₽	-	Ссылка	FALSE
Арлабус	П	https://www.youtube.com/@Arlabusgame	 Майнкрафт	75 000	20,000₽	20,000₽	-	Ссылка	FALSE
YPTA	Э	https://www.youtube.com/@yptaaaa	 Майнкрафт	70 000	18,000 ₽	18,000 ₽	30,000 ₽	Ссылка	FALSE
Секундочка	Э	https://www.youtube.com/@sekyndo4ka	 Майнкрафт	100 000	25,000 ₽	26,500 ₽	30,000 ₽	Ссылка	TRUE
Клайд	П	https://www.youtube.com/@TheKlyde	 Майнкрафт	100 000	30,000₽	31,800₽	-	Ссылка	TRUE
Резенс	П	https://www.youtube.com/@REZENSoff	 Майнкрафт	100 000	25,000 ₽	30,000 ₽	-	Ссылка	FALSE
Кавкин	Э	https://www.youtube.com/@Kavkin	 Майнкрафт	106 000	30,000₽	31,800₽	-	Ссылка	TRUE
Нео	П	https://www.youtube.com/@neo_archangel	 Майнкрафт	115 000	30,000 ₽	30,000 ₽	100,000 ₽	Ссылка	FALSE
MONFFI	П	https://www.youtube.com/@%D0%9C%D0%9E%D0%9D%D0%A4%D0%98	 Майнкрафт	115 000	25,000₽	26,500₽	53,000₽	Ссылка	FALSE
CharliVeil	П	https://www.youtube.com/@CharliVeil	 Майнкрафт	120 000	20,000₽	21,200₽	-	Ссылка	TRUE
Honey	Э	https://www.youtube.com/@Honey_l1fe	 Майнкрафт	120 000	30,000₽	31,800₽	-	Ссылка	TRUE
Zorlok	Э	https://www.youtube.com/@zorloktv	 Майнкрафт	130 000	35,000₽	37,100₽	150,000₽	Ссылка	TRUE
Кейдзи	Э	https://www.youtube.com/@kekdzi	Майнкрафт	120 000	30,000₽	37,100₽	-	Ссылка	FALSE
Mr Gridlock	П	https://www.youtube.com/@MrGridlock	 Майнкрафт	130 000	40,000 ₽	42,400 ₽	80,000 ₽	Ссылка	FALSE
Фанч	Э	https://www.youtube.com/@actuallyfanch	 Майнкрафт	150 000	55,000₽	58,300₽	-	Ссылка	TRUE
Unstable На Русском 	Э	https://www.youtube.com/@unstableuniverserussian	 Майнкрафт	150 000	28,200 ₽	30,000 ₽	-	Ссылка	TRUE
Градиент	П	https://youtube.com/@real_gradient_	Майнкрафт	150 000 	40,000 ₽	42,400 ₽	90,000₽	Ссылка	FALSE
Kasspov	Э	https://www.youtube.com/@kasspov	 Майнкрафт	159 000	40,000₽	42,400₽	70,000₽	Ссылка	TRUE
Винсери	П	https://www.youtube.com/@Vincery	 Майнкрафт	160 000	25,000 ₽	26,500 ₽	50,000 ₽	Ссылка	FALSE
Alliazo	Э	https://www.youtube.com/@Alliaz0	 Майнкрафт	170 000	40,000 ₽	42,400 ₽	-	Ссылка	TRUE
Dushenka	П	https://www.youtube.com/@dushenka	 Майнкрафт	170 000	65,000₽	68,900₽	-	Ссылка	TRUE
Tucha+	П	https://www.youtube.com/@Tucha-r4w	 Майнкрафт	 200 000	50,000 ₽	53,000 ₽	-	Ссылка	FALSE
Джейк	П	https://www.youtube.com/@jake50	 Майнкрафт	215 000	156,000 ₽	156,000 ₽	-	Ссылка	FALSE
Неркин	П	https://www.youtube.com/@Nerkin	 Майнкрафт	225 000	60,000₽	60,000₽	-	Ссылка	FALSE
Лолотрек	П	https://www.youtube.com/@lolotrack_minecraft	 Майнкрафт	225 000	60,000 ₽	66,000 ₽	-	Ссылка	TRUE
Квист	П	https://www.youtube.com/@kW1sst	 Майнкрафт	250 000	75,000₽	79,500₽	110,000₽	Ссылка	TRUE
Myles на Русском	Э	https://youtube.com/@mylesmcrussian	 Майнкрафт	250 000	52,000 ₽	55,120 ₽	-	Ссылка	TRUE
PWGood	П	https://www.youtube.com/@pwgood	 Майнкрафт	300 0000	100,000 ₽	106,000 ₽	-	Ссылка	TRUE
Санчез	П	https://www.youtube.com/@sanhez_	 Майнкрафт	304 000	75,000₽	75,000₽	150,000₽	Ссылка	FALSE
Кенес	П	https://www.youtube.com/@kenes022	 Майнкрафт	350 000	50,000 ₽	52,000 ₽	-	Ссылка	FALSE
LockDown На Русском	П	https://youtube.com/@lockdownliferussian	 Майнкрафт	350 000	60,000 ₽	60,000 ₽	-	Ссылка	FALSE
Фонарик	Э	https://youtube.com/@fonarickk	 Майнкрафт	380 000	60,000 ₽	63,600 ₽	-	Ссылка	TRUE
Хоней	Э	https://youtube.com/@honey42-s3e	 Майнкрафт	400 000	60,000 ₽	62,400 ₽	200,000 ₽	Ссылка	TRUE
SKIJL	П	https://www.youtube.com/@SKIJL	 Майнкрафт	415 000	70,000₽	74,200₽	250,000₽	Ссылка	TRUE
Камилот	П	https://www.youtube.com/@kami_lotik	 Майнкрафт	600 000	50,000 ₽	52,000 ₽	-	Ссылка	FALSE
Шут	Э	https://www.youtube.com/@шут-228	 Майнкрафт	600 000	90,000₽	95,400₽	-	Ссылка	TRUE
40 литров пива	П	https://www.youtube.com/@40_JIuTpoB_IIuBa	 Майнкрафт	700 000	188,000₽	200,000₽	-	Ссылка	TRUE
Магмуст	П	https://www.youtube.com/@MagmustX	 Майнкрафт	700 000	80,000 ₽	84,800 ₽	-	Ссылка	TRUE
Mud Flaps На Русском	Э	https://youtube.com/@mudflapsrussian	 Майнкрафт	2 500 000	350,000 ₽	350,000 ₽	-	Ссылка	FALSE
Cube	П	https://www.youtube.com/@Cubebsss	 Бравл Старс	19 000	10,000₽	10,000₽	-	Ссылка	FALSE
Phenom Games	П	https://www.youtube.com/@PhenomGames_	 Гейминг	16 000	16,000₽	16,000₽	30,000₽	Ссылка	FALSE
Zurviz	Э	https://www.youtube.com/@zurviz	 Гейминг	30 000	13,000₽	13,000₽	-	Ссылка	FALSE
Legen	П	https://youtube.com/@legen148	 Гейминг	50 000	22,000₽	23,220₽	60,000₽	Ссылка	TRUE
SCHENEV	П	https://www.youtube.com/@SCHENEV	 Гейминг	50 000	45,000₽	47,500₽	150,000₽	Ссылка	TRUE
DarkestPlush	П	https://www.youtube.com/@darkplush896	 Гейминг	55 000	25,000₽	26,500₽	58,300₽	Ссылка	TRUE
Tearz	П	https://www.youtube.com/@Tearzed	 Гейминг	60 000	27,000₽	28,620₽	58,300₽	Ссылка	TRUE
Panik2D	П	https://www.youtube.com/@Panik2D/videos	 Гейминг	70 000	35,000₽	35,000₽	100,000₽	Ссылка	FALSE
Марчиз	П	https://www.youtube.com/@Marchiz	 Гейминг	90 000	40,000₽	42,400₽	-	Ссылка	TRUE
KtoWho	П	https://youtube.com/@ktowho	Гейминг	95 000	45,000₽	47,700₽	116,600₽	Ссылка	TRUE
Мэншен	П	https://www.youtube.com/@itsmansion/videos	 Гейминг	100 000	25,000₽	25,000₽	65,000₽	Ссылка	FALSE
ReyZone	Э	https://www.youtube.com/@ReyZone	 Гейминг	100 000	45,000₽	49,500₽	110,000₽	Ссылка	FALSE
Soilinf	Э	https://youtube.com/@soilinf	 Гейминг	120 000	55,000₽	55,000₽	150,000₽	Ссылка	TRUE
Краун4к	Э	https://www.youtube.com/@krayngame	 Гейминг	180 000	80,000₽	80,000₽	200,000₽	Ссылка	FALSE
EnoT	П	https://www.youtube.com/@EnoT47	 Гейминг	300 000	130,000₽	130,000₽	250,000₽	Ссылка	FALSE
"""

lines = data.split('\n')
bloggers = []

colors = [
    "from-emerald-500 to-teal-700",
    "from-blue-500 to-indigo-700",
    "from-amber-500 to-orange-700",
    "from-purple-500 to-pink-700",
    "from-red-500 to-rose-700",
    "from-pink-500 to-rose-700",
    "from-green-500 to-emerald-700",
    "from-cyan-500 to-blue-700",
    "from-teal-500 to-emerald-700",
    "from-yellow-500 to-amber-700",
    "from-indigo-500 to-violet-700",
    "from-violet-500 to-fuchsia-700",
    "from-rose-500 to-red-700",
    "from-slate-500 to-neutral-700",
    "from-fuchsia-500 to-pink-700",
    "from-blue-600 to-indigo-800",
    "from-lime-500 to-emerald-700",
    "from-orange-500 to-red-700",
    "from-emerald-600 to-teal-800",
    "from-pink-600 to-rose-800"
]

out = "const BLOGGERS: BloggerItem[] = [\n"

c_idx = 0

for line in lines:
    line = line.strip()
    if not line:
        continue
    
    parts = line.split('\t')
    if len(parts) < 5:
        continue
    
    name = parts[0].strip()
    eng = parts[1].strip()
    link = parts[2].strip()
    tag_ru = parts[3].strip()
    followers_raw = parts[4].strip()
    
    # Process followers to e.g. 10k, 1.5M
    fol_clean = followers_raw.replace(' ', '').replace(',', '')
    if fol_clean.isdigit():
        num = int(fol_clean)
        if num >= 1000000:
            fol_str = f"{num/1000000:g}M"
        elif num >= 1000:
            fol_str = f"{num/1000:g}k"
        else:
            fol_str = str(num)
    else:
        fol_str = followers_raw

    # Tag translation
    tag_en = "Gaming"
    if "Майнкрафт" in tag_ru:
        tag_en = "Minecraft"
    elif "Бравл Старс" in tag_ru:
        tag_en = "Brawl Stars"
        
    engagement = "exclusive" if eng == "Э" else "partner"
    
    color = colors[c_idx % len(colors)]
    c_idx += 1
    
    out += f'  {{ name: "{name}", followers: "{fol_str}", tagRU: "{tag_ru}", tagEN: "{tag_en}", engagement: "{engagement}", platform: "youtube", color: "{color}", link: "{link}" }},\n'

out += "];"

with open("h:/RageMedia/RageMedia/scratch/new_bloggers.ts", "w", encoding="utf-8") as f:
    f.write(out)

print("Created scratch/new_bloggers.ts")
