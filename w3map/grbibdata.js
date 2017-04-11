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
 */

 
 /*
 Validations:
 1. Has all and only allowable fields, and fields of of correct type
 2. start/endYear is mandatory; if i don't know, guess at safe interval (e.g., proverbs unknown, so make it over all OT eras)
 3. for OT, if location is unknown, use default for that era (e.g., babylon for exilic)
 1. No duplicate locations.
 2. All events/sources refer to known location.
 3. Avoid two "similar" locations - e.g., Philipi and Phillipi
 4. All events/sources have a distinct name - no duplicates
 5. "Sources" refers to valid source.
 9. Overlap: historical and OT events/sources.
 8. Locations that are TODO
 7. Locations that are non-commital - Israel vs. Palestine vs. Canaan vs. Judea vs. Judah
*/
 
var centerLocation = null;
var sortedLocations = null;

function prepLocations() {
	// 1. sort locations
	sortedLocations = locations.sort(function(a, b) {
		if (a.locName < b.locationName)
			return -1;
		if (a.locName > b.locationName)
			return 1;
		return 0;
	});
	// 2. check no duplicate locations (and find Athens, our center-of-the-map
	var lastLoc = null;
	for (var i = 0; i < sortedLocations.length; i++) {
		var currentLoc = sortedLocations[i].locationName.trim();
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
	
	//console.log(sortedLocations);
	//console.log(eras);
	
	validateDataset(greekPhilosophers);
	validateDataset(ntBooks);
	validateDataset(ntEvents);
	validateDataset(otBooks);
	
	console.log(otBooks);
}

var allowableFields = ["subcategories", "name", "startYear", "endYear", "locationName", "locationNotes", "datingNotes", "pointform"];



function validateDataset(s) {
	console.log(s.length);
	
	// does it point to valid location?
	for (var i = 0; i < s.length; i++) {
		var found = false;
		for (var j = 0; j < sortedLocations.length; j++) {
			if (s[i].locationName == sortedLocations[j].locationName) {
				found = true;
				break;
			}
		}
		if (found == false) {
			console.log("Need location: " + s[i].locationName);			
		}		
	}
}
