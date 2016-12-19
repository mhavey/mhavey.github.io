/*
Source: Wikipedia for MOST of IT, including geo coordinates, dates.
http://www.matthewmcgee.org/paultime.html - paul data
 */


// the categories and their colors
var categories = [
                  {name:"GR", desc:"Greek", color:"00ff00", textcolor:"black", tags:[]},
                  {name:"B", desc:"Bible", color:"ff0000", textcolor:"white", tags:[]}, 
                  {name:"E", desc:"Event", color:"0000ff", textcolor:"white", tags:[]}
                  ];
var catGreek=categories[0];
var catBible=categories[1];
var catEvent=categories[2];

// brightness intervals - disjoint and cover ALL OF TIMEs
var brightnesses = [
                    {startYear:-Infinity, endYear:-651, color:"fefef4", textcolor:"black"},
                    {startYear:-650, endYear:-501, color:"fffce9", textcolor:"black"},
                    {startYear:-500, endYear:-351, color:"fefddf", textcolor:"black"},
                    {startYear:-350, endYear:-201, color:"f6f396", textcolor:"black"},
                    {startYear:-200, endYear:-51, color:"ede556", textcolor:"black"},
                    {startYear:-50, endYear:99, color:"fef56c", textcolor:"black"},
                    {startYear:100, endYear:249, color:"fef200", textcolor:"black"},
                    {startYear:250, endYear:Infinity, color:"caa869", textcolor:"black"}];

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
			location: null,
			brightness: null,
			tags : ["presocratic", "water"]
		},
		{
			category : catGreek,
			subject : "Anaximander",
			startYear : -610,
			endYear : -546,
			locName : "Miletus",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["presocratic", "apeiron"]
		},
		{
			category : catGreek,
			subject : "Pythagoras",
			startYear : -570,
			endYear : -495,
			locName : "Samos",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["presocratic", "school", "no beans", "pythagorean theorem", "coined term philosophy",  "metempsychosis", "soul of dead reborn in another body"]
		},
		{
			category : catGreek,
			subject : "Anaximenes",
			startYear : -585,
			endYear : -528,
			locName : "Miletus",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["presocratic", "air"]
		},
		{
			category : catGreek,
			subject : "Xenophanes",
			startYear : -570,
			endYear : -475,
			locName : "Colophon",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["presocratic", "incorporeal god", "scepticism"]
		},
		{
			category : catGreek,
			subject : "Parmenides",
			startYear : -515,
			endYear : -445,
			locName : "Elea",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["presocratic", "school", "reason over the senses", "being is eternal", "nothing comes into being", "no motion", "ontology"]
		},
		{
			category : catGreek,
			subject : "Heraclitus",
			startYear : -535,
			endYear : -475,
			locName : "Ephesus",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["presocratic", "flux", "fire", "cant step into the same river twice", "logos", "character is fate", "daimon"]
		},
		{
			category : catGreek,
			subject : "Anaxagoras",
			startYear : -510,
			endYear : -428,
			locName : "Clazomenae",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["presocratic", "mind", "nous", "nature was unformed until mind formed it"]
		},
		{
			category : catGreek,
			subject : "Empedocles",
			startYear : -490,
			endYear : -430,
			locName : "Acragas",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["presocratic", "earth", "air", "water", "fire", "love attracts them strife divides them", "reincarnation"]
		},
		{
			category : catGreek,
			subject : "Zeno",
			startYear : -490,
			endYear : -430,
			locName : "Elea",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["presocratic", "paradox", "reductio ad absurdum", "motion is an illusion"]
		},
		{
			category : catGreek,
			subject : "Leucippus",
			startYear : -490,
			endYear : -430,
			locName : "Miletus",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["presocratic", "atomism", "logos", "everything happens from necessity"]
		},
		{
			category : catGreek,
			subject : "Protagoras",
			startYear : -490,
			endYear : -420,
			locName : "Abdera",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["presocratic", "anti-math", "sophist", "use of words", "orthopeia", "rhetoric", "relativism", "man is the measure of all things", "agnosticism"]
		},
		{
			category : catGreek,
			subject : "Philolaus",
			startYear : -470,
			endYear : -385,
			locName : "Croton",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["presocratic", "limits", "harmonia", "harmony of limited and unlimited", "astronomy", "central fire"]
		},
		{
			category : catGreek,
			subject : "Democritus",
			startYear : -460,
			endYear : -370,
			locName : "Abdera",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["presocratic", "atomism", "bastard vs legitimate knowledge"]
		},
		{
			category : catGreek,
			subject : "Xenophon",
			startYear : -430,
			endYear : -354,
			locName : "Athens",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["presocratic", "socratic dialogues"]
		},
		{
			category : catGreek,
			subject : "Socrates",
			startYear : -469,
			endYear : -399,
			locName : "Athens",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["big3"]
		},
		{
			category : catGreek,
			subject : "Plato",
			startYear : -427,
			endYear : -347,
			locName : "Athens",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["big3"]
		},
		{
			category : catGreek,
			subject : "Aristotle",
			startYear : -384,
			endYear : -322,
			locName : "Stagira",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["big3"]
		},
		{
			category : catGreek,
			subject : "Diogenes",
			startYear : -412,
			endYear : -323,
			locName : "Sinope",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["hellenistic", "cynic", "return to simplicity of nature", "austerity", "cosmopolitanism", "citizen of the world", "dog-like behavior", "hoarding", "indifference to life", "self-sufficiency", "opposed to conventional thinking"]
		},
		{
			category : catGreek,
			subject : "Epicurus",
			startYear : -341,
			endYear : -271,
			locName : "Samos",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["hellenistic", "epicurean", "pleasure and pain", "good and evil", "strive to be free of suffering", "tranquility", "ataraxia", "avoidance of overindulgence",  "problem of evil paradox", "principle of multiple explanations"]
		},
		{
			category : catGreek,
			subject : "Pyrrho",
			startYear : -360,
			endYear : -270,
			locName : "Elis",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["hellenistic", "scpeticism"]
		},
		{
			category : catGreek,
			subject : "Zeno",
			startYear : -334,
			endYear : -262,
			locName : "Citium",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["hellenistic", "stoic", "fire", "the universe accomplishes what is right and prevents the opposite", "live according to the reason of the universe", "self-preservation"]
		},
		{
			category : catGreek,
			subject : "Cleanthes",
			startYear : -330,
			endYear : -230,
			locName : "Assos",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["hellenistic", "stoic", "pantheism", "soul is material substance", "souls live after death", "avoid the passions", "live consistently"]
		},
		{
			category : catGreek,
			subject : "Chrysippus",
			startYear : -280,
			endYear : -207,
			locName : "Soli",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["hellenistic", "stoic", "logic", "syllogism", "knowledge is empircal", "all things happen by fate", "everything is caused", "acts are determined but how we respond is a moral choice", "compatibilism"]
		},
		{
			category : catGreek,
			subject : "Cicero",
			startYear : -106,
			endYear : -43,
			locName : "Arpino",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["hellenistic", "stoic"]
		},
		{
			category : catGreek,
			subject : "Epictetus",
			startYear : 55,
			endYear : 135,
			locName : "Hierapolis",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["hellenistic", "stoic", "self-knowledge", "practice over logic", "we have no power over external things", "do not be troubled by loss"]
		},
		{
			category : catGreek,
			subject : "Marcus Aurelius",
			startYear : 121,
			endYear : 180,
			locName : "Rome",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["hellenistic", "philosopher king", "stoic"]
		},
		{
			category : catGreek,
			subject : "Plotinus",
			startYear : 204,
			endYear : 270,
			locName : "Lycopolis",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["hellenistic", "neo-platonic", "the one"]
		},
		{
			category : catGreek,
			subject : "Augustine",
			startYear : 354,
			endYear : 430,
			locName : "Hippo",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["hellenistic", "christian", "catholic", "easter people"]
		},
		{
			category : catGreek,
			subject : "Hypatia",
			startYear : 370,
			endYear : 415,
			locName : "Alexandria",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["hellenistic", "female", "math"]
		},
		{
			category : catGreek,
			subject : "Boethius",
			startYear : 480,
			endYear : 524,
			locName : "Rome",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["hellenistic", "neo-platonic", "martyr", "last of the romans"]
		},
		{
			category : catBible,
			subject : "Amos",
			startYear : -765,
			endYear : -760,
			locName : "Tekoa",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["old testament", "minor prophet", "jeroboam II", "uzziah", "destructive power of God", "ancient hymn", "locusts", "fruit", "day of the lord", "praise of farmers", "contempt for the wealthy"]
		},
		{
			category : catEvent,
			subject : "Crucifixion of Jesus",
			startYear : 32,
			endYear : 32,
			locName : "Jerusalem",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["new testament", "crucifixion", "resurrection"]
		},
		{
			category : catEvent,
			subject : "Paul in Damascus",
			startYear : 37,
			endYear : 40,
			locName : "Damascus",
			location: null,
			brightness: null,
			mapMarker: null,
			tags : ["new testament", "event", "paul", "galatians", "acts", "king aretas", "stoning of stephen"]
		}

/*
 * { category : "B", subject : "Isaiah 1 ", startYear : -765, endYear : -760,
 * locName : "Tekoa", lat : 31.653017, ?? lng : 35.229033, ?? tags : "old
 * testament, prophet, proto isaiah, deutero isaih, trito isaiha, Isaiah ben
 * Amoz" }
 */
];

var centerLocation = null;

function prepAncientEntities() {
	// 1. sort locations
	var sortedLocations = locations.sort(function(a,b) {
		if (a.locName < b.locName) return -1;
		if (a.locName > b.locName) return 1;
	    return 0;
	});
	// 2. check no duplicate locations (and find Athens, our center-of-the-map
	var lastLoc = null;
	for (var i = 0; i < sortedLocations.length; i++) {
		var currentLoc = sortedLocations[i].locName.trim();
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

	for (var i = 0; i < ancientEntities.length; i++) {
		// Validate each entity refers to a valid location.
		var found = false;
		for (var j = 0; j < sortedLocations.length; j++) {
			if (ancientEntities[i].locName == sortedLocations[j].locName) {
				ancientEntities[i].location = {lat: sortedLocations[j].lat, lng: sortedLocations[j].lng};
				found = true;
				break;
			}
		}
		if (found == false) {
			throw "Data sin: location not found *" + ancientEntities[i].subject + "*" + ancientEntities[i].locName + "*";
		}

		// Assign each location a marker color; startYear must fall into one of the disjoint interrvals
		found = false;
		for (var j = 0; j < brightnesses.length; j++) {
			if (ancientEntities[i].startYear >= brightnesses[j].startYear && ancientEntities[i].startYear <= brightnesses[j].endYear) {
				found = true;
				ancientEntities[i].brightness = brightnesses[j].color;
				break;
			}
		}
		if (found == false) {
			throw "Data sin: brightness not found *" + ancientEntities[i].subject + "*" + ancientEntities[i].locName + "*";			
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
		categories[i].tags.sort(function(a,b) {
			if (a < b) return -1;
			if (a > b) return 1;
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
		//console.log("Tags for cat " + categories[i].desc + " are " + categories[i].tags.join(","));
	}
}

 