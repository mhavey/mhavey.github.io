const nsem = require("nsmSem.sjs");

const BIBLE_TOC_URI = "/bible.json";

function organizeBible() {
	var bible = {};
	var savedPerms = null;
	var order2Book = {};
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
		} else {
			if (bible[doc.abbrev].title != doc.book || bible[doc.abbrev].biblicalOrder != doc.biblicalOrder) {
				throw "Data sin: Inconsistent data " + uri + " for " + doc.abbrev;
			}
		}
		bible[doc.abbrev].verses.push(doc.verses);


		// create triples for the verses
		var triples = [];
		for (var v = 1; v <= doc.verses; v++) nsem.addVerse(doc.abbrev, doc.chapter, v, triples);
		nsem.saveTriples("verses/" + doc.abbrev + "/" + doc.chapter, triples);
	}

	xdmp.documentInsert(BIBLE_TOC_URI, bible, {collections: ["nsm", "bible"], permissions: savedPerms});
}

function linkMassesToReadings() {
	var docs = cts.search(cts.collectionQuery("masses"));
	for (var odoc of docs) {
		var doc = odoc.toObject();
		var triples = [];
		mrWalk(doc, null, triples);
		nsem.saveTriples("mr/" + fn.documentUri(doc), triples);
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

function cover() {
	var context = {
		bibleToc: cts.doc(BIBLE_TOC_URI).toObject(), 
		props: null,
		mods: {}
	};
	var docs = cts.search(cts.collectionQuery("masses"));
	for (var odoc of docs) {
		var uri = fn.documentUri(odoc);
		var doc = odoc.toObject();
		//coverWalk(doc, context);
	}
}

/*
function addCover(readingIRI, book, chapter, verse, context) {

	var thisMod = context.mods[book + "/" + chapter];
	if (!thisMod) {
		var odoc = fn.head(cts.search(cts.andQuery([
			cts.collectionQuery("bibleChapter"),
			cts.jsonPropertyValueQuery("book", book),
			cts.jsonPropertyValueQuery("chapter", chapter)
		])));
		if (!odoc || odoc == null) {
			throw "Data sin: for reading " + readingIRI + " failed to find *" + book + "*" + chapter + "*";
		}
		var uri = fn.documentUri(odoc);
		if (context.props == null) {
			context.props = {
				collections: xdmp.documentGetCollections(uri), 
				permissions: xdmp.dls.documentGetPermissions(uri)
			};
		}
		context.mods[book + "/" + chapter] = {
			uri: uri, 
			doc: odoc.toObject()
		};
	}

	thisMod.doc.triples.push(sem.triple(verseIRI(book, chapter, verse), sem.iri(NSM_HAS_COVER), sem.iri(readingIRI)));
}

function coverWalk(doc, context) {
	if (!doc.readings) return;
	doc.readings.forEach(function (f) {
		if (f.readingType) linkCitationToVerses(f, context);
		else if (f.readings) coverWalk(f, context);    
  	});
}

function linkCitationToVerses(reading, context) {
  
  // ignore noref
  if (reading.citation.toUpperCase() == "NOREF") return;
  
  // strip out the noisy Cf.  and see 
  var cleanCit = fn.replace(reading.citation, "Cf.", "").trim();
  cleanCit = fn.replace(reading.citation, "see", "").trim();

  // determine the book; it's either one string (Jn) or a number then a string (1 Thes)
  var toks = cleanCit.split(" ");
  var book = "";
  if (toks.length > 1 && toks[0] == "1" || toks[0] == "2" || toks[0] == "3") {
  	book = toks[0] + " " + toks[1];
  }
  else if (toks.length > 0) {
  	book = toks[0];
  }
  var bookSpec;
  if (book != "") bookSpec = context.bibleToc[book];
  if (!bookSpec || bookSpec == null)  {
  	xdmp.log("Data sin - invalid book in " + JSON.stringify(reading), "error");
  	return;
  }

  // determine the chapter
  var restOfCit = fn.substringAfter(cleanCit, book).trim();
  toks = restOfCit.split(":");
*/


/*

  // start left; the part before the first colon is the book and chapter; extract it 
  var firstColonIdx = reading.citation.indexOf(":");
  
  xdmp.log("Got " + reading.uri + " *" + cleanCit.substring(0, firstColonIdx).trim() + "*");
  
  if (firstColonIdx < 0) throw "Unable to find book 1 " + reading.uri + " *" + cleanCit + "*";
  var bookChap1 = reading.citation.substring(0, firstColonIdx).trim();
  
  // If this has A(B), ingore the (B)
  // Also handle the case where there is no chapter; this is valid for the books that have just one chapter
  
  // next extract the chapter  
  //var chapter

  // add the cover
  // TODO - call this in a loop
  addCover(f.uri, book, chapter, verse, context);

*/

module.exports = {
  linkMassesToReadings: linkMassesToReadings,
  organizeBible : organizeBible,
  cover: cover
};
