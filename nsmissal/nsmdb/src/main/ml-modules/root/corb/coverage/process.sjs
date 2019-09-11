var rows = [];
URI.split(';').forEach(function(chapterIRI) {
   var seq = sem.sparql(`select ?bookName ?bookAbbrev ?biblicalOrder ?chapterNum ?verseNum ?readingIRI where { 
   	<${chapterIRI}> <http://jude.org/ns-missal/hasParentBook> ?bookIRI .
   	<${chapterIRI}> <http://jude.org/ns-missal/hasChapterNum> ?chapterNum .
   	?bookIRI <http://www.w3.org/2000/01/rdf-schema#label> ?bookName .
   	?bookIRI <http://jude.org/ns-missal/bookCode> ?bookAbbrev .
   	?bookIRI <http://jude.org/ns-missal/biblicalOrder> ?biblicalOrder .
   	?verseIRI <http://jude.org/ns-missal/hasParentChapter> <${chapterIRI}> .
   	?verseIRI <http://jude.org/ns-missal/hasVerseNum> ?verseNum . 
   	OPTIONAL { ?readingIRI <http://jude.org/ns-missal/covers> ?verseIRI } .  }`).toArray().forEach(r => rows.push([
   		r.biblicalOrder, r.bookAbbrev, r.bookName, r.chapterNum, r.verseNum, r.readingIRI].join(',')));
});
Sequence.from(rows)
