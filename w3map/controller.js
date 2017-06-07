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

var val_categories = null;
var val_eras = null;
var val_locations = null;
var val_greekPhilosophers = null;
var val_ntBooks = null;
var val_otBooks = null;
var val_otEvents = null;
var val_ntEvents = null;
var val_historicalEvents = null;
var brightnesses = [
    {startYear:-Infinity, endYear:-651, color:"fefef4", textcolor:"black"},
    {startYear:-650, endYear:-501, color:"fffce9", textcolor:"black"},
    {startYear:-500, endYear:-351, color:"fefddf", textcolor:"black"},
    {startYear:-350, endYear:-201, color:"f6f396", textcolor:"black"},
    {startYear:-200, endYear:-51, color:"ede556", textcolor:"black"},
    {startYear:-50, endYear:99, color:"fef56c", textcolor:"black"},
    {startYear:100, endYear:249, color:"fef200", textcolor:"black"},
    {startYear:250, endYear:Infinity, color:"caa869", textcolor:"black"}];

/* Public function: finds books/events that match the query.
Input: Query, Previous Results
Output: Results

More on query:
- Pass null to return the whole entry set
- operand (union/intersect/subtract, default=union): How to combine with previous results. 
If union, add to the saved results. If previous results are empty, return these results only.
If intersect, intersect with saved results.  If previous results are empty, return these results only. 
If subtract, subtract from saved results. If previous results are empty, return ALL results except these results.
- categories_in[] default=all. Match an entry if its category exactly matches ANY category in the array. 
- yearRange:{startYear, endYear}, default=all. Match an entry if its year range is in the specified year range. 
- name_in[], default=all. Match an entry if its name PARTIALLY matches ANY name in the array.
- text_in[], default=all: Match an entry it any of its text PARTIALLY matches ANY text token in the array.

More on previous results:
You can pass in results from a previous call to w_matchQuery. New results will be combined (according to query.operand) and returned.
*/

var matchChecks = [matchHasCategory, matchHasYearRange, matchHasName, matchHasText];
function w_matchQuery(query, previousResults) {


	// If I'm not prepped, do the prep
	if (val_categories == null) prepData();

	var results = {matches: []};

	// case 1 - no query; give me everything. Will ignore previous results if provided.
	if (query == null) {
		matchAll(results.matches);
	}

	// 
	// case 2 - get results of the query and combine as directed
	//
	else {
		// resolve operand
		if (query.operand == null) query.operand = "union";
		if (query.operand != "subtract" && query.operand != "union" && query.operand != "intersect") throw "Illegal operand *" + query.operand + "*";


		// what is my base set of matches and which entries are candidates for inclusion
		var candidates = [];
		var results = {matches : []};
		if (query.operand == "union" || previousResults == null || previousResults.matches == null || previousResults.matches.length == 0) {
			matchAll(candidates);
		}
		else {
			candidates = prevResults.matches;
		}

		if (query.operand == "union") results.matches = previousResults.matches;

		// consider each candidate
		for (var ei = 0; ei < candidates.length; ei++) {
			var candidateMatched = true;

			// apply each query check to it
			for (var qi = 0; qi < matchChecks.length; qi++) {
				var matchSuccess = matchChecks[qi](candidates[ei], query);
				if (matchSuccess == false) {
					//console.log("No match " + candidates[ei].name + " on " + qi);
					candidateMatched = false;
					break;
				}
			}

			// combine the entry
			if ((query.operand == "union" || query.operand == "intersect") && candidateMatched == true) {
				matchAdd(results.matches, candidates[ei]);
				console.log(query.operand + " match " + candidates[ei].name + " sizes " + candidates.length + "," + results.matches.length);
			}
			else if (query.operand == "subtract" && candidateMatched == false) {
				matchAdd(results.matches, candidates[ei]);
				console.log(query.operand + " match " + candidates[ei].name + " sizes " + candidates.length + "," + results.matches.length);
			}
		}
	}

	// sort the results by start year
	results.matches.sort(function(a,b) {
   		if (a.startYear < b.startYear) return -1; 
   		if (a.startYear > b.startYear) return 1; 
   		return 0;
   	});
	return results;
}

function matchAdd(matches, candidate) {
	for (var i = matches.length - 1; i >= 0; i--) {
		if (matches[i].name == candidate.name) {
			return;
		}
	}
	matches.push(candidate);
}

// test if entry matches ONE of the categories in query
function matchHasCategory(entry, query) {
	if (query.categories_in == null) return true;
	for (var i = 0; i < query.categories_in.length; i++) {
		if (entry.category.name == query.categories_in[i]) {
			return true;
		}
	}
	return false;
}

// test if entry is in year range from query
function matchHasYearRange(entry, query) {
	if (query.yearRange == null) return true;

	if (query.yearRange.endYear != null && entry.startYear > query.yearRange.endYear) return false;
	if (query.yearRange.startYear != null && entry.endYear < query.yearRange.endYear) return false;

	return true;
}

// test if entry has one of the the specified name
function matchHasName(entry, query) {
	if (query.name_in == null) return true;

	for (var i = 0; i < query.name_in.length; i++) {
		if (matchPartialText(entry.name, query.name_in[i]) == true) {
			return true;
		}
	}
	return false;
}

function matchHasText(entry, query) {

	if (query.text_in == null) return true;

	for (var i = 0; i < entry.allText.length; i++) {
		for (var j = 0; j < query.text_in.length; j++) {
			if (matchPartialText(entry.allText[i], query.text_in[j]) == true) {
				return true;
			}	
		}	
	}
	return false;
}

function matchPartialText(s, partial) {
	s = s.toLowerCase().trim();
	partial = partial.toLowerCase().trim();
	return s.indexOf(partial) >= 0;
}


function matchAll(matches) {
	matches.push.apply(matches,val_greekPhilosophers);
	matches.push.apply(matches,val_historicalEvents);
	matches.push.apply(matches,val_ntBooks);
	matches.push.apply(matches,val_ntEvents);
	matches.push.apply(matches,val_otBooks);
	matches.push.apply(matches,val_otEvents);
}

/* 
Public Function to get location object for specified central location
*/
function w_getCenterLocation(centerLocationName) {

	if (val_locations == null) prepData();

	// determine center location of map
    for (var i = 0; i < val_locations.length; i++) {
    	if (val_locations[i].name == centerLocationName) {
    		return val_locations[i];
    	}
    }

    throw "Center location not found *" + centerLocationName + "*";	
}

function prepData() {
	// validate time/space/categorization
	allNames = [];
	val_categories = validateDataset("categories", categories, ["name", "color", "textcolor"], [], null);
	val_eras = validateDataset("eras", eras, ["name", "startYear", "endYear", "pointform"], [], null);
	val_locations = validateDataset("locations", locations, ["name", "lat", "lng"], [], null);

	// validate the entries; distinct names across all entries
	allNames = [];
	val_greekPhilosophers = validateDataset("greekPhilosophers", greekPhilosophers, ["subcategories", "name", "startYear", "endYear", "locationName"], ["pointform"], "Greek Philosophers");
	val_ntBooks = validateDataset("ntBooks", ntBooks, ["subcategories", "name", "startYear", "endYear", "pointform"], ["locationName", "datingNotes", "locationNotes"], "Bible - New Testament Books");
	val_otBooks = validateDataset("otBooks", otBooks, ["subcategories", "name", "startYear", "endYear", "pointform"], ["locationName", "locationNotes", "datingNotes", "revisions"], "Bible - Old Testament Books");
	val_ntEvents = validateDataset("ntEvents", ntEvents, ["subcategories", "name", "startYear", "endYear", "locationName"], ["locationNotes", "datingNotes", "sources", "pointform"], "Bible - New Testament Events");
	val_otEvents = validateDataset("otEvents", otEvents, ["subcategories", "name", "startYear", "endYear"], ["locationName", "locationNotes", "datingNotes", "sources", "pointform"], "Bible - Old Testament Events");
	val_historicalEvents = validateDataset("historicalEvents", historicalEvents, ["subcategories", "name", "startYear", "endYear", "locationName"], ["pointform", "sources"], "Historical Events");
}

function checkString(entry, val, throwString, field) {
	if (typeof val !== "string") {
		throw throwString + " " + field + " bad string " + val + " " + typeof val;
	}

	val = val.trim();

	while(val.indexOf(",") >= 0) {
		val = val.replace(",", "-");
	}

	if (entry.allText.indexOf(val) < 0) entry.allText.push(val);

	return val;
}

function validateDataset(name, s, requiredFields, optionalFields, category) {
	var ocat = null;
	if (category != null) {
		var found = false;
		for (var i = 0; i < val_categories.length; i++) {
			if (val_categories[i].name == category) {
				ocat = val_categories[i];
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
	for (var i = 0; i < s.length; i++) {
		try {
		var distinctFields = [];
		var o = s[i];
		var newobj = {};
		if (category != null) {
			newobj.category = ocat;	
		}
		newobj.isEntry = (newobj.category != null);
		newobj.allText=[];
		for (skey in o) {
			var key = skey.trim();

			// check it's a distinct field
			if (distinctFields.indexOf(key) >= 0) {
				throw "non-distinct key " + key;
			}
			distinctFields.push(key);

			// check is allowable 
			if (requiredFields.indexOf(key) < 0 && optionalFields.indexOf(key) < 0) {
				throw "illegal key " + key;
			}

			if (key == "name") {
				newobj.name = checkString(newobj, o.name, "", "name");
				newobj.baseName = newobj.name; // points to parent when revision
			}

			if (key == "color") {
				newobj.color = checkString(newobj, o.color, "", "color");
				if (distinctColors.indexOf(newobj.color) >= 0) {
					throw "duplicate color " + newobj.color + " " + distinctColors.join(",");

				}
				distinctColors.push(newobj.color);

			}
			if (key == "textcolor") {
				newobj.textcolor = checkString(newobj, o.textcolor, "", "textcolor");
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
				newobj.locationName = checkString(newobj, o.locationName, "", "locationName");
				var found = false;
				for (var l = 0; l < val_locations.length; l++) {
					if (newobj.locationName == val_locations[l].name) {
						newobj.location = val_locations[l];
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
					newobj.pointform.push(checkString(newobj, o.pointform[p], ""+p, "pointform"));
				}
			}

			if (key == "datingNotes") {
				var len = o.datingNotes.length;
				newobj.datingNotes=[];
				for (var d = 0; d < len; d++) {
					newobj.datingNotes.push(checkString(newobj, o.datingNotes[d], "" + d, "datingNotes"));
				}
			}

			if (key == "subcategories") {
				newobj.subcategories = [];
				var len = o.subcategories.length;
				for (var c = 0; c < len; c++) {
					newobj.subcategories.push(checkString(newobj, o.subcategories[c], "" + c, "subcategories"));
				}
			}

			if (key == "sources") {
				newobj.sources = [];
				var len = o.sources.length;
				for (var si = 0; si < len; si++) {
					var proposedSource = checkString(newobj, o.sources[si], "" + si, "sources").toLowerCase();
					var found = false;
					var books = [val_ntBooks, val_otBooks];
					for (var bi = 0; bi < books.length; bi++) {
						for (var b = 0; b < books[bi].length; b++) {
							if (proposedSource == books[bi][b].baseName.toLowerCase()) {
								newobj.sources.push(books[bi][b].baseName);
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
							newobj.locationNotes.info.push(checkString(newobj, o.locationNotes.info[ln], "" + ln, "locationNotes.info"));
						}
					}
					else if (lkey == "alternatives") {
						newobj.locationNotes.alternatives = [];
						for (var ln = 0; ln < o.locationNotes.alternatives.length; ln++) {
							newobj.locationNotes.alternatives.push(checkString(newobj, o.locationNotes.alternatives[ln], "" + ln, "locationNotes.alternatives"));
						}
					}
					else if (lkey == "aka") {
						newobj.locationNotes.aka = [];
						for (var ln = 0; ln < o.locationNotes.aka.length; ln++) {
							newobj.locationNotes.aka.push(checkString(newobj, o.locationNotes.aka[ln], "" + ln, "locationNotes.aka"));
						}
					}
					else if (lkey == "assumptions") {
						newobj.locationNotes.assumptions = [];
						for (var ln = 0; ln < o.locationNotes.assumptions.length; ln++) {
							newobj.locationNotes.assumptions.push(checkString(newobj, o.locationNotes.assumptions[ln], "" + ln, "locationNotes.assumptions"));
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

				if (name != "eras") {
					// determine eras
					newobj.eras = [];
					for (var er = 0; er < val_eras.length; er++) {
						if (sy > val_eras[er].endYear) continue;
						else if (ey < val_eras[er].startYear) continue;
						newobj.eras.push(val_eras[er]);
					}

					// determine absolute brightness
					var brFound = false;
					for (var br = 0; br < brightnesses.length; br++) {
						if (sy >= brightnesses[br].startYear && sy <= brightnesses[br].endYear) {
							newobj.brightness = brightnesses[br];
							brFound = true;
							break;
						}
					}					
					if (brFound == false) {
						throw "brightness not found";
					}
				}
			}

		}

		// add to set; special case if revisions
		if (newobj.revisions == null) {
			newset.push(newobj);
			checkRequiredFields(newobj, requiredFields);
		}
		else {
			for (var rev = 0; rev < newobj.revisions.length; rev++) {
				var rnewobj = promoteRevision(newobj, newobj.revisions[rev], rev);
				checkRequiredFields(rnewobj, requiredFields);
				newset.push(rnewobj);				
			}
		}

		}
		catch(e) {
			console.log(e.lineNumber);
			console.log(e.stack);
			console.log(e);
			throw name + "[" + i + "] name " + s[i].name + " error " + e;
		}
	}
	return newset;
}

function checkName(name) {
	if (allNames.indexOf(name) >= 0) {
		throw "duplicate name " + name +  " " + allNames.join(",");
	} 
	allNames.push(name);

}

function checkRequiredFields(entry, requiredFields) {
	for (var i = 0; i < requiredFields.length; i++) {
		if (entry[requiredFields[i]] == null) {
			console.log(entry);
			throw "Missing required field " + requiredFields[i];
		}
	}

}

function promoteRevision(entry, revision, revIdx) {
	// name it
	if (revision.name == null) revision.name = entry.name + " R" + revIdx;
	revision.baseName = entry.name;

	for (key in entry) {
		if (key == "name") continue;

		// revision acquires any fields from parent 
		if (revision[key] == null) {
			revision[key] = entry[key];
		}

		// revision merges certain keys from parent
		else {
			if (key == "pointform") {
				if (revision.pointform == null) revision.pointform=entry.pointform;
				else revision.pointform.push.apply(revision.pointform, entry.pointform);
			}
		}
	}

	checkName(revision.name);
	revision.allText.push.apply(revision.allText, entry.allText);
	return revision;
}
