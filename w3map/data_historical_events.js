// TODO - some OT events duplicated here; clean that up...
var historicalEvents = [

   {
      "subcategories": ["nt"],
      "name": "Romans Conquer the Region",
      "startYear": -63,
      "endYear": -63,
      "locationName": "Israel"
   },

   {
      "subcategories": ["nt"],
      "name": "Reign of Herod the Great",
      "startYear": -37,
      "endYear": 4,
      "locationName": "Israel"
   },
   {
      "subcategories": ["nt"],
      "name": "Pontius Pilate Governor",
      "startYear": 26,
      "endYear": 36,
      "locationName": "Jerusalem"
   },
   {
      "subcategories": ["nt"],
      "name": "Conflict Between Jews and Romans",
      "startYear": 66,
      "endYear": 70,
      "locationName": "Israel"
   },
   {
      "subcategories": ["nt"],
      "name": "Romans Devastate Jerusalem and Destroy Temple",
      "startYear": 70,
      "endYear": 70,
      "locationName": "Jerusalem"
   },
   {
      "subcategories": ["pre-history"],
      "name": "Sargon the Great of Akkad Defeats Sumerian City States",
      "startYear": -2300,
      "endYear": -2300,
      "locationName": "Akkad",
      "pointform": ["establishes world's first empire", "semitic peoples rule mesopotamia until 539BC", "akkadian empire"]
   },
   {
      "subcategories": ["pre-history"],
      "name": "Amorites Enter the Region",
      "startYear": -2000,
      "endYear": -2000,
      "locationName": "Babylon",
      "pointform": ["semitic semi-nomadic people enter mesopotmia", "establish cities of Mari and Babylon", "hammurabi becomes most famous amorite leader"]
   },
   {
      "subcategories": ["ancestral"],
      "name": "Hittites defeat Babylon",
      "startYear": -1540,
      "endYear": -1540,
      "locationName": "Babylon",
      "pointform": ["semitic semi-nomadic people enter mesopotmia", "establish cities of Mari and Babylon", "hammurabi becomes most famous amorite leader"]
   },
   {
      "subcategories": ["exodus"],
      "name": "Occupation of Canaan Begins",
      "startYear": -1250,
      "endYear": -1250,
      "locationName": "Canaan",
      "sources": ["joshua", "judges"],
      "pointform": ["joshua: hebrew occupation of canaan is quick - three campaigns",
         "judges: hebrew occupation of canaan is gradual - involves lots of intermarriage with canaanites"
      ]
   },
   {
      "subcategories": ["united monarchy"],
      "name": "Reign of Saul",
      "startYear": -1020,
      "endYear": -1000,
      "locationName": "Canaan",
      "pointform": ["chosen by samuel", "utlimately unable to hold off the philistines"]
   },
   {
      "subcategories": ["united monarchy"],
      "name": "Reign of David",
      "startYear": -1000,
      "endYear": -961,
      "locationName": "Canaan",
      "pointform": ["consolidated rule over northern and southern tribes", "made Jerusalem his capital",
         "brought ark of covenant to jerusalem", "established davidic empire"
      ]
   },
   {
      "subcategories": ["united monarchy"],
      "name": "Reign of Solomon",
      "startYear": -961,
      "endYear": -922,
      "locationName": "Canaan",
      "pointform": ["wisdom", "golden age", "construction projects", "forced labor", "allied with hiram of tyre", "twelve districts", "temple of solomon"]
   },
      {
      "subcategories": ["divided monarchy"],
      "name": "Shalmaneser III Defeats Ben-Hadad of Syria and Ahab of Israel",
      "startYear": -858,
      "endYear": -824,
      "locationName": "Canaan",
      "pointform": ["wisdom", "golden age", "construction projects", "forced labor", "allied with hiram of tyre", "twelve districts", "temple of solomon"],
      "sources": ["Amos", "Hosea", "Micah", "Isaiah"]
   },
   {
      "subcategories": ["divided monarchy"],
      "name": "North Falls to Assyria - Shalmaneser V",
      "startYear": -722,
      "endYear": -722,
      "locationName": "Canaan",
      "pointform": ["ten tribes deported to assyria"],
      "sources": ["Amos", "Hosea", "Micah", "Isaiah"]
   },
   {
      "subcategories": ["judah"],
      "name": "Hezekiah's Rebellion is Stopped by Sennarcherib of Assyria",
      "startYear": -701,
      "endYear": -701,
      "locationName": "Canaan",
      "pointform": ["followed ahaz", "ahaz supported assyria despite isaiah's warnings", "hezekiah assumed assyria was going to fall and supported egypt and babylon",
         "hezekiah ignored isaiah's warnings", "hezekiah started rebellion to gain judean independence", "rebellion crushed by assyria", "jersusalem spared"
      ],
      "sources": ["Isaiah"]
   },
   {
      "subcategories": ["judah"],
      "name": "Neo-Babylonians Sack Nineveh the Assyrian Capital, Establishe Empire under Nebuchadnezzar",
      "startYear": -612,
      "endYear": -612,
      "locationName": "Nineveh"
   },
   {
      "subcategories": ["judah"],
      "name": "Neo-Babylonians Defeat Egypt at Carchemish",
      "startYear": -605,
      "endYear": -605,
      "locationName": "Carchemish"
   },
   {
      "subcategories": ["judah"],
      "name": "Reign of Josiah (event)",
      "startYear": -640,
      "endYear": -609,
      "locationName": "Canaan",
      "pointform": ["rebelled against assyria", "in 621 scroll of deuteronomy found in temple"]
   },
   {
      "subcategories": ["judah"],
      "name": "Death of Josiah",
      "startYear": -609,
      "endYear": -609,
      "locationName": "Megiddo",
      "sources": ["zephaniah", "nahum", "habakkuk", "jeremiah"]
   },
   {
      "subcategories": ["judah"],
      "name": "Nebuchadnezzar Occupies Jerusalem and Deports People to Babylon",
      "startYear": -598,
      "endYear": -598,
      "locationName": "Jerusalem",
      "pointform": ["installs zedekiah as puppet king"]
   },
   {
      "subcategories": ["judah", "exile"],
      "name": "Judeans Rebel, Babylon Crushes Rebellion, Devastates Judah and Burns Temple in Jerusalem",
      "startYear": -589,
      "endYear": -586,
      "locationName": "Jerusalem",
      "pointform": ["zedekiah blinded and deported", "zedekiah's sons executed",
         "jeremiah had urged zedekiah to surrender to babylon since babylon was merely the rod of yahweh's judgement against israel", "ezekiel deported too and ministered to the exiles", "much of old testament written in babylon"
      ],
      "sources": ["jeremiah"]
   },
   {
      "subcategories": ["judea under persian rule"],
      "name": "Neo-Babylonian Empire Falls to Cyrus and Persians",
      "startYear": -539,
      "endYear": -539,
      "locationName": "Babylon"
   },
   {
      "subcategories": ["judea under persian rule"],
      "name": "Jewish Scholars Remain in Babylon, Write Babylonian Talmud",
      "startYear": -500,
      "endYear": -500,
      "locationName": "Babylon"
   },
   {
      "subcategories": ["judea under hellenistic rule"],
      "name": "Alexander the Great Captures Jerusalem",
      "startYear": -332,
      "endYear": -332,
      "locationName": "Jerusalem"
   },
   {
      "subcategories": ["maccabees"],
      "name": "Antiochus IV Forbids Circumcision and Turns Jersusalem Temple to Temple of Zeus",
      "startYear": -175,
      "endYear": -164,
      "locationName": "Jerusalem"
   },
   {
      "subcategories": ["maccabees"],
      "name": "Maccabee Troops Capture Jerusalem Temple",
      "startYear": -164,
      "endYear": -164,
      "locationName": "Jerusalem"
   }
];