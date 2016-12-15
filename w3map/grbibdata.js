/*
Source: Wikipedia for MOST of IT, including geo coordinates, dates.
http://www.matthewmcgee.org/paultime.html - paul data
 */

var locations = [ {
	"LocationName" : "Miletus",
	"lat" : 37.530233,
	"lng" : 27.278369
}, {
	"LocationName" : "Samos",
	"lat" : 37.75479,
	"lng" : 26.97777
}, {
	"LocationName" : "Colophon",
	"lat" : 38.108889,
	"lng" : 27.141667
}, {
	"LocationName" : "Elea",
	"lat" : 40.160833,
	"lng" : 15.155
}, {
	"LocationName" : "Ephesus",
	"lat" : 37.941111,
	"lng" : 27.341944
}, {
	"LocationName" : "Clazomenae",
	"lat" : 38.358167,
	"lng" : 26.767583
}, {
	"LocationName" : "Acragas",
	"lat" : 37.316667,
	"lng" : 13.583333
}, {
	"LocationName" : "Abdera",
	"lat" : 40.933333,
	"lng" : 24.966667
}, {
	"LocationName" : "Croton",
	"lat" : 39.083333,
	"lng" : 17.116667
}, {
	"LocationName" : "Athens",
	"lat" : 37.966667,
	"lng" : 23.716667
}, {
	"LocationName" : "Stagira",
	"lat" : 40.591667,
	"lng" : 23.794722
}, {
	"LocationName" : "Sinope",
	"lat" : 42.033333,
	"lng" : 35.15
}, {
	"LocationName" : "Elis",
	"lat" : 37.720923,
	"lng" : 21.607014
}, {
	"LocationName" : "Citium",
	"lat" : 34.9233,
	"lng" : 33.6305
}, {
	"LocationName" : "Assos",
	"lat" : 39.487778,
	"lng" : 26.336944
}, {
	"LocationName" : "Soli",
	"lat" : 36.741944,
	"lng" : 34.54
}, {
	"LocationName" : "Arpino",
	"lat" : 41.647778,
	"lng" : 13.609722
}, {
	"LocationName" : "Hierapolis",
	"lat" : 37.925,
	"lng" : 29.125833
}, {
	"LocationName" : "Rome",
	"lat" : 41.9,
	"lng" : 12.5
}, {
	"LocationName" : "Lycopolis",
	"lat" : 31.083333,
	"lng" : 30.95
}, {
	"LocationName" : "Hippo",
	"lat" : 36.9,
	"lng" : 7.766667
}, {
	"LocationName" : "Alexandria",
	"lat" : 31.2,
	"lng" : 29.916667
}, {
	"LocationName" : "Tekoa",
	"lat" : 31.653017,
	"lng" : 35.229033
}, {
	"LocationName" : "Damascus",
	"lat" : 33.513056,
	"lng" : 36.291944
}, {
	"LocationName" : "Jerusalem",
	"lat" : 31.783333,
	"lng" : 35.216667
} ];

var ancientEntities = [
		{
			"Category" : "GR",
			"Subject" : "Thales",
			"StartYear" : -624,
			"EndYear" : -546,
			"LocationName" : "Miletus",
			"Tags" : "presocratic, water"
		},
		{
			"Category" : "GR",
			"Subject" : "Anaximander",
			"StartYear" : -610,
			"EndYear" : -546,
			"LocationName" : "Miletus",
			"Tags" : "presocratic, apeiron"
		},
		{
			"Category" : "GR",
			"Subject" : "Pythagoras",
			"StartYear" : -570,
			"EndYear" : -495,
			"LocationName" : "Samos",
			"Tags" : "presocratic, school, no beans, pythagorean theorem, coined term philosophy,  metempsychosis, soul of dead reborn in another body"
		},
		{
			"Category" : "GR",
			"Subject" : "Anaximenes",
			"StartYear" : -585,
			"EndYear" : -528,
			"LocationName" : "Miletus",
			"Tags" : "presocratic, air"
		},
		{
			"Category" : "GR",
			"Subject" : "Xenophanes",
			"StartYear" : -570,
			"EndYear" : -475,
			"LocationName" : "Colophon",
			"Tags" : "presocratic, incorporeal god, scepticism"
		},
		{
			"Category" : "GR",
			"Subject" : "Parmenides",
			"StartYear" : -515,
			"EndYear" : -445,
			"LocationName" : "Elea",
			"Tags" : "presocratic, school, reason over the senses, being is eternal, nothing comes into being, no motion, ontology"
		},
		{
			"Category" : "GR",
			"Subject" : "Heraclitus",
			"StartYear" : -535,
			"EndYear" : -475,
			"LocationName" : "Ephesus",
			"Tags" : "presocratic, flux, fire, cant step into the same river twice, logos, character is fate, daimon"
		},
		{
			"Category" : "GR",
			"Subject" : "Anaxagoras",
			"StartYear" : -510,
			"EndYear" : -428,
			"LocationName" : "Clazomenae",
			"Tags" : "presocratic, mind, nous, nature was unformed until mind formed it"
		},
		{
			"Category" : "GR",
			"Subject" : "Empedocles",
			"StartYear" : -490,
			"EndYear" : -430,
			"LocationName" : "Acragas",
			"Tags" : "presocratic, earth, air, water, fire, love attracts them strife divides them, reincarnation"
		},
		{
			"Category" : "GR",
			"Subject" : "Zeno",
			"StartYear" : -490,
			"EndYear" : -430,
			"LocationName" : "Elea",
			"Tags" : "presocratic, paradox, reductio ad absurdum, motion is an illusion"
		},
		{
			"Category" : "GR",
			"Subject" : "Leucippus",
			"StartYear" : -490,
			"EndYear" : -430,
			"LocationName" : "Miletus",
			"Tags" : "presocratic, atomism, logos, everything happens from necessity"
		},
		{
			"Category" : "GR",
			"Subject" : "Protagoras",
			"StartYear" : -490,
			"EndYear" : -420,
			"LocationName" : "Abdera",
			"Tags" : "presocratic, anti-math, sophist, use of words, orthopeia, rhetoric, relativism, man is the measure of all things, agnosticism"
		},
		{
			"Category" : "GR",
			"Subject" : "Philolaus",
			"StartYear" : -470,
			"EndYear" : -385,
			"LocationName" : "Croton",
			"Tags" : "presocratic, limits, harmonia, harmony of limited and unlimited, astronomy, central fire"
		},
		{
			"Category" : "GR",
			"Subject" : "Democritus",
			"StartYear" : -460,
			"EndYear" : -370,
			"LocationName" : "Abdera",
			"Tags" : "presocratic, atomism, bastard vs legitimate knowledge"
		},
		{
			"Category" : "GR",
			"Subject" : "Xenophon",
			"StartYear" : -430,
			"EndYear" : -354,
			"LocationName" : "Athens",
			"Tags" : "presocratic, socratic dialogues"
		},
		{
			"Category" : "GR",
			"Subject" : "Socrates",
			"StartYear" : -469,
			"EndYear" : -399,
			"LocationName" : "Athens",
			"Tags" : "big3"
		},
		{
			"Category" : "GR",
			"Subject" : "Plato",
			"StartYear" : -427,
			"EndYear" : -347,
			"LocationName" : "Athens",
			"Tags" : "big3"
		},
		{
			"Category" : "GR",
			"Subject" : "Aristotle",
			"StartYear" : -384,
			"EndYear" : -322,
			"LocationName" : "Stagira",
			"Tags" : "big3"
		},
		{
			"Category" : "GR",
			"Subject" : "Diogenes",
			"StartYear" : -412,
			"EndYear" : -323,
			"LocationName" : "Sinope",
			"Tags" : "hellenistic, cynic, return to simplicity of nature, austerity, cosmopolitanism, citizen of the world, dog-like behavior, hoarding, indifference to life, self-sufficiency, opposed to conventional thinking"
		},
		{
			"Category" : "GR",
			"Subject" : "Epicurus",
			"StartYear" : -341,
			"EndYear" : -271,
			"LocationName" : "Samos",
			"Tags" : "hellenistic, epicurean, pleasure and pain, good and evil, strive to be free of suffering, tranquility, ataraxia, avoidance of overindulgence,  problem of evil paradox, principle of multiple explanations, "
		},
		{
			"Category" : "GR",
			"Subject" : "Pyrrho",
			"StartYear" : -360,
			"EndYear" : -270,
			"LocationName" : "Elis",
			"Tags" : "hellenistic, scpeticism"
		},
		{
			"Category" : "GR",
			"Subject" : "Zeno",
			"StartYear" : -334,
			"EndYear" : -262,
			"LocationName" : "Citium",
			"Tags" : "hellenistic, stoic, fire, the universe accomplishes what is right and prevents the opposite, live according to the reason of the universe, self-preservation"
		},
		{
			"Category" : "GR",
			"Subject" : "Cleanthes",
			"StartYear" : -330,
			"EndYear" : -230,
			"LocationName" : "Assos",
			"Tags" : "hellenistic, stoic, pantheism, soul is material substance, souls live after death, avoid the passions, live consistently"
		},
		{
			"Category" : "GR",
			"Subject" : "Chrysippus",
			"StartYear" : -280,
			"EndYear" : -207,
			"LocationName" : "Soli",
			"Tags" : "hellenistic, stoic, logic, syllogism, knowledge is empircal, all things happen by fate, everything is caused, acts are determined but how we respond is a moral choice, compatibilism"
		},
		{
			"Category" : "GR",
			"Subject" : "Cicero",
			"StartYear" : -106,
			"EndYear" : -43,
			"LocationName" : "Arpino",
			"Tags" : "hellenistic, stoic, "
		},
		{
			"Category" : "GR",
			"Subject" : "Epictetus",
			"StartYear" : 55,
			"EndYear" : 135,
			"LocationName" : "Hierapolis",
			"Tags" : "hellenistic, stoic, self-knowledge, practice over logic, we have no power over external things, do not be troubled by loss"
		},
		{
			"Category" : "GR",
			"Subject" : "Marcus Aurelius",
			"StartYear" : 121,
			"EndYear" : 180,
			"LocationName" : "Rome",
			"Tags" : "hellenistic, philosopher king, stoic, "
		},
		{
			"Category" : "GR",
			"Subject" : "Plotinus",
			"StartYear" : 204,
			"EndYear" : 270,
			"LocationName" : "Lycopolis",
			"Tags" : "hellenistic, neo-platonic, the one, "
		},
		{
			"Category" : "GR",
			"Subject" : "Augustine",
			"StartYear" : 354,
			"EndYear" : 430,
			"LocationName" : "Hippo",
			"Tags" : "hellenistic, christian, catholic, easter people"
		},
		{
			"Category" : "GR",
			"Subject" : "Hypatia",
			"StartYear" : 370,
			"EndYear" : 415,
			"LocationName" : "Alexandria",
			"Tags" : "hellenistic, female, math"
		},
		{
			"Category" : "GR",
			"Subject" : "Boethius",
			"StartYear" : 480,
			"EndYear" : 524,
			"LocationName" : "Rome",
			"Tags" : "hellenistic, neo-platonic, martyr, last of the romans"
		},
		{
			"Category" : "B",
			"Subject" : "Amos",
			"StartYear" : -765,
			"EndYear" : -760,
			"LocationName" : "Tekoa",
			"Tags" : "old testament, minor prophet, jeroboam II, uzziah, destructive power of God, ancient hymn, locusts, fruit, day of the lord, praise of farmers, contempt for the wealthy"
		},
		{
			"Category" : "E",
			"Subject" : "Crucifixion of Jesus",
			"StartYear" : 32,
			"EndYear" : 32,
			"LocationName" : "Jerusalem",
			"lat" : 31.783333,
			"lng" : 35.216667,
			"Tags" : "new testament, crucifixion, resurrection"
		},
		{
			"Category" : "E",
			"Subject" : "Paul in Damascus",
			"StartYear" : 37,
			"EndYear" : 40,
			"LocationName" : "Damascus",
			"Tags" : "new testament, event, paul, galatians, acts, king aretas, stoning of stephen"
		}

/*
 * { "Category" : "B", "Subject" : "Isaiah 1 ", "StartYear" : -765, "EndYear" :
 * -760, "LocationName" : "Tekoa", "lat" : 31.653017, ?? "lng" :
 * 35.229033, ?? "Tags" : "old testament, prophet, proto isaiah, deutero isaih,
 * trito isaiha, Isaiah ben Amoz" }
 */
];

var centerLocation = null;

function prepAncientEntities() {
	// 1. sort locations
	var sortedLocations = locations.sort(function(a,b) {
		if (a.LocationName < b.LocationName) return -1;
		if (a.LocationName > b.LocationName) return 1;
	    return 0;
	});
	// 2. check no duplicate locations (and find Athens, our center-of-the-map
	var lastLoc = null;
	for (var i = 0; i < sortedLocations.length; i++) {
		var currentLoc = sortedLocations[i].LocationName.trim();
		if (currentLoc=="Athens") {
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

	// Validate each entity refers to a valid location.
	// Assign each location a marker color
	for (var i = 0; i < ancientEntities.length; i++) {
		var found = false;
		for (var j = 0; j < sortedLocations.length; j++) {
			if (ancientEntities[i].LocationName == sortedLocations[j].LocationName) {
				ancientEntities[i].Location = {lat: sortedLocations[j].lat, lng: sortedLocations[j].lng};
				found = true;
				break;
			}
		}
		if (found == false) {
			throw "Data sin: location not found *" + ancientEntities[i].Subject + "*" + ancientEntities[i].LocationName + "*";
		}
		
		// Brightness -- TODO - really old (like -2500
		if (ancientEntities[i].StartYear < -650) {
			ancientEntities[i].Brightness = "fefef4";
		}
		else if (ancientEntities[i].StartYear < -500) {
			ancientEntities[i].Brightness = "fffce9";
        }
        else if (ancientEntities[i].StartYear < -350) {
        	ancientEntities[i].Brightness = "fefddf";
        }
        else if (ancientEntities[i].StartYear < -200) {
        	ancientEntities[i].Brightness = "f6f396";
        }
        else if (ancientEntities[i].StartYear < -50) {
        	ancientEntities[i].Brightness = "ede556";
        }
        else if (ancientEntities[i].StartYear < 100) {
        	ancientEntities[i].Brightness = "fef56c";
        }
        else if (ancientEntities[i].StartYear < 250) {
        	ancientEntities[i].Brightness = "fef200";
        }
        else {
        	ancientEntities[i].Brightness = "caa869";                	
        }	

		//  Star color
		if (ancientEntities[i].Category == "GR") {
			ancientEntities[i].CategoryColor = "00b3e6";
		}
		else if (ancientEntities[i].Category == "B") {
			ancientEntities[i].CategoryColor = "c1ccd2";
		}
		else if (ancientEntities[i].Category == "E") {
			ancientEntities[i].CategoryColor = "fcd7cf"
		}
		else {
			throw "Data sin: illegal category *" + ancientEntities[i].Category + "*";
		}
	}
}

