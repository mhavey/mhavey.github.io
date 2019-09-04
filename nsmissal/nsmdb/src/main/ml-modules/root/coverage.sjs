const sem = require("/MarkLogic/semantics.xqy");

const BIBLE_TOC_URI = "/bible.json";
const NSM = "http://jude.org/ns-missal/";
const NSM_VERSE = NSM + "verse";
const NSM_HAS_COVER = NSM + "hasCover";

function verseIRI(book, chapter, verse) {return sem.iri(NSM + book + "/" + chapter + "/" + verse);}

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
	}

	xdmp.documentInsert(BIBLE_TOC_URI, bible, {collections: ["nsm", "bible"], permissions: savedPerms});
}

function initCoverage(content, context) {
	var newDoc = content.value.toObject();
	newDoc.triples = [];
	for (var i = 1; i <= newDoc.verses; i++) {
		newDoc.triples.push(sem.triple(
			verseIRI(newDoc.book, newDoc.chapter, i), 
			sem.curieExpand("rdfs:type"), 
			sem.iri(NSM_VERSE)));
	}
    content.value = xdmp.unquote(xdmp.quote(newDoc));
	return content;
};

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
		coverWalk(doc, context);
	}

/*
	for (var mod in context.mods) {
		var modRecord = context.mods[mod];
		xdmp.documentInsert(modRecord.uri, modRecord.doc, context.props); 
	}
*/
}

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
  
  // strip out the noisy Cf. 
  var cleanCit = fn.replace(reading.citation, "Cf.", "").trim();
  xdmp.log("Linking " + reading.uri + " " + cleanCit);

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
  	xdmp.log("Illegal citation " + JSON.stringify(reading), "error");
  	return;
  }

xdmp.log("Book " + book + " for " + JSON.stringify(reading));

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
}

module.exports = {
  organizeBible : organizeBible,
  initCoverage: initCoverage,
  cover: cover
};
