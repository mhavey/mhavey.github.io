const sem = require("/MarkLogic/semantics.xqy");

const NSM = "http://jude.org/ns-missal/";

function checkExists(s) { 
	if (cts.estimate(cts.andQuery([
		cts.collectionQuery("masses"), 
		cts.jsonPropertyValueQuery("uri", s, ["exact"])
		])) == 0) {
		throw "Data sin: not found *" + s + "*";
	}
}

function addBook(bookAbbrev, bookName, biblicalOrder, triples) {
	const bookIRI = sem.iri(NSM + xdmp.urlEncode(bookAbbrev));
	triples.push(sem.triple(bookIRI, sem.curieExpand("rdfs:type"), sem.iri(NSM+"book")));
	triples.push(sem.triple(bookIRI, sem.curieExpand("rdfs:label"), bookName));
	triples.push(sem.triple(bookIRI, sem.iri(NSM + "bookCode"), bookAbbrev));
	triples.push(sem.triple(bookIRI, sem.iri(NSM + "biblicalOrder"), biblicalOrder));
}

function addChapter(bookAbbrev, chapterNum, triples) {
	const bookIRI = sem.iri(NSM + xdmp.urlEncode(bookAbbrev));
	const chapterIRI = sem.iri(NSM + xdmp.urlEncode(bookAbbrev + "/" + chapterNum));
	triples.push(sem.triple(chapterIRI, sem.curieExpand("rdfs:type"), sem.iri(NSM+"chapter")));
	triples.push(sem.triple(chapterIRI, sem.iri(NSM + "hasChapterNum"), chapterNum));
	triples.push(sem.triple(chapterIRI, sem.iri(NSM + "hasParentBook"), bookIRI));
}

function addVerse(bookAbbrev, chapterNum, verseNum, triples) {
	const chapterIRI = sem.iri(NSM + xdmp.urlEncode(bookAbbrev + "/" + chapterNum));
	const verseIRI = sem.iri(NSM + xdmp.urlEncode(bookAbbrev + "/" + chapterNum + "/" + verseNum));
	triples.push(sem.triple(verseIRI, sem.curieExpand("rdfs:type"), sem.iri(NSM+"verse")));
	triples.push(sem.triple(verseIRI, sem.iri(NSM + "hasVerseNum"), verseNum));
	triples.push(sem.triple(verseIRI, sem.iri(NSM + "hasParentChapter"), chapterIRI));
}

function linkMassToReading(massIRI, readingIRI, triples) {
	triples.push(sem.triple(sem.iri(massIRI), sem.curieExpand("rdfs:type"), sem.iri(NSM + "mass")));
	triples.push(sem.triple(sem.iri(readingIRI), sem.curieExpand("rdfs:type"), sem.iri(NSM + "reading")));
	triples.push(sem.triple(sem.iri(massIRI), sem.iri(NSM + "hasReading"), sem.iri(readingIRI)));
}

function linkMassToParent(massIRI, parentIRI, triples) {
	triples.push(sem.triple(sem.iri(massIRI), sem.iri(NSM + "hasParent"), sem.iri(parentIRI)));	
}

function linkMassToDate(massIRI, adventYear, date, triples) {
	checkExists(massIRI);
	var xd = xs.date(date);
	var massDateIRI = sem.iri(NSM + adventYear + "_" + xd);
	triples.push(sem.triple(sem.iri(massIRI), sem.iri(NSM + "hasMassDate"), massDateIRI));
	triples.push(sem.triple(massDateIRI, sem.curieExpand("rdfs:type"), sem.iri(NSM + "massDate")));
	triples.push(sem.triple(massDateIRI, sem.iri(NSM + "hasAdventYear"), adventYear));
	triples.push(sem.triple(massDateIRI, sem.iri(NSM + "hasDate"), xd));
}

function coverVerseWithReading(readingIRI, bookAbbrev, chapterNum, verseNum, triples) {
	const verseIRI = sem.iri(NSM + xdmp.urlEncode(bookAbbrev + "/" + chapterNum + "/" + verseNum));
	triples.push(sem.triple(sem.iri(readingIRI), sem.iri(NSM + "covers"), verseIRI));
}

function saveTriples(tag, triples) {
	sem.rdfInsert(triples, ["directory=" + NSM + tag]);
}

module.exports = {
  addBook: addBook,
  addChapter: addChapter,
  addVerse: addVerse,
  coverVerseWithReading: coverVerseWithReading,
  linkMassToParent: linkMassToParent, 
  linkMassToReading: linkMassToReading,
  linkMassToDate: linkMassToDate,
  saveTriples: saveTriples
};
