const nsem = require("nsmSem.sjs");
const cit = require("citationParser.sjs");

const BIBLE_TOC_URI = "/bible.json";

function organizeBible() {
	var bible = {};
	var savedPerms = null;
	var order2Book = {};
	var bookTriples = [];
	var docs = cts.search(cts.collectionQuery("bibleChapter"), cts.indexOrder(cts.elementReference(fn.QName("", "chapter"))));
	for (var odoc of docs) {
		var doc = odoc.toObject();
		var uri = fn.documentUri(odoc);
		if (savedPerms == null) savedPerms = xdmp.documentGetPermissions(uri);
		if (!bible[doc.abbrev]) {
			if (order2Book[doc.biblicalOrder]) {
				throw "Data sin: duplicate biblical order " + uri + ": " + doc.biblicalOrder;
			}
			order2Book[doc.biblicalOrder] = 1;

			bible[doc.abbrev] = {
				title: doc.book,
				biblicalOrder: doc.biblicalOrder,
				verses: []
			};
			nsem.addBook(doc.abbrev, doc.book, doc.biblicalOrder, bookTriples); 
		} else {
			if (bible[doc.abbrev].title != doc.book || bible[doc.abbrev].biblicalOrder != doc.biblicalOrder) {
				throw "Data sin: Inconsistent data " + uri + " for " + doc.abbrev;
			}
		}

		var triples = []; // chapter and verse triples
		nsem.addChapter(doc.abbrev, doc.chapter, triples);
		bible[doc.abbrev].verses.push(doc.verses);


		for (var v = 1; v <= doc.verses; v++) nsem.addVerse(doc.abbrev, doc.chapter, v, triples);
		nsem.saveTriples("verses/" + doc.abbrev + "/" + doc.chapter, triples);
	}

	nsem.saveTriples("books", bookTriples);
	xdmp.documentInsert(BIBLE_TOC_URI, bible, {collections: ["nsm", "bible"], permissions: savedPerms});
}

function linkMassesToReadings() {
	var docs = cts.search(cts.collectionQuery("masses"));
	for (var odoc of docs) {
		var doc = odoc.toObject();
		var triples = [];
		mrWalk(doc, null, triples);
		nsem.saveTriples("mr/" + fn.documentUri(odoc), triples);
	}
}

function cover() {
	const bibleToc = cts.doc(BIBLE_TOC_URI).toObject();
	var docs = cts.search(cts.collectionQuery("masses"));
	for (var odoc of docs) {
		var doc = odoc.toObject();
		var triples = [];
		coverWalk(doc, bibleToc, triples); 
		nsem.saveTriples("cover/" + fn.documentUri(odoc), triples);
	}
}

function mrWalk(doc, father, triples) {
	if (doc.uri) {
		if (doc.readingType) {
			nsem.linkMassToReading(father, doc.uri, triples);
		}
		else {
			if (father != null) nsem.linkMassToParent(doc.uri, father, triples);
			if (doc.readings) doc.readings.forEach(r => mrWalk(r, doc.uri, triples));
		}
	}
}

function coverWalk(doc, bibleToc, triples) {
	if (doc.uri) {
		if (doc.readingType) {
			cit.parseCitation(doc.citation, bibleToc).forEach(
				cv => nsem.coverVerseWithReading(doc.uri, cv.book, cv.chapter, cv.verse, triples));
		}
		else {
			if (doc.readings) doc.readings.forEach(r => coverWalk(r, bibleToc, triples));
		}
	}	
}

module.exports = {
  linkMassesToReadings: linkMassesToReadings,
  organizeBible : organizeBible,
  cover: cover
};
