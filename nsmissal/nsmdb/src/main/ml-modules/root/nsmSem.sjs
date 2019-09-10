const sem = require("/MarkLogic/semantics.xqy");

const NSM = "http://jude.org/ns-missal/";

function iverse(b,c,v) { return sem.iri(NSM + b + "/" + c + "/" + v); }

function checkExists(s) { 
	if (cts.estimate(cts.andQuery([
		cts.collectionQuery("masses"), 
		cts.jsonPropertyValueQuery("uri", s, ["exact"])
		])) == 0) {
		throw "Data sin: not found *" + s + "*";
	}
}

function linkMassToReading(mass, reading, triples) {
	triples.push(sem.triple(sem.iri(mass), sem.curieExpand("rdfs:type"), sem.iri(NSM + "mass")));
	triples.push(sem.triple(sem.iri(reading), sem.curieExpand("rdfs:type"), sem.iri(NSM + "reading")));
	triples.push(sem.triple(sem.iri(mass), sem.iri(NSM + "hasReading"), sem.iri(reading)));
}

function linkMassToParent(mass, parent, triples) {
	triples.push(sem.triple(sem.iri(mass), sem.iri(NSM + "hasParent"), sem.iri(parent)));	
}

function addVerse(book, chapter, verse, triples) {
	triples.push(sem.triple(iverse(book, chapter, verse), sem.curieExpand("rdfs:type"), sem.iri(NSM+"verse")));
}

function linkMassToDate(mass, adventYear, date, triples) {
	checkExists(mass);
	var xd = xs.date(date);
	var massDate = sem.iri(NSM + adventYear + "_" + xd);
	triples.push(sem.triple(sem.iri(mass), sem.iri(NSM + "hasMassDate"), massDate));
	triples.push(sem.triple(massDate, sem.curieExpand("rdfs:type"), sem.iri(NSM + "massDate")));
	triples.push(sem.triple(massDate, sem.iri(NSM + "hasAdventYear"), adventYear));
	triples.push(sem.triple(massDate, sem.iri(NSM + "hasDate"), xd));
}

function coverVerseWithReading(reading, b, c, v) {
	checkExists(verse);
	sem.rdfInsert(sem.triple(sem.iri(reading), sem.iri(NSM + "covers"), iverse(b,c,v)));
}

function saveTriples(tag, triples) {
	sem.rdfInsert(triples, ["directory=" + NSM + tag]);
}

module.exports = {
  addVerse: addVerse,
  linkMassToParent: linkMassToParent, 
  linkMassToReading: linkMassToReading,
  linkMassToDate: linkMassToDate,
  coverVerseWithReading: coverVerseWithReading,
  saveTriples: saveTriples
};
