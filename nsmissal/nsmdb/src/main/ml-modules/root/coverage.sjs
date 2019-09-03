const sem = require("/MarkLogic/semantics.xqy");

const NSM = "http://jude.org/ns-missal/";
const NSM_VERSE = NSM + "verse";

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

	xdmp.documentInsert("/bible.json", bible, {collections: ["bible"], permissions: savedPerms});
}

function initCoverage(content, context) {
	var newDoc = content.value.toObject();
	newDoc.triples = [];
	for (var i = 1; i <= newDoc.verses; i++) {
		newDoc.triples.push(sem.triple(
			sem.iri(NSM + newDoc.book + "/" + newDoc.chapter + "/" + i), 
			sem.curieExpand("rdfs:type"), 
			sem.iri(NSM_VERSE)));
	}
    content.value = xdmp.unquote(xdmp.quote(newDoc));
	return content;
};

module.exports = {
  organizeBible : organizeBible,
  initCoverage: initCoverage
};
