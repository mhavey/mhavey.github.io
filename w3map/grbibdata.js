/*
Read:
Sources: Wikipedia for MOST of IT, including geo coordinates, dates. Some specific sites:
http://biblehub.com/timeline/
https://en.wikipedia.org/wiki/Dating_the_Bible
https://www.enterthebible.org/periods.aspx?rid=907
http://www.answers.com/Q/Where_was_Genesis_written
https://churchpop.com/2015/04/27/how-all-the-apostles-died-where-you-can-find-their-remains-today/
much wikipedia and sparknotes and biblehub.com
the map in jerusalem bible
https://www.ccel.org/bible/phillips/CN160-TRAVELS.htm
http://www.ldolphin.org/eden/
https://answersingenesis.org/tower-of-babel/where-in-the-world-is-the-tower-of-babel/
http://www.elishasoutcasteagles.com/wp-content/uploads/2015/11/1446848995_image1.jpeg
https://en.wikipedia.org/wiki/Kings_of_Israel_and_Judah

Skipped:
http://www.biblechronologytimeline.com/index.html - start at chapter 1, go to Chapter 8 - redundant
map of twelve tribes of isreal: https://en.wikipedia.org/wiki/Book_of_Judges#/media/File:12_Tribes_of_Israel_Map.svg
http://www.matthewmcgee.org/paultime.html

Regrests:
- Locations that are non-commital - Israel vs. Palestine vs. Canaan vs. Judea vs. Judah
Never got it clear conceptually. Lots of events are tied to these non-commital location
 */

 
//var allCategories = [];
//var allNames = [];

var val_categories;
var val_eras;
var val_locations;
var val_greekPhilosophers;
var val_ntBooks;
var val_otBooks;
var val_otEvents;
var val_ntEvents;
var val_historicalEvents;

var locationNames = [];
//var locationsNotFound = [];

function addLocation(loc) {
	if(locationNames.indexOf(loc) >= 0) {
		throw "Location duplicate " + loc;
	}
	locationNames.push(loc);
}

function addLocationNotFound(loc) {
	if(locationsNotFound.indexOf(loc) < 0) {
		locationsNotFound.push(loc);
	}
}

function checkString(val, throwString, field) {
	if (typeof val !== "string") {
		throw throwString + " " + field + " bad string " + val + " " + typeof val;
	}
	return val.trim();
}

function validateAllDatasets() {
	// distinct names here
	allNames = [];
	val_categories = validateDataset("categories", categories, ["name", "color", "textcolor"], [], null);
	val_eras = validateDataset("eras", eras, ["name", "startYear", "endYear", "pointform"], [], null);
	val_locations = validateDataset("locations", locations, ["name", "lat", "lng"], [], null);

	// distinct names here
	allNames = [];
	val_greekPhilosophers = validateDataset("greekPhilosophers", greekPhilosophers, ["subcategories", "name", "startYear", "endYear", "locationName"], ["pointform"], "Greek Philosophers");
	val_ntBooks = validateDataset("ntBooks", ntBooks, ["subcategories", "name", "startYear", "endYear", "pointform"], ["locationName", "datingNotes", "locationNotes"], "Bible - New Testament Books");
	val_otBooks = validateDataset("otBooks", otBooks, ["subcategories", "name", "startYear", "endYear", "pointform"], ["locationName", "locationNotes", "datingNotes", "revisions"], "Bible - Old Testament Books");
	val_ntEvents = validateDataset("ntEvents", ntEvents, ["subcategories", "name", "startYear", "endYear", "locationName"], ["locationNotes", "datingNotes", "sources", "pointform"], "Bible - New Testament Events");
	val_otEvents = validateDataset("otEvents", otEvents, ["subcategories", "name", "startYear", "endYear"], ["locationName", "locationNotes", "datingNotes", "sources", "pointform"], "Bible - Old Testament Events");
	val_historicalEvents = validateDataset("historicalEvents", historicalEvents, ["subcategories", "name", "startYear", "endYear", "locationName"], ["pointform", "sources"], "Historical Events");

	//locationNames.sort();
	//locationsNotFound.sort();
	//console.log(locationNames.join('\n'));
	//console.log(locationsNotFound.join('\n'));
	//console.log("" + locationsNotFound.length + "/" + locationNames.length);

}

function validateDataset(name, s, requiredFields, optionalFields, category) {
	if (category != null) {
		var found = false;
		for (var i = 0; i < val_categories.length; i++) {
			if (val_categories[i].name == category) {
				found = true;
				break;
			}
		}
		if (found == false) {
			throw name + " category not found " + category;
		}
	}

	var distinctColors = [];
	var newset = [];
	//var catsPerSet = [];
	for (var i = 0; i < s.length; i++) {
		try {

		var requiredFieldsFound = 0;
		var distinctFields = [];
		var o = s[i];
		var newobj = {};
		if (category != null) {
			newobj.category = category;			
		}
		newset.push(newobj);
		for (skey in o) {
			var key = skey.trim();

			// check it's a distinct field
			if (distinctFields.indexOf(key) >= 0) {
				throw "non-distinct key " + key;
			}
			distinctFields.push(key);

			// check is allowable 
			var isRequired = requiredFields.indexOf(key) >= 0;
			var isOptional = optionalFields.indexOf(key) >= 0;
			if (isRequired==false && isOptional==false) {
				throw "illegal key " + key;
			}
			if (isRequired == true) {
				requiredFieldsFound++;
			}

			if (key == "name") {
				newobj.name = checkString(o.name, "", "name");
				if (allNames.indexOf(newobj.name) >= 0) {
					throw "duplicate name " + newobj.name +  " " + allNames.join(",");
				} 
				allNames.push(newobj.name);
				if (name=="locations") addLocation(newobj.name);
			}

			if (key == "color") {
				newobj.color = checkString(o.color, "", "color");
				if (distinctColors.indexOf(newobj.color) >= 0) {
					throw "duplicate color " + newobj.color + " " + distinctColors.join(",");

				}
				distinctColors.push(newobj.color);

			}
			if (key == "textcolor") {
				newobj.textcolor = checkString(o.textcolor, "", "textcolor");
			}

			if (key == "lat") {
				newobj.lat = parseFloat(o.lat);
				if (("" + newobj.lat) != ("" + o.lat)) {
					throw "decimal loss";
				}
			}
			if (key == "lng") {
				newobj.lng = parseFloat(o.lng);
				if (("" + newobj.lng) != ("" + o.lng)) {
					throw "decimal loss";
				}
			}

			if (key == "locationName") {
				newobj.locationName = checkString(o.locationName, "", "locationName");
				var found = false;
				for (var l = 0; l < val_locations.length; l++) {
					if (newobj.locationName == val_locations[l].name) {
						found = true;
						break;
					}
				}
				if (found == false) {
					//addLocationNotFound(newobj.locationName);	
					throw "WARN location not found " + newobj.locationName;
				}
			}

			if (key == "pointform") {
				var len = o.pointform.length;
				newobj.pointform=[];
				for (var p = 0; p < len; p++) {
					newobj.pointform.push(checkString(o.pointform[p], ""+p, "pointform"));
				}
			}

			if (key == "datingNotes") {
				var len = o.datingNotes.length;
				newobj.datingNotes=[];
				for (var d = 0; d < len; d++) {
					newobj.datingNotes.push(checkString(o.datingNotes[d], "" + d, "datingNotes"));
				}
			}

			if (key == "subcategories") {
				newobj.subcategories = [];
				var len = o.subcategories.length;
				for (var c = 0; c < len; c++) {
					newobj.subcategories.push(checkString(o.subcategories[c], "" + c, "subcategories"));
					//if (allCategories.indexOf(newobj.subcategories[c]) < 0) allCategories.push(newobj.subcategories[c]);
					//if (catsPerSet.indexOf(newobj.subcategories[c]) < 0) catsPerSet.push(newobj.subcategories[c]);
				}
			}

			if (key == "sources") {
				newobj.sources = [];
				var len = o.sources.length;
				for (var si = 0; si < len; si++) {
					var proposedSource = checkString(o.sources[si], "" + si, "sources").toLowerCase();
					var found = false;
					var books = [val_ntBooks, val_otBooks];
					for (var bi = 0; bi < books.length; bi++) {
						for (var b = 0; b < books[bi].length; b++) {
							if (proposedSource == books[bi][b].name.toLowerCase()) {
								newobj.sources.push(books[bi][b].name);
								found = true;
								break;
							}
						}
						if (found == true) {
							break;
						}
					}

					if (found == false) {
						throw "source not found " + proposedSource;
					}
				}
			}

			if (key == "locationNotes") {
				newobj.locationNotes = {};
				for (lkey in o.locationNotes) {
					if (lkey == "info") {
						newobj.locationNotes.info = [];
						for (var ln = 0; ln < o.locationNotes.info.length; ln++) {
							newobj.locationNotes.info.push(checkString(o.locationNotes.info[ln], "" + ln, "locationNotes.info"));
						}
					}
					else if (lkey == "alternatives") {
						newobj.locationNotes.alternatives = [];
						for (var ln = 0; ln < o.locationNotes.alternatives.length; ln++) {
							newobj.locationNotes.alternatives.push(checkString(o.locationNotes.alternatives[ln], "" + ln, "locationNotes.alternatives"));
						}
					}
					else if (lkey == "aka") {
						newobj.locationNotes.aka = [];
						for (var ln = 0; ln < o.locationNotes.aka.length; ln++) {
							newobj.locationNotes.aka.push(checkString(o.locationNotes.aka[ln], "" + ln, "locationNotes.aka"));
						}
					}
					else if (lkey == "assumptions") {
						newobj.locationNotes.assumptions = [];
						for (var ln = 0; ln < o.locationNotes.assumptions.length; ln++) {
							newobj.locationNotes.assumptions.push(checkString(o.locationNotes.assumptions[ln], "" + ln, "locationNotes.assumptions"));
						}

					}
					else {
						throw "illegal location notes";
					}
				}
			}

			if (key == "revisions") {
				newobj.revisions = validateDataset("revisions", o.revisions, ["startYear", "endYear"], ["pointform", "locationName", "locationNotes", "datingNotes", "name"], null);
			}

			if (key == "startYear") {
				var sy = parseInt(o.startYear);
				var ey = parseInt(o.endYear);
				if (sy > ey) {
					throw "sy/ey " + sy + " " + ey;
				}
				newobj.startYear = sy;
				newobj.endYear = ey;
			}
		}

		// if we are missing required fields but found them in revisions, count them
		if (newobj.revisions != null && newobj.revisions.length > 0) {			
			//console.log(newobj.revisions);
			for (var r = 0; r < requiredFields.length; r++) {
				if (distinctFields.indexOf(requiredFields[r]) < 0) {
					var reqcnt = 0;
					for (v = 0; v < newobj.revisions.length; v++) {
						if (newobj.revisions[v][requiredFields[r]] != null) {
							reqcnt++;
						}						
					}
					if (reqcnt == newobj.revisions.length) requiredFieldsFound++;
				} 
			}
		}

		// check we got all the fields we need
		if (requiredFieldsFound != requiredFields.length) {
			console.log(o);
			throw "did not find all required fields " + requiredFieldsFound + " " + requiredFields.join(",");
		}	

		}
		catch(e) {
			throw name + "[" + i + "] name " + s[i].name + " error " + e;
		}
	}
	//console.log(name);
	//console.log(newset);
	return newset;
}

