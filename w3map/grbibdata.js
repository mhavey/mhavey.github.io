/*
Sources: Wikipedia for MOST of IT, including geo coordinates, dates. Some specific sites:

http://www.matthewmcgee.org/paultime.html
http://www.biblechronologytimeline.com/biblechronologytimeline7.html
http://biblehub.com/timeline/
https://en.wikipedia.org/wiki/Dating_the_Bible
http://www.answers.com/Q/Where_was_Genesis_written
https://www.enterthebible.org/periods.aspx?rid=907
 */

// the categories and their colors
var categories = [ {
	name : "GR",
	desc : "Greek",
	color : "00ff00",
	textcolor : "black",
	tags : []
}, {
	name : "B",
	desc : "Bible",
	color : "ff0000",
	textcolor : "white",
	tags : []
}, {
	name : "E",
	desc : "Event",
	color : "0000ff",
	textcolor : "white",
	tags : []
} ];
var catGreek = categories[0];
var catBible = categories[1];
var catEvent = categories[2];

// brightness intervals - disjoint and cover ALL OF TIMEs
var brightnesses = [ {
	startYear : -Infinity,
	endYear : -651,
	color : "fefef4",
	textcolor : "black"
}, {
	startYear : -650,
	endYear : -501,
	color : "fffce9",
	textcolor : "black"
}, {
	startYear : -500,
	endYear : -351,
	color : "fefddf",
	textcolor : "black"
}, {
	startYear : -350,
	endYear : -201,
	color : "f6f396",
	textcolor : "black"
}, {
	startYear : -200,
	endYear : -51,
	color : "ede556",
	textcolor : "black"
}, {
	startYear : -50,
	endYear : 99,
	color : "fef56c",
	textcolor : "black"
}, {
	startYear : 100,
	endYear : 249,
	color : "fef200",
	textcolor : "black"
}, {
	startYear : 250,
	endYear : Infinity,
	color : "caa869",
	textcolor : "black"
} ];

// Locations for all entities
var locations = [ {
	locName : "Miletus",
	lat : 37.530233,
	lng : 27.278369
}, {
	locName : "Samos",
	lat : 37.75479,
	lng : 26.97777
}, {
	locName : "Colophon",
	lat : 38.108889,
	lng : 27.141667
}, {
	locName : "Elea",
	lat : 40.160833,
	lng : 15.155
}, {
	locName : "Ephesus",
	lat : 37.941111,
	lng : 27.341944
}, {
	locName : "Clazomenae",
	lat : 38.358167,
	lng : 26.767583
}, {
	locName : "Acragas",
	lat : 37.316667,
	lng : 13.583333
}, {
	locName : "Abdera",
	lat : 40.933333,
	lng : 24.966667
}, {
	locName : "Croton",
	lat : 39.083333,
	lng : 17.116667
}, {
	locName : "Athens",
	lat : 37.966667,
	lng : 23.716667
}, {
	locName : "Stagira",
	lat : 40.591667,
	lng : 23.794722
}, {
	locName : "Sinope",
	lat : 42.033333,
	lng : 35.15
}, {
	locName : "Elis",
	lat : 37.720923,
	lng : 21.607014
}, {
	locName : "Citium",
	lat : 34.9233,
	lng : 33.6305
}, {
	locName : "Assos",
	lat : 39.487778,
	lng : 26.336944
}, {
	locName : "Soli",
	lat : 36.741944,
	lng : 34.54
}, {
	locName : "Arpino",
	lat : 41.647778,
	lng : 13.609722
}, {
	locName : "Hierapolis",
	lat : 37.925,
	lng : 29.125833
}, {
	locName : "Rome",
	lat : 41.9,
	lng : 12.5
}, {
	locName : "Lycopolis",
	lat : 31.083333,
	lng : 30.95
}, {
	locName : "Hippo",
	lat : 36.9,
	lng : 7.766667
}, {
	locName : "Alexandria",
	lat : 31.2,
	lng : 29.916667
}, {
	locName : "Tekoa",
	lat : 31.653017,
	lng : 35.229033
}, {
	locName : "Damascus",
	lat : 33.513056,
	lng : 36.291944
}, {
	locName : "Jerusalem",
	lat : 31.783333,
	lng : 35.216667
} ];

// The thinkers and events at last !!!
var ancientEntities = [
		{
			category : catGreek,
			subject : "Thales",
			startYear : -624,
			endYear : -546,
			locName : "Miletus",
			location : null,
			brightness : null,
			tags : [ "presocratic", "water" ]
		},
		{
			category : catGreek,
			subject : "Anaximander",
			startYear : -610,
			endYear : -546,
			locName : "Miletus",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "presocratic", "apeiron", "first fragment" ]
		},
		{
			category : catGreek,
			subject : "Pythagoras",
			startYear : -570,
			endYear : -495,
			locName : "Samos",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "presocratic", "school", "no beans",
					"pythagorean theorem", "coined term philosophy",
					"metempsychosis", "soul of dead reborn in another body" ]
		},
		{
			category : catGreek,
			subject : "Anaximenes",
			startYear : -585,
			endYear : -528,
			locName : "Miletus",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "presocratic", "air" ]
		},
		{
			category : catGreek,
			subject : "Xenophanes",
			startYear : -570,
			endYear : -475,
			locName : "Colophon",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "presocratic", "incorporeal god", "scepticism" ]
		},
		{
			category : catGreek,
			subject : "Parmenides",
			startYear : -515,
			endYear : -445,
			locName : "Elea",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "presocratic", "school", "reason over the senses",
					"being is eternal", "nothing comes into being",
					"no motion", "ontology" ]
		},
		{
			category : catGreek,
			subject : "Heraclitus",
			startYear : -535,
			endYear : -475,
			locName : "Ephesus",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "presocratic", "flux", "fire",
					"cant step into the same river twice", "logos",
					"character is fate", "daimon" ]
		},
		{
			category : catGreek,
			subject : "Anaxagoras",
			startYear : -510,
			endYear : -428,
			locName : "Clazomenae",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "presocratic", "mind", "nous",
					"nature was unformed until mind formed it" ]
		},
		{
			category : catGreek,
			subject : "Empedocles",
			startYear : -490,
			endYear : -430,
			locName : "Acragas",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "presocratic", "earth", "air", "water", "fire",
					"love attracts them strife divides them", "reincarnation" ]
		},
		{
			category : catGreek,
			subject : "Zeno",
			startYear : -490,
			endYear : -430,
			locName : "Elea",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "presocratic", "paradox", "reductio ad absurdum",
					"motion is an illusion" ]
		},
		{
			category : catGreek,
			subject : "Leucippus",
			startYear : -490,
			endYear : -430,
			locName : "Miletus",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "presocratic", "atomism", "logos",
					"everything happens from necessity" ]
		},
		{
			category : catGreek,
			subject : "Protagoras",
			startYear : -490,
			endYear : -420,
			locName : "Abdera",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "presocratic", "anti-math", "sophist", "use of words",
					"orthopeia", "rhetoric", "relativism",
					"man is the measure of all things", "agnosticism" ]
		},
		{
			category : catGreek,
			subject : "Philolaus",
			startYear : -470,
			endYear : -385,
			locName : "Croton",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "presocratic", "limits", "harmonia",
					"harmony of limited and unlimited", "astronomy",
					"central fire" ]
		},
		{
			category : catGreek,
			subject : "Democritus",
			startYear : -460,
			endYear : -370,
			locName : "Abdera",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "presocratic", "atomism",
					"bastard vs legitimate knowledge" ]
		},
		{
			category : catGreek,
			subject : "Xenophon",
			startYear : -430,
			endYear : -354,
			locName : "Athens",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "presocratic", "socratic dialogues" ]
		},
		{
			category : catGreek,
			subject : "Socrates",
			startYear : -469,
			endYear : -399,
			locName : "Athens",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "big3" ]
		},
		{
			category : catGreek,
			subject : "Plato",
			startYear : -427,
			endYear : -347,
			locName : "Athens",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "big3" ]
		},
		{
			category : catGreek,
			subject : "Aristotle",
			startYear : -384,
			endYear : -322,
			locName : "Stagira",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "big3" ]
		},
		{
			category : catGreek,
			subject : "Diogenes",
			startYear : -412,
			endYear : -323,
			locName : "Sinope",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "hellenistic", "cynic", "return to simplicity of nature",
					"austerity", "cosmopolitanism", "citizen of the world",
					"dog-like behavior", "hoarding", "indifference to life",
					"self-sufficiency", "opposed to conventional thinking" ]
		},
		{
			category : catGreek,
			subject : "Epicurus",
			startYear : -341,
			endYear : -271,
			locName : "Samos",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "hellenistic", "epicurean", "pleasure and pain",
					"good and evil", "strive to be free of suffering",
					"tranquility", "ataraxia", "avoidance of overindulgence",
					"problem of evil paradox",
					"principle of multiple explanations" ]
		},
		{
			category : catGreek,
			subject : "Pyrrho",
			startYear : -360,
			endYear : -270,
			locName : "Elis",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "hellenistic", "scpeticism" ]
		},
		{
			category : catGreek,
			subject : "Zeno",
			startYear : -334,
			endYear : -262,
			locName : "Citium",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [
					"hellenistic",
					"stoic",
					"fire",
					"the universe accomplishes what is right and prevents the opposite",
					"live according to the reason of the universe",
					"self-preservation" ]
		},
		{
			category : catGreek,
			subject : "Cleanthes",
			startYear : -330,
			endYear : -230,
			locName : "Assos",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "hellenistic", "stoic", "pantheism",
					"soul is material substance", "souls live after death",
					"avoid the passions", "live consistently" ]
		},
		{
			category : catGreek,
			subject : "Chrysippus",
			startYear : -280,
			endYear : -207,
			locName : "Soli",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "hellenistic", "stoic", "logic", "syllogism",
					"knowledge is empircal", "all things happen by fate",
					"everything is caused",
					"acts are determined but how we respond is a moral choice",
					"compatibilism" ]
		},
		{
			category : catGreek,
			subject : "Cicero",
			startYear : -106,
			endYear : -43,
			locName : "Arpino",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "hellenistic", "stoic" ]
		},
		{
			category : catGreek,
			subject : "Epictetus",
			startYear : 55,
			endYear : 135,
			locName : "Hierapolis",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "hellenistic", "stoic", "self-knowledge",
					"practice over logic",
					"we have no power over external things",
					"do not be troubled by loss" ]
		},
		{
			category : catGreek,
			subject : "Marcus Aurelius",
			startYear : 121,
			endYear : 180,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "hellenistic", "philosopher king", "stoic" ]
		},
		{
			category : catGreek,
			subject : "Plotinus",
			startYear : 204,
			endYear : 270,
			locName : "Lycopolis",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "hellenistic", "neo-platonic", "the one" ]
		},
		{
			category : catGreek,
			subject : "Augustine",
			startYear : 354,
			endYear : 430,
			locName : "Hippo",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "hellenistic", "christian", "catholic", "easter people" ]
		},
		{
			category : catGreek,
			subject : "Hypatia",
			startYear : 370,
			endYear : 415,
			locName : "Alexandria",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "hellenistic", "female", "math" ]
		},
		{
			category : catGreek,
			subject : "Boethius",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "hellenistic", "neo-platonic", "martyr",
					"last of the romans" ]
		},

		/*
		 * FOR EACH: - who wrote it (e.g., did samuel write the book of samuel) -
		 * when written - where written - what are the events and when/where did
		 * they occur - themes
		 * 
		 * up to 1800 BCE Prehistory 1800 BCE - 1500 BCE Ancestral Period 1500
		 * BCE - 1240 BCE Egypt, Exodus, Land 1240 BCE - 1000 BCE Period of the
		 * Judges 1000 BCE - 922 BCE United Monarchy 922 BCE - 722 BCE Divided
		 * Monarchy 722 BCE - 586 BCE Kingdom of Judah 586 BCE - 539 BCE Exile
		 * 538 BCE - 332 BCE Judah during Persian Rule 332 BCE - 165 BCE Judea
		 * during Hellenistic Rule 165 BCE - 63 BCE Maccabees and Hasmoneans 63
		 * BCE - 135 CE Judea during Roman Rule 5 BCE - 30 CE Jesus' Life and
		 * Death 30 CE - 60 CE The Church Is Born 50 CE - 60 CE Paul's Letters
		 * 60 CE - 120 CE The Second Generation of the Church
		 * 
		 * babylonian captivity
		 * 
		 * 609 BCE Death of Josiah 609–598 BCE Reign of Jehoiakim (succeeded
		 * Jehoahaz, who replaced Josiah but reigned only 3 months) Began giving
		 * tribute to Nebuchadnezzar in 605 BCE. First deportation, including
		 * Daniel. 598/7 BCE Reign of Jehoiachin (reigned 3 months). Siege and
		 * fall of Jerusalem. Second deportation, 16 March 597 597 BCE Zedekiah
		 * made king of Judah by Nebuchadnezzar II of Babylon 594 BCE
		 * Anti-Babylonian conspiracy 588 BCE Siege and fall of Jerusalem.
		 * Solomon's Temple destroyed. Third deportation July/August 587 583 BCE
		 * Gedaliah the Babylonian-appointed governor of Yehud Province
		 * assassinated. Many Jews flee to Egypt and a possible fourth
		 * deportation to Babylon 562 BCE Release of Jehoiachin after 37 years
		 * in a Babylonian prison.[30] He remains in Babylon 539 BCE Persians
		 * conquer Babylon (October) 538 BCE Decree of Cyrus allows Jews to
		 * return to Jerusalem 520–515 BCE Return by many Jews to Yehud under
		 * Zerubbabel and Joshua the High Priest. Foundations of Second Temple
		 * laid
		 * 
		 */

		{
			category : catBible,
			subject : "Genesis",
			authorship : [ {
				author : "Yahwist",
				startYear : -530, // babylonian exile
				endYear : -530,
				locName : "Judah - southern hebrew state",
				location : null,
				brightness : null,
				mapMarker : null
			}, {
				author : "Elohist",
				startYear : -530, // babylonian exile
				endYear : -530,
				locName : "Israel - northern kingdom",
				location : null,
				brightness : null,
				mapMarker : null
			}, {
				author : "Priestly",
				startYear : -530, // exilic period -
				// TODO SEVERAL CENTURIES
				// LATER - when???
				endYear : -530,
				locName : "Babylon",
				location : null,
				brightness : null,
				mapMarker : null
			}
			// TODO : what about the deuteronomist??
			],

			events = [
"Before 4000 BC","The Creation","Genesis 1",
"Before 4000 BC","The Garden of Eden","Genesis 2"
"Before 4000 BC","The Fall of Man	Genesis 3
"Before 3000 BC","Cain kills Abel	Genesis 4
"Before 3000 BC","From Adam to Noah	Genesis 5
"Before 2500 BC","Wickedness Provokes God's wrath	Genesis 6
"Before 2500 BC","The Great Flood	Genesis 7
"Before 2500 BC","The Flood Subsides	Genesis 8
"Before 2500 BC","Covenant of the Rainbow	Genesis 9
"Before 2500 BC","Shem, Ham and Japheth	Genesis 10
"Before 2100 BC",?The Tower of Babel	Genesis 11
"2091 BC,	God Sends Abram to Egypt	Genesis 12
"2090 BC,	The Famine in Canaan	Genesis 12:10
"2085 BC,	Abram and Lot Part Ways	Genesis 13
"2085 BC,	Abram Promised Many Descendants	Genesis 13:14
"2084 BC,	Abram Rescues Lot	Genesis 14
"2081 BC,	God's Covenant with Abram	Genesis 15
"2081 BC,	Sarai and Hagar	Genesis 16
"2080 BC,	Ishmael Born	Genesis 16:15
"2067 BC,	The Covenant of Circumcision	Genesis 17
"2067 BC,	God Promises the Birth of Isaac	Genesis 18
"2067 BC,	The Destruction of Sodom	Genesis 19
"2067 BC,	Abraham, Sarah and Abimelech	Genesis 20
"2066 BC,	Isaac Born	Genesis 21
"2064 BC,	Hagar and Ishmael Sent Away	Genesis 21:8
"2057 BC,	The Treaty at Beersheba	Genesis 21:22
"2054 BC,	The Offering of Isaac	Genesis 22
"2030 BC,	Death and Burial of Sarah	Genesis 23
"2026 BC,	Isaac Marries Rebekah	Genesis 24
"2006 BC,	Birth of Jacob and Esau	Genesis 25
"1991 BC,	Death of Abraham	Genesis 25:5
"1978 BC,	Esau sells his birthright	Genesis 25:29
"1977 BC,	Isaac and Abimelech	Genesis 26
"1929 BC,	Jacob Gets Isaac's Blessing	Genesis 27
"1928 BC, Jacob Flees to Laban	Genesis 28
"1928 BC,	Jacob's vision of a ladder	Genesis 28:10
"1928 BC,	Jacob Serves Laban	Genesis 29
"1921 BC,	Jacob Marries Rachel	Genesis 29:28
"1921 BC,	Jacob and His Sons	Genesis 30
"1916 BC,	Rachel Bears Joseph	Genesis 30:22
"1908 BC,	Jacob Leaves for Canaan	Genesis 31
"1906 BC,	Jacob Wrestles with God	Genesis 32
"1906 BC,	Jacob Meets Esau	Genesis 33
"1906 BC,	Jacob Settles in Shechem	Genesis 33:18
"1906 BC,	Shechem Defiles Dinah	Genesis 34
"1906 BC,	Jacob Returns to Bethel	Genesis 35
"1906 BC,	Jacob Named Israel	Genesis 35:10
"1906 BC	,Descendants of Esau	Genesis 36
"1903 BC,	Rachel Dies	Genesis 35:18
"1898 BC,	Joseph's Dreams and Betrayal	Genesis 37
"1898 BC,	Joseph Sold into Slavery	Genesis 37:25
"1898 BC,	Tamar deceives Judah	Genesis 38
"1898 BC,	Joseph Prospers Under Potiphar	Genesis 39
"1889 BC,	Potiphar's Wife Accuses Joseph	Genesis 39:7
"1889 BC,	Joseph Imprisoned	Genesis 39:20
"1887 BC,	The Cupbearer and the Baker's Dreams	Genesis 40
"1886 BC,	Joseph Interprets Pharaoh's Dreams	Genesis 41
"1886 BC,	Joseph Put in Charge	Genesis 41:33
"1886 BC,	Seven Years of Plenty Begin	Genesis 41:47
"1875 BC,	Famine Begins	Genesis 41:53
"1875 BC,	Joseph's Brothers Sent to Egypt	Genesis 42
"1875 BC,	Simeon Detained by Joseph	Genesis 42:24
"1875 BC	,The Return with Benjamin	Genesis 43
"1875 BC,	Benjamin and the Silver Cup	Genesis 44
"1875 BC,	Joseph Reveals His Identity	Genesis 45
"1875 BC,	Joseph Sends for Jacob	Genesis 45:9
"1875 BC,	Jacob and Family to Egypt	Genesis 46
"1875 BC,	Jacob to Goshen	Genesis 47
"1859 BC,	Jacob's Illness	Genesis 48
"1859 BC,	Jacob's Blessing and Death	Genesis 49
"1859 BC,	The Burial of Jacob	Genesis 50
"1806 BC,	The Death of Joseph	Genesis 50:26			          
			          ],
			
			// dating: post-exilic persian 538-330 - 4 sources

			tags : [
					"old testament",
					"pentateuch",
					"torah",
					"hebrew",
					"creation",
					"ex nihilo",
					"adam and eve",
					"garden of eden",
					"tree of knowledge of good and evil",
					"the fall",
					"cain",
					"abel",
					"disobedience",
					"flood",
					"noah",
					"ark",
					"rainbow as symbol not to destroy world again",
					"tower of babel",
					"division of man into many languages",
					"abram",
					"abraham",
					"mesopotamia",
					"canaan",
					"circumcision",
					"sarah and hagar",
					"ishmael",
					"sodom and gomorrah",
					"abraham saves lot and family",
					"lot's wife looks back and is turned into pillar of salt",
					"lot's daughters give birth to the ancestors of moabites and ammonites",
					"gerar",
					"sarah is sent a new son: isaac",
					"god tells abraham to sacrifice isaac",
					"abraham purchases machpelah/hebron",
					"abraham's servant travels to mesopotamia to find wife for isaac",
					"rebekah marries isaac",
					"abraham's children with keturah become ancestors of medianites",
					"abraham buried at hebron",
					"rebekah gives birth to jacob and esau",
					"jacob renamed israel", "jacob has 12 sons",
					"twelve tribes of israel",
					"jacob's son joseph sold as slave to egypt",
					"long coat of many colors",
					"joseph interprets pharaoh's dream of famine",
					"the scene shifts to egypt",
					"pharaoh assigns them the land of goshen",
					"blessing of jacob",
					"must take bones of joseph if they ever leave egypt",
					"covenant", "chosen people", "yahwist", "priestly",
					"non-priestly" ]
		},
		{
			category : catBible,
			subject : "Exodus",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: post-exilic persian 538-330
			
			events : [
800 BC	Jacob's Family Stays in Egypt	Exodus 1
1700 BC	Israelites Multiply in Egypt	Exodus 1:6
1600 BC	Israelites Oppressed by New King	Exodus 1:8
1539 BC	Pharaoh's Order to Kill Firstborn	Exodus 1:22
1525 BC	The Birth and Adoption of Moses	Exodus 2
1486 BC	Moses Flees into Midian	Exodus 2:11
1446 BC	Israelites Groan in Slavery	Exodus 2:23
1446 BC	Moses Sent to Deliver Israel	Exodus 3 - 6
1446 BC	The Ten Plagues on Egypt	Exodus 7 - 12
1446 BC	The Exodus Begins	Exodus 13 - 18
1446 BC	The Isreaelites At Mount Sinai	Exodus 19
1446 BC	Moses Receives the Commandments	Exodus 20
1446 BC	Moses Receives the Law	Exodus 21 - 24
1446 BC	Preparations for the Tabernacle	Exodus 25 - 31
1446 BC	The Golden Calf and Moses' Anger	Exodus 32
1446 BC	The Journey Resumes	Exodus 33 - 39
1445 BC	The Tabernacle is Erected and Filled	Exodus 40			          
			],
			tags : [ "old testament", "pentateuch", "torah", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Leviticus",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: post-exilic persian 538-330
			// partly exilic too
			events : [
1445 BC	Laws for Sacrifices and Offerings	Leviticus 1 - 7
1445 BC	Aaron and His Sons Consecrated	Leviticus 8, 9
1445 BC	The Sin of Nadab and Abihu	Leviticus 10
1445 BC	Laws of Purity	Leviticus 11 - 19
1445 BC	Punishments and Regulations	Leviticus 20 - 22
1445 BC	Feasts and Jubilee	Leviticus 23			          
			      ],
			tags : [ "old testament", "pentateuch", "torah", "hebrew",
					"priestly" ]
		},
		{
			category : catBible,
			subject : "Numbers",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: post-exilic persian 538-330
			events: [
1445 BC	Census, Tribes, Duties	Numbers 1 - 6
1445 BC	Tabernacle Dedication	Numbers 7 - 10
1445 BC	The People Complain	Numbers 11, 12
1445 BC	The Twelve Spies	Numbers 13
1445 BC	People Murmur at the Spies' Report	Numbers 14, 15
1426 BC	Korah's Rebellion	Numbers 16
1426 BC	Aaron's Staff Buds	Numbers 17
1426 BC	Priests, Red Heifer, Cleansing	Numbers 18, 19
1407 BC	Water from the Rock at Meribah	Numbers 20
1407 BC	Aaron's Death	Numbers 20:22
1407 BC	The Bronze Snake	Numbers 21
1407 BC	Balaam and the Angel	Numbers 22 - 25
1407 BC	The Second Census	Numbers 26
1407 BC	The Daughters of Zelophehad	Numbers 27
1407 BC	Joshua Chosen to Succeed Moses	Numbers 27:18
1407 BC	Special sacrifices and holy days	Numbers 28, 29
1407 BC	Vows of women	Numbers 30
1407 BC	Conquest of Midian	Numbers 31
1407 BC	Division of Transjordan	Numbers 32
1407 BC	Summary of Israel's Journey	Numbers 33
1407 BC	Apportionment of Canaan	Numbers 34
1407 BC	Borders and Cities of Refuge	Numbers 35
1407 BC	Zelophehad's Daughters Marry	Numbers 36			         
			      ]
			tags : [ "old testament", "pentateuch", "torah", "hebrew",
					"yahwist", "priestly redaction" ]
		},
		{
			category : catBible,
			subject : "Deuteronomy",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: 5-26, monarchic 745-586 reign of josiah
			// dating: expansion 1-4,29-30 (intro to deuteronomist history),
			// exilic 586-539
			// dating: 19-25, 27, 31-34 (conclusion of torah):
			// post-exilic persian 538-330
			events : [
1407 BC	Moses' Summary of Israel's History	Deuteronomy 1 - 4
1406 BC	Recapitulation of the Law	Deuteronomy 4:44 - 31
1406 BC	The Song of Moses	Deuteronomy 32
1406 BC	Moses Blesses the Twelve Tribes	Deuteronomy 32:48
1406 BC	Blessings of Moses	Deuteronomy 33
1406 BC	The Death of Moses	Deuteronomy 34			          
			          ]
			
			tags : [ "old testament", "pentateuch", "torah", "historical",
					"hebrew", "religious laws",
					"introduction to deuteronomistic history" ]
		},

		{
			category : catBible,
			subject : "Joshua",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: first edition, monarchic 745-586, 7th C, reign of
			// josiah
			// dating: completion, exilic 586-539
			events : [
1406 BC	God Commissions Joshua	Joshua 1
1406 BC	Rahab Welcomes the Spies	Joshua 2
1406 BC	The Israelites Cross the Jordan	Joshua 3 - 5
1406 BC	Conquer of Jericho and Ai	Joshua 6 - 8
1405 BC	Kings Join against Israel	Joshua 9
1405 BC	The Sun Stands Still	Joshua 10
1405 BC	Northern Palestine Defeated	Joshua 11, 12
1399 BC	Land allotted among the Tribes	Joshua 13 - 22
1375 BC	Joshua's Farewell Address	Joshua 23, 24			          
			          ]
			tags : [ "old testament", "historical", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Judges",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: first edition, monarchic 745-586, 7th C, reign of
			// josiah
			// dating: completion, exilic 586-539
			events: [
1375 BC	Micah's Idolatry	Judges 17
1375 BC	Danites Settle in Laish, Take Micah's Idols	Judges 18
1375 BC	A Levite's Concubine Degraded	Judges 19
1375 BC	Israelites Defeat the Benjamites	Judges 20
1375 BC	Wives for the Benjamites	Judges 21
1374 BC	Israelites Capture Jerusalem, Hebron	Judges 1
1374 BC	Israel Rebuked and Defeated	Judges 2
1374 BC	Israel's idolatry and Servitude; Othniel	Judges 3
1334 BC	Eglon	Judges 3:12
1316 BC	Ehud	Judges 3:15
1235 BC	Deborah and Barak	Judges 4
1235 BC	The Song of Deborah and Barak	Judges 5
1169 BC	Gideon and the Midianites	Judges 6 - 8		
1129 BC	Abimelech Conspires to Become King	Judges 9
1126 BC	Plot against Abimelech	Judges 9:22
1126 BC	Abimelech is Slain	Judges 9:50
1118 BC	Tola, Jair	Judges 10
1097 BC	Jephthah's Covenant with the Gileadites	Judges 11
1090 BC	Jephthah, Ephraim, Ibzan, Elon, Abdon	Judges 12
1090 BC	Israel Oppressed by the Philistines	Judges 13
1075 BC	Samson's Marriage and Riddle	Judges 14
1075 BC	Samson Burns the Philistine Crops	Judges 15
1075 BC	Samson and Delilah	Judges 16
			         ]
			tags : [ "old testament", "historical", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Ruth",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: persian
			events: [
1140 BC	Naomi, Ruth and Boaz	Ruth 1 - 4			         
			         ]
			tags : [ "old testament", "historical", "hebrew", "moab", "great grandmother of david" ]
		},
		{
			category : catBible,
			subject : "1 Samuel",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: first edition, monarchic 745-586, 7th C, reign of
			// josiah
			// dating: completion, exilic 586-539
			events : [
1100 BC	Birth of Samuel	1 Samuel 1
1100 BC	Hannah's Song	1 Samuel 2		
1070 BC	Battle of Shiloh	1 Samuel 3
1070 BC	Philistines Take the Ark	1 Samuel 4, 5
1070 BC	Philistines Return the Ark to Israel	1 Samuel 6
1070 BC	Ark brought to Abinadab's House	1 Samuel 7
1050 BC	Israelites Repent at Mizpeh	1 Samuel 7:3
1043 BC	Saul Becomes King	1 Samuel 8 - 10
1042 BC	Saul Defeats the Ammonites	1 Samuel 11, 12
1041 BC	Saul's War with the Philistines	1 Samuel 13
1041 BC	Jonathan's Miraculous Victory	1 Samuel 14
1028 BC	Saul's Disobedience and Samuel's Rebuke	1 Samuel 15
1024 BC	Samuel Anoints David at Bethlehem	1 Samuel 16
1024 BC	David Kills Goliath	1 Samuel 17
1015 BC	Jonathan's Friendship with David	1 Samuel 18
1014 BC	David Protected from Saul	1 Samuel 19
1013 BC	David and Jonathan's Covenant	1 Samuel 20
1012 BC	David at Nob and Gath	1 Samuel 21
1011 BC	Saul Slays the Priests of Nob	1 Samuel 22
1011 BC	David Flees Saul	1 Samuel 23
1011 BC	David Spares Saul's Life	1 Samuel 24
1011 BC	Samuel Dies	1 Samuel 25
1011 BC	David Spares Saul a Second Time	1 Samuel 26
1010 BC	David Flees to the Philistines	1 Samuel 27
1010 BC	Saul and the Witch of Endor	1 Samuel 28
1010 BC	Achish Sends David Away	1 Samuel 29
1010 BC	David Destroys the Amalekites	1 Samuel 30
1010 BC	Saul and His Sons Killed	1 Samuel 31
]
			tags : [ "old testament", "historical", "hebrew" ]
		},
		{
			category : catBible,
			subject : "2 Samuel",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: first edition, monarchic 745-586, 7th C, reign of
			// josiah
			// dating: completion, exilic 586-539
			events: [
1010 BC	David Mourns for Saul and Jonathan	2 Samuel 1
1010 BC	David Made King over Judah	2 Samuel 2
1008 BC	Civil War Between Abner and Joab	2 Samuel 2:12
1006 BC	House of David Strengthened	2 Samuel 3
1005 BC	Joab murders Abner	2 Samuel 3:22
1004 BC	The Murder of Ish-bosheth	2 Samuel 4		
1003 BC	David Reigns over All Israel	2 Samuel 5,
1 Chronicles 11
1000 BC	The Ark is Brought to Jerusalem	2 Samuel 6,
1 Chronicles 15
995 BC	David and Mephibosheth	2 Samuel 9
995 BC	David Defeats Ammon and Aram	2 Samuel 10,
1 Chronicles 19
993 BC	David and Bathsheba	2 Samuel 11
991 BC	Nathan Rebukes David	2 Samuel 12
990 BC	Solomon is Born	2 Samuel 12:24
990 BC	Amnon and Tamar	2 Samuel 13
990 BC	Amnom Killed by Absalom	2 Samuel 13:23
988 BC	The Widow of Tekoa	2 Samuel 14
980 BC	Absalom Recalled	2 Samuel 14:21
976 BC	Absalom's Conspiracy	2 Samuel 15
976 BC	David Flees Jerusalem	2 Samuel 15:13
972 BC	David and Ziba, Shimei	2 Samuel 16
972 BC	Shimei Curses David	2 Samuel 16:5
972 BC	Hushai's Warning Saves David	2 Samuel 17
972 BC	Absalom Slain by Joab	2 Samuel 18
972 BC	Joab Comforts David	2 Samuel 19
972 BC	Sheba Rebels Against David	2 Samuel 20
970 BC	The Gibeonites Avenged	2 Samuel 21
970 BC	David's Song of Deliverance	2 Samuel 22
970 BC	David's Last Song	2 Samuel 23
970 BC	David Counts the Fighting Men	2 Samuel 24
			         ]
			tags : [ "old testament", "historical", "hebrew" ]
		},
		{
			category : catBible,
			subject : "1 Kings",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: first edition, monarchic 745-586, 7th C, reign of
			// josiah
			// dating: completion, exilic 586-539
			events: [
970 BC	David's last days	1 Chronicles 28, 29,
1 Kings 1, 2
967 BC	Solomon Asks for Wisdom	2 Chronicles 1,
1 Kings 3
967 BC	Solomon's Wisdom	1 Kings 4
967 BC	Solomon's Preparations for the Temple	1 Kings 5
966 BC	The Building of Solomon's Temple	1 Kings 6
966 BC	The Building of Solomon's Palace	1 Kings 7
966 BC	The Ark Brought to the Temple	1 Kings 8
966 BC	God's covenant with Solomon	1 Kings 9
946 BC	Mutual Presents of Solomon and Hiran	1 Kings 9:10
946 BC	The Queen of Sheba Visits Solomon	1 Kings 10,
2 Chronicles 9
939 BC	Solomon's Wives and Idolatry	1 Kings 11
931 BC	Solomon's Death	1 Kings 11:40
931 BC	The Kingdom is Divided	1 Kings 12, 13
925 BC	Ahijah's Prophecies against Jeroboam	1 Kings 14
913 BC	Rehoboam's Wicked Reign	1 Kings 14:21
913 BC	Abijam's wicked reign	1 Kings 15
909 BC	Jehu's prophecy against Baasha	1 Kings 16
886 BC	Elah, Zimri, Omri	1 Kings 16:5
874 BC	Ahab's wicked reign	1 Kings 16:27
863 BC	Elijah Prays for Drought	1 Kings 17
863 BC	Elijah Fed by Ravens	1 Kings 17:3
863 BC	The Widow at Zarephath	1 Kings 17:7
863 BC	Elijah on Mount Carmel	1 Kings 18
858 BC	Elijah Flees Jezebel	1 Kings 19
858 BC	Elisha Called	1 Kings 19:19
857 BC	Ben-Hadad Attacks Samaria	1 Kings 20
857 BC	Ahab Defeats Ben-Hadad	1 Kings 20:14
855 BC	Ahab Takes Naboth's Vineyard	1 Kings 21
853 BC	Israel and Judah against Syria	1 Kings 22


			         ],
			tags : [ "old testament", "historical", "hebrew" ]
		},
		{
			category : catBible,
			subject : "2 Kings",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: first edition, monarchic 745-586, 7th C, reign of
			// josiah
			// dating: completion, exilic 586-539
			events :[
852 BC	Moab Rebels	2 Kings 1
851 BC	Elijah Taken up to Heaven	2 Kings 2
851 BC	Elisha Succeeds Elijah	2 Kings 2:12
850 BC	Jehoram Meets Moab Rebellion	2 Kings 3
849 BC	The Widow's Oil	2 Kings 4
849 BC	Elisha Raises The Shunammite boy	2 Kings 4:8
849 BC	The Healing of Naaman	2 Kings 5
848 BC	Elisha Floats an Axhead	2 Kings 6
848 BC	Elisha Promises Plenty in Samaria	2 Kings 7
847 BC	The Shunammite's Land	2 Kings 8
841 BC	Jehu Reigns in Israel	2 Kings 9
841 BC	Jehu Kills Joram	2 Kings 9:11
841 BC	Ahab's Family Killed	2 Kings 10
841 BC	Baal Worshipers killed	2 Kings 10:18
841 BC	Joash escapes Athaliah	2 Kings 11
835 BC	Joash Reigns Well	2 Chronicles 24,
2 Kings 12
812 BC	Joash Orders Temple repairs	2 Kings 12:6
812 BC	Jehoahaz's wicked reign	2 Kings 13
796 BC	Amaziah's good reign	2 Kings 14,
2 Chronicles 25
790 BC	Azariah's good reign	2 Kings 15
790 BC	Azariah's good reign	2 Kings 15
742 BC	Wicked Reign of Ahaz	2 Chronicles 28,
2 Kings 16
725 BC	Hoshea the Last King of Israel	2 Kings 17
722 BC	Israel Led into Captivity	2 Kings 17:6
721 BC	Strange Nations Transplanted into Samaria	2 Kings 17:24
712 BC	Hezekiah's Illness and Healing	2 Kings 20,
Isaiah 38
711 BC	Hezekiah Shows Treasures	2 Kings 20:12,
Isaiah 39
701 BC	Sennacherib Threatens Jerusalem	2 Kings 18,
Isaiah 36,
2 Chronicles 32
701 BC	Hezekiah's Prayer	2 Kings 19,
Isaiah 37
687 BC	Manasseh's Wicked Reign	2 Kings 21,
2 Chronicles 33
640 BC	Josiah's good reign	2 Kings 22,
2 Chronicles 34
621 BC	Josiah Prepares for Temple Repair	2 Kings 22:3
621 BC	Hilkiah finds the lost Book of the Law	2 Kings 22:8
621 BC	Josiah Celebrates the Passover	2 Kings 23,
2 Chronicles 35
601 BC	Rebellion of Jehoiakim	2 Kings 24
597 BC	Jehoiachim exiled	2 Kings 24:10
597 BC	Zedekiah reigns in Judah	2 Kings 24:18
588 BC	Siege of Jerusalem Begins	2 Kings 25
586 BC	The Fall of Jerusalem	2 Kings 25,
Jeremiah 52

			         ],
			tags : [ "old testament", "historical", "hebrew" ]
		},
		{
			category : catBible,
			subject : "1 Chronicles",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: post-exilic persian 538-330, narrow to 350-300
			events: [
1003 BC	Genealogies of the Israelites	1 Chronicles 1 - 9
1003 BC	Saul's Overthrow and Defeat	1 Chronicles 10
1003 BC	David Reigns over All Israel	2 Samuel 5,
1 Chronicles 11
1002 BC	David's Army Grows	1 Chronicles 12
1000 BC	David fetches the ark	1 Chronicles 13
1000 BC	David's Family Grows	1 Chronicles 14
1000 BC	The Ark is Brought to Jerusalem	2 Samuel 6,
1 Chronicles 15		
998 BC	David's festival sacrifice	1 Chronicles 16
997 BC	David Purposes to build a Temple	1 Chronicles 17
996 BC	David Strengthens His Kingdom	1 Chronicles 18
995 BC	David Defeats Ammon and Aram	2 Samuel 10,
1 Chronicles 19
995 BC	The Capture of Rabbah	1 Chronicles 20
979 BC	David Forces a Census	1 Chronicles 21
979 BC	Preparation for building the Temple	1 Chronicles 22
979 BC	Preparation of Priesthood	1 Chronicles 23
979 BC	Divisions of Levites	1 Chronicles 24
979 BC	Preparation of sanctuary singers	1 Chronicles 25
979 BC	Preparation of gatekeepers, treasurers	1 Chronicles 26
979 BC	Preparation of government	1 Chronicles 27
970 BC	David's last days	1 Chronicles 28, 29,
1 Kings 1, 2
967 BC	Solomon Asks for Wisdom	2 Chronicles 1,
1 Kings 3

]
			tags : [ "old testament", "historical", "hebrew" ]
		},
		{
			category : catBible,
			subject : "2 Chronicles",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: post-exilic persian 538-330, narrow to 350-300
			events: [
966 BC	Solomon Prepares for a Temple and Palace	2 Chronicles 2
966 BC	Solomon Builds the Temple in Jerusalem	2 Chronicles 3
966 BC	Temple Furnishings	2 Chronicles 4
959 BC	Ark Brought into the Temple	2 Chronicles 5
959 BC	Solomon's Prayer of Temple Dedication	2 Chronicles 6
959 BC	God's Glory in the Temple	2 Chronicles 7
959 BC	Solomon's buildings	2 Chronicles 8
946 BC	The Queen of Sheba Visits Solomon	1 Kings 10,
2 Chronicles 9
930 BC	Israelites Rebel against Rehoboam	2 Chronicles 10
930 BC	Rehoboam's Reign over Judah	2 Chronicles 11
927 BC	Rehoboam's sin	2 Chronicles 12
913 BC	Civil War against Jeroboam	2 Chronicles 13
913 BC	Asa Destroys Idolatry	2 Chronicles 14
895 BC	Asa's Reforms	2 Chronicles 15
894 BC	Hanani's rebuke	2 Chronicles 16
869 BC	Jehoshaphat Succeeds Asa	2 Chronicles 17
853 BC	Jehoshaphat Allies with Ahab	2 Chronicles 18
853 BC	Jehosaphat's deeds	2 Chronicles 19
853 BC	War with Ammon and Moab	2 Chronicles 20
852 BC	Jehoram's Wicked Reign in Judah	2 Chronicles 21
841 BC	Ahaziah Succeeds Jehoram in Judah	2 Chronicles 22
841 BC	Jehoiada Makes Joash King	2 Chronicles 23
835 BC	Joash Reigns Well	2 Chronicles 24,
2 Kings 12
796 BC	Amaziah's good reign	2 Kings 14,
2 Chronicles 25
790 BC	Uzziah Reigns in Judah	2 Chronicles 26
750 BC	Jotham Succeeds Uzziah	2 Chronicles 27
742 BC	Wicked Reign of Ahaz	2 Chronicles 28,
2 Kings 16
716 BC	Hezekiah's Good Reign	2 Chronicles 29
715 BC	Hezekiah proclaims a solemn Passover	2 Chronicles 30
715 BC	Idolatry is Destroyed	2 Chronicles 31
701 BC	Sennacherib Threatens Jerusalem	2 Kings 18,
Isaiah 36,
2 Chronicles 32
687 BC	Manasseh's Wicked Reign	2 Kings 21,
2 Chronicles 33
640 BC	Josiah's good reign	2 Kings 22,
2 Chronicles 34
621 BC	Josiah Celebrates the Passover	2 Kings 23,
2 Chronicles 35
609 BC	Jehoiakim's wicked reign.	2 Chronicles 36

],
			tags : [ "old testament", "historical", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Ezra",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating (origins of): post-exilic persian 538-330
			events : [
537 BC	The Proclamation of Cyrus	Ezra 1
537 BC	The Exiles Return	Ezra 2
535 BC	Temple Work Begins	Ezra 3
534 BC	Adversaries Hinder Temple Work	Ezra 4
534 BC	Artaxerxes Orders Work Stopped	Ezra 4:17
520 BC	Tattenai's Letter to Darius	Ezra 5
520 BC	Temple Work Resumed by Darius' Decree	Ezra 6
515 BC	Completion and Dedication of the Temple	Ezra 6:16
458 BC	Ezra Journeys to Jerusalem	Ezra 7
458 BC	Ezra Commissioned by Artaxerxes	Ezra 7:11
457 BC	Families Return to Jerusalem with Ezra	Ezra 8
457 BC	Ezra's reforms	Ezra 9
456 BC	Ezra's Prayer About Intermarriage	Ezra 10
			          ],
			tags : [ "old testament", "historical", "hebrew", "aramaic" ]
		},
		{
			category : catBible,
			subject : "Nehemiah",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating (origins of): post-exilic persian 538-330
			events : [
445 BC	Nehemiah's Prayer for the Exiles	Nehemiah 1
444 BC	Artaxerxes Sends Nehemiah to Jerusalem	Nehemiah 2
444 BC	Builders of the Walls Named	Nehemiah 3
444 BC	Builders Overcome Ridicule	Nehemiah 4
444 BC	Nehemiah Abolishes Debt and Bondage	Nehemiah 5
444 BC	Sanballat's Plot	Nehemiah 6
444 BC	Completion of the Wall	Nehemiah 6:15
444 BC	Census of Returned Exiles	Nehemiah 7
444 BC	Ezra Reads the Law	Nehemiah 8
444 BC	Israelites Fast and Repent	Nehemiah 9
444 BC	Israelites Seal the Covenant	Nehemiah 10
444 BC	People Settle in Jerusalem	Nehemiah 11, 12
432 BC	Nehemiah Restores Laws	Nehemiah 13			          
			          ],
			tags : [ "old testament", "historical", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Tobit",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: maccabean/hasmonean 164-4BC: 225-175
			tags : [ "old testament", "historical", "deuterocanonical",
					"hebrew", "aramaic" ]
		},
		{
			category : catBible,
			subject : "Judith",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: maccabean/hasmonean 164-4BC: 150-100
			tags : [ "old testament", "historical", "deuterocanonical",
					"hebrew" ]
		},
		{
			category : catBible,
			subject : "Esther",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: maccabean/hasmonean 164-4BC
			events : [
483 BC	Queen Vashti Deposed	Esther 1
478 BC	Esther Becomes Queen	Esther 2
478 BC	Mordecai Thwarts a Conspiracy	Esther 2:21
474 BC	Haman Seeks Revenge on the Jews	Esther 3
473 BC	Mordecai Informs Esther of Haman's Plot	Esther 4
473 BC	Esther Prepares a Banquet	Esther 5
473 BC	The King Honors Mordecai	Esther 6
473 BC	Haman Is Hanged	Esther 7
473 BC	Xerxes' Edict on Behalf of Esther and Jews	Esther 8
472 BC	Purim Instituted	Esther 9
472 BC	Xerxes' Tribute to Mordecai	Esther 10			          
			          ],
			tags : [ "old testament", "historical", "partly deuterocanonical",
					"hebrew" ]
		},
		{
			category : catBible,
			subject : "1 Maccabees",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: maccabean/hasmonean 164-4BC; 100BCE
			tags : [ "old testament", "historical", "deuterocanonical", "greek" ]
		},
		{
			category : catBible,
			subject : "2 Maccabees",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: maccabean/hasmonean 164-4BC: 100BCE
			tags : [ "old testament", "historical", "deuterocanonical", "greek" ]
		},
		{
			category : catBible,
			subject : "3 Maccabees",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: maccabean/hasmonean 164-4BC: 100-75BCE
			tags : [ "old testament", "historical", "deuterocanonical", "greek" ]
		},
		{
			category : catBible,
			subject : "4 Maccabees",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: maccabean/hasmonean 164-4BC; mid 1st C CE.
			tags : [ "old testament", "historical", "deuterocanonical", "greek" ]
		},
		{
			category : catBible,
			subject : "Job",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: post-exilic hellenistic 330-164
			
			events: ["Before 2100 BC","Job's Suffering and Faith","Job 1 - 42"],
			tags : [ "old testament", "sapiential", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Psalms",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: first 2/3 are monarchic 745-586
			// dating: exilic 586-529 - psalms of david ending with ps 89
			// dating: final third, post-exilic hellenistic 330-164
			
			events [
1407 BC	Psalm of Moses	Psalm 90
1013 BC	David's Psalm of Deliverance (1Sa 20)	Psalm 59
1012 BC	David's Psalm Fleeing Saul (1Sa 21)	Psalm 52
1012 BC	David's Psalm Before Ahimelech (1Sa 21)	Psalm 34
1011 BC	David's Psalm at Gath (1Sa 21)	Psalm 56
1011 BC	David's Psalms in the Cave (1Sa 22)	Psalms 57, 142
1011 BC	David's Psalm at Keilah (1Sa 23)	Psalm 54
98 BC	David's Psalm of Victory (2Sa 8)	Psalm 60
998 BC	David's Psalm of Zion	Psalm 15
998 BC	David's Psalm of Glory to God	Psalm 24
998 BC	Psalms of Praise (1Ch 16)	Psalms 96, 105, 106
991 BC	David's Psalm of Repentance (2Sa 12)	Psalm 51
979 BC	Psalms of David	Psalms 2 - 145 (Assorted)
979 BC	Psalms of Korah	Psalms 42 - 44, 84, 85, 87, 88
979 BC	Psalms of Asaph	Psalm 50, 73, 75 - 78, 80 - 83, 89
979 BC	Psalms of Unknown Authors	Psalms 1 - 150 (Assorted)
972 BC	David's Psalm of Thirst for God (2Sa 16)	Psalm 63
972 BC	David Psalms of Deliverance (2Sa 17)	Psalms 41, 55
970 BC	David's Psalm of Salvation (1Ki 2)	Psalm 37
967 BC	Psalm for Solomon (2Ch 1)	Psalm 72
967 BC	Psalm of Korah (1Ki 3)	Psalm 45
959 BC	Psalms of Solomon (2Ch 7)	Psalms 135, 136
950 BC	Solomon Psalm of Blessing	Psalm 127
701 BC	Korah's Psalms of Refuge (2Ch 32)	Psalms 46 - 48
586 BC	Psalms of Desolation (Jer. 52)	Psalms 74, 79

],
			tags : [ "old testament", "sapiential", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Proverbs",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: impossible to date
			events: [
950 BC	The Proverbs of Solomon	Proverbs 1 - 29
950 BC	The Words of Agur	Proverbs 30
950 BC	King Lemuel's Proverb	Proverbs 31			         
			         ],
			tags : [ "old testament", "sapiential", "hebrew",
					"collection of collections" ]
		},
		{
			category : catBible,
			subject : "Ecclesiastes",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: post-exilic hellenistic 330-164
			events: [
937 BC	Ecclesiastes Words of the Preacher	Ecclesiastes 1 - 12			         
			         ],
			tags : [ "old testament", "sapiential", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Song of Solomon",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: post-exilic hellenistic 330-164
			events: [
950 BC	Solomon's Song of Songs	Songs 1 - 8			         
			         ],
			tags : [ "old testament", "sapiential", "hebrew", "song of songs" ]
		},
		{
			category : catBible,
			subject : "Wisdom",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: maccabean/hasmonean 164-4BC
			// dating: roman post 4BC; 1st C. BCE or CE.
			tags : [ "old testament", "sapiential", "deuterocanonical", "greek" ]
		},
		{
			category : catBible,
			subject : "Sirach",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: 180BC?
			tags : [ "old testament", "sapiential", "deuterocanonical",
					"ecclesiasticus", "hebrew", "ben sira" ]
		},
		{
			category : catBible,
			subject : "Isaiah",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: 1st Isaiah (1-39): monarchic 745-586, 8th C - the true
			// isaiah
			// dating: 2nd Isaiah (40-55) exilic 586-539, mid 6th C in
			// babylon - anonymous prophet in Babylon during exile.
			// dating: 3rd Isaiah (56-66): post-exilic persian 538-330 -
			// anonymous authors in Jersusalem immediately after exile
			events : [
739 BC	Isaiah Complains of Zion's Corruption	Isaiah 1 - 5
739 BC	Isaiah's Vision and Commission	Isaiah 6
735 BC	Isaiah's Prophesy of Immanuel	Isaiah 7
734 BC	Uriah and Zechariah	Isaiah 8
730 BC	Isaiah Prophesies a Child Is Born	Isaiah 9
730 BC	Isaiah Prophesies Judgments Upon Israel	Isaiah 9:8
730 BC	Isaiah Prophesies Judgment on Assyria	Isaiah 10
730 BC	Isaiah Prophesies The Root of Jesse	Isaiah 11
730 BC	Isaiah's Joyful Thanksgiving	Isaiah 12
725 BC	Isaiah Prophesies against the Nations	Isaiah 13 - 22
725 BC	Isaiah's Valley of Vision	Isaiah 22
725 BC	Isaiah's Burden of Tyre	Isaiah 23
725 BC	Devastation on the Earth	Isaiah 24
725 BC	Isaiah's Songs of Praise	Isaiah 25 - 27
725 BC	Isaiah's Further Warnings	Isaiah 28 - 32
725 BC	Isaiah Prophesies a King Shall Reign	Isaiah 32
725 BC	Isaiah Declares God's Judgments	Isaiah 33, 34
725 BC	Isaiah Declares the Joyful Will Flourish in Zion	Isaiah 35
712 BC	Hezekiah's Illness and Healing	2 Kings 20,
Isaiah 38
711 BC	Hezekiah Shows Treasures	2 Kings 20:12,
Isaiah 39
711 BC	Isaiah Prophesies Captivity and Restoration	Isaiah 40 - 66
701 BC	Sennacherib Threatens Jerusalem	2 Kings 18,
Isaiah 36,
2 Chronicles 32
701 BC	Hezekiah's Prayer	2 Kings 19,
Isaiah 37


			          ]
			tags : [ "old testament", "prophetic", "major", "hebrew",
					"proto isaiah", "deutero isaih", "trito isaiha",
					"Isaiah ben Amoz" ]
		},
		{
			category : catBible,
			subject : "Jeremiah",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: exilic late 7th, early 6th C
			// dating (Masoretic Hebrew version): post-exilic persian
			// 538-330
			events : [
627 BC	The Call of Jeremiah	Jeremiah 1
627 BC	Jeremiah Declares Judah Forsakes God	Jeremiah 2 - 6
627 BC	Jeremiah's Message at the Temple Gate	Jeremiah 7 - 10
622 BC	Jeremiah Proclaims God's Covenant	Jeremiah 11, 12
609 BC	Jeremiah Proclaims Covenant Is Broken	Jeremiah 13 - 20
609 BC	Jeremiah Prophesies against Egypt	Jeremiah 46
609 BC	Jeremiah Prophesies against Philistia	Jeremiah 47
594 BC	Jeremiah Prophesies against Moab	Jeremiah 48
594 BC	Jeremiah Prophesies against Ammon	Jeremiah 49
588 BC	Jeremiah's Conflicts	Jeremiah 21 - 33
588 BC	Jeremiah Prophesies Judgment on Judah	Jeremiah 34 - 45
586 BC	The Fall of Jerusalem	2 Kings 25,
Jeremiah 52
586 BC	Jeremiah Prophesies against Babylon	Jeremiah 50, 51

			          ],
			tags : [ "old testament", "prophetic", "major", "hebrew", "greek" ]
		},
		{
			category : catBible,
			subject : "Lamentations",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: same as jeremiah? - myst be later than 586 BC
			events : [
586 BC	Jeremiah's Lamentations	Lamentations 1 - 5			          
			          ],
			tags : [ "old testament", "prophetic", "major", "hebrew",
					"jeremiah", "destruction of jerusalem by babylon" ]
		},
		{
			category : catBible,
			subject : "Baruch",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: after sirach (2nd C. BCE)
			tags : [ "old testament", "prophetic", "deuterocanonical",
					"hebrew", "greek" ]
		},
		{
			category : catBible,
			subject : "Ezekiel",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: exilic 586-539; narrow him to 592-571 in babylon
			events : [
593 BC	Ezekiel's Prophecy at Chebar	Ezekiel 1
593 BC	Ezekiel's Calling and Instruction	Ezekiel 2
593 BC	Ezekiel Eats the Scroll	Ezekiel 3
593 BC	Ezekiel Foretells Siege of Jerusalem	Ezekiel 4, 5
593 BC	Ezekiel's Vision of the End	Ezekiel 6, 7
592 BC	Ezekiel's First Temple Vision	Ezekiel 8 - 19
591 BC	Ezekiel Sees God Refuse the Elders	Ezekiel 20
591 BC	Ezekiel Prophesies against Jerusalem	Ezekiel 21, 22
591 BC	Ezekiel Prophesies against two Sisters	Ezekiel 23
588 BC	Siege of Jerusalem Begins	Ezekiel 24
587 BC	God's Vengeance on Ammon and Edom	Ezekiel 25
586 BC	Ezekiel Pronounces Judgment on Tyre	Ezekiel 26 - 28
586 BC	Ezekiel Prophesies against Egypt	Ezekiel 29 - 32
586 BC	Ezekiel the Watchman	Ezekiel 33
585 BC	Ezekiel Explains Jerusalem's Fall	Ezekiel 33:21
585 BC	Ezekiel Foresees Reproof and Restoration	Ezekiel 34 - 36
585 BC	Ezekiel Sees Resurrection of Dry Bones	Ezekiel 37
585 BC	Ezekiel Sees Future battle	Ezekiel 38
585 BC	Ezekiel Sees God's judgment upon Gog	Ezekiel 39
573 BC	Ezekiel's Second Temple Vision	Ezekiel 40 - 48


			          ],
			tags : [ "old testament", "prophetic", "major", "hebrew",
					"ezekial ben-buzi" ]
		},
		{
			category : catBible,
			subject : "Daniel",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: maccabean/hasmonean 164-4BC - narrow to 164
			events : [ 
605 BC	Daniel Refuses the King's Portion	Daniel 1
604 BC	Daniel Interprets Nebuchadnezzar Dream	Daniel 2
585 BC	Shadrach, Meshach, and Abednego	Daniel 3
582 BC	Nebuchadnezzar’s Dream	Daniel 4
582 BC	Daniel Interprets Nebuchadnezzar’s Dream	Daniel 4:19
539 BC	Daniel Interprets Handwriting on the Wall	Daniel 5
539 BC	Daniel Survives the Lions' Den	Daniel 6
539 BC	Daniel's Vision of Four Beasts	Daniel 7
539 BC	Daniel's Vision of the Ram and Goat	Daniel 8
539 BC	Daniel's Prayer and Gabriel's Answer	Daniel 9
539 BC	Daniel Comforted by the Angel	Daniel 10
539 BC	Daniel Prophesies Overthrow of Persia	Daniel 11
539 BC	Daniel Prophesies Deliverance for Israel	Daniel 12
			           ],
			tags : [ "old testament", "prophetic", "partly deuterocanonical",
					"hebrew", "aramaic" ]
		},
		{
			category : catBible,
			subject : "Hosea",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: monarchic 745-586, 8th C.
			// dating: exilic 586-529 - expansion
			events : [
753 BC	Hosea's Prophecies	Hosea 1 - 14			          
			          ],
			tags : [ "old testament", "prophetic", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Joel",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating - later persian or hellenistic
			events :[			         
835 BC	The Word of the LORD to Joel	Joel 1 - 3			         
			         			         ],
			tags : [ "old testament", "prophetic", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Amos",
			startYear : -765,
			endYear : -760,
			locName : "Tekoa",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: monarchic 745-586 in 8th C for first half, just prior
			// to Assyria's expansion (645)
			// dating: exilic 586-529 - expansion
			events : [
766 BC	The Words of Amos	Amos 1 - 9			          
			          ],
			tags : [ "old testament", "prophetic", "hebrew", "jeroboam II",
					"uzziah", "destructive power of God", "ancient hymn",
					"locusts", "fruit", "day of the lord", "praise of farmers",
					"contempt for the wealthy" ]
		},
		{
			category : catBible,
			subject : "Obadiah",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: exilic 586-539, fall of jerusalem 586
			events :[
853 BC	The Vision of Obadiah	Obadiah 1			         
			         ],
			tags : [ "old testament", "prophetic", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Jonah",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: post-exilic hellenistic 330-164 - persian or
			// hellenistic
			events :[
760 BC	Jonah Sent to Nineveh	Jonah 1 - 4			         
			         ],
			tags : [ "old testament", "prophetic", "hebrew", "fictional" ]
		},
		{
			category : catBible,
			subject : "Micah",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: monarchic (second half) 745-586, 8th C (second
			// half???)
			// dating: exilic 586-529 - expansion
			events : [
735 BC	The Word of the LORD to Micah	Micah 1 - 7			          
			          ],
			tags : [ "old testament", "prophetic", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Nahum",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating; monarchic 745-586, 7th C - fall of thebes, call for
			// destruction of nineveh
			events : [
697 BC	The Vision of Nahum	Nahum 1 - 3

			          ]
			tags : [ "old testament", "prophetic", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Habakkuk",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: monarchic 745-586, 7th C, before battle of carchemish
			// 605
			events : [
625 BC	The Oracle to Habakkuk	Habakkuk 1 - 3			          
			          ],
			tags : [ "old testament", "prophetic", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Zephaniah",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: monarchic 745-586, 7th C, reign of josiah(649-609)
			// dating: exilic 586-529 - expansion
			events : [
638 BC	The Word of the LORD to Zephaniah	Zephaniah 1 - 3			          
			          ]
			tags : [ "old testament", "prophetic", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Haggai",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: post-exilic persian 538-330 - persian king darius
			// 520
			events : [
520 BC	The Word of the LORD by Haggai	Haggai 1, 2
			          
			          ],
			tags : [ "old testament", "prophetic", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Zechariah",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: post-exilic persian 538-330, ch 1-8 same time as
			// haggai, ch 9-14 in 5th C.
			events : [
520 BC	The Word of the LORD to Zechariah	Zechariah 1 - 14
			          ],
			tags : [ "old testament", "prophetic", "hebrew" ]
		},
		{
			category : catBible,
			subject : "Malachi",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location : null,
			brightness : null,
			mapMarker : null,
			// dating: post-exilic persian 538-330, 5th C, missions of
			// nehemiah and ezra
			events : [
430 BC	The Word of the LORD by Malachi	Malachi 1 - 4			          
			          ],
			tags : [ "old testament", "prophetic", "hebrew" ]
		},

		/*
		 * Matthew- NT, gospel, canonical, synoptic, greek Mark- NT, gospel,
		 * canonical, synoptic, greek Luke- NT, gospel, canonical, synoptic
		 * John- NT, gospel, canonical Acts of the Apostles- NT, luke,
		 * historical Romans- NT, paul, greek 1 Corinthians- NT, paul, pauline
		 * epistle, greek 2 Corinthians- NT, paul, pauline epistle, greek
		 * Galatians- NT, paul, pauline epistle, greek Ephesians- NT, paul,
		 * pauline epistle, greek Philippians- NT, paul, pauline epistle, greek
		 * Colossians- NT, paul, pauline epistle, greek 1 Thessalonians- NT,
		 * paul, pauline epistle, greek 2 Thessalonians- NT, paul, pauline
		 * epistle, greek 1 Timothy- NT, paul, pauline epistle, greek 2 Timothy-
		 * NT, paul, pauline epistle, greek Titus- NT, paul, pauline epistle,
		 * greek Philemon- NT, paul, pauline epistle, greek Hebrews- NT, paul,
		 * pauline epistle, greek James- NT, general epistle, greek 1 Peter- NT,
		 * general epistle, greek 2 Peter- NT, general epistle, greek 1 John-
		 * NT, general epistle, greek 2 John- NT, general epistle, greek 3 John-
		 * NT, general epistle, greek Jude- NT, general epistle, greek
		 * Revelation- NT, john, greek
		 * 
		 * when were greek and roman conquests?? rule?? why so much greek in NT? -
		 * conquests of alexander the great (335-323BC) byzantine greek emerges
		 * 600AD Hellenistic culture of Roman Empire Alexandria had larger
		 * Jewish population than Jerusalem Greek was spoken by more Jews than
		 * Hebrew
		 * 
		 * 
		 * 
		 * periods of captivity babylon vs. persia vs. judah. vs. israel
		 */

		{
			category : catEvent,
			subject : "Crucifixion of Jesus",
			startYear : 32,
			endYear : 32,
			locName : "Jerusalem",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "new testament", "crucifixion", "resurrection" ]
		},
		{
			category : catEvent,
			subject : "Paul in Damascus",
			startYear : 37,
			endYear : 40,
			locName : "Damascus",
			location : null,
			brightness : null,
			mapMarker : null,
			tags : [ "new testament", "event", "paul", "galatians", "acts",
					"king aretas", "stoning of stephen" ]
		}

// TODO - it won't be complete until I figure out death of St. Peter
];

var centerLocation = null;

function prepAncientEntities() {
	// 1. sort locations
	var sortedLocations = locations.sort(function(a, b) {
		if (a.locName < b.locName)
			return -1;
		if (a.locName > b.locName)
			return 1;
		return 0;
	});
	// 2. check no duplicate locations (and find Athens, our center-of-the-map
	var lastLoc = null;
	for (var i = 0; i < sortedLocations.length; i++) {
		var currentLoc = sortedLocations[i].locName.trim();
		if (currentLoc == "Athens") {
			centerLocation = sortedLocations[i];
		}
		if (lastLoc == null || lastLoc != currentLoc) {
			lastLoc = currentLoc;
			continue;
		}
		throw "Data sin: found duplicate location *" + currentLoc + "*";
	}
	if (centerLocation == null) {
		throw "Data sin: unable to find Athens as center location";
	}

	for (var i = 0; i < ancientEntities.length; i++) {
		// Validate each entity refers to a valid location.
		var found = false;
		for (var j = 0; j < sortedLocations.length; j++) {
			if (ancientEntities[i].locName == sortedLocations[j].locName) {
				ancientEntities[i].location = {
					lat : sortedLocations[j].lat,
					lng : sortedLocations[j].lng
				};
				found = true;
				break;
			}
		}
		if (found == false) {
			throw "Data sin: location not found *" + ancientEntities[i].subject
					+ "*" + ancientEntities[i].locName + "*";
		}

		// Assign each location a marker color; startYear must fall into one of
		// the disjoint interrvals
		found = false;
		for (var j = 0; j < brightnesses.length; j++) {
			if (ancientEntities[i].startYear >= brightnesses[j].startYear
					&& ancientEntities[i].startYear <= brightnesses[j].endYear) {
				found = true;
				ancientEntities[i].brightness = brightnesses[j].color;
				break;
			}
		}
		if (found == false) {
			throw "Data sin: brightness not found *"
					+ ancientEntities[i].subject + "*"
					+ ancientEntities[i].locName + "*";
		}

		// Collect tags per category
		for (var j = 0; j < ancientEntities[i].tags.length; j++) {
			ancientEntities[i].category.tags.push(ancientEntities[i].tags[j]);
		}
		ancientEntities[i].category.tags.push(ancientEntities[i].locName);
		ancientEntities[i].category.tags.push(ancientEntities[i].subject);
	}

	// clean up tags per category
	for (var i = 0; i < categories.length; i++) {
		categories[i].tags.sort(function(a, b) {
			if (a < b)
				return -1;
			if (a > b)
				return 1;
			return 0;
		});
		var lastTag = null;
		var newTags = [];
		for (var j = 0; j < categories[i].tags.length; j++) {
			if (lastTag == null || categories[i].tags[j] != lastTag) {
				lastTag = categories[i].tags[j];
				newTags.push(categories[i].tags[j]);
			}
		}
		categories[i].tags = newTags;
		// console.log("Tags for cat " + categories[i].desc + " are " +
		// categories[i].tags.join(","));
	}

	// MiQL - pronouced Michael, is the Mike Query Language.
	// Examples: Find all biblical books with tags like deutero.
	// Basically just a where clause; you always select *; it's always FROM the
	// overall cataglog
	// Where (logical and fuzzy matching on): subject, location, authorship,
	// date range, tags, ...

	// TODO - finalize the data model, esp time periods (150-year intervals vs.
	// historical intervals (exilic, persian, hellenistic, etc)
	// and entities (multiple authors, time periods, etc).
	// from there will emerge MiQL structure
	
	// TODO - could a DSL be the best way??

	function runMiQLQuery(queryString) {
		return null;
	}

	// TODO - use BCE and CE rather than BC and AD

}
