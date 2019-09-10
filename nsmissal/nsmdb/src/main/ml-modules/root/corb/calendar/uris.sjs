var seq = sem.sparql('select distinct ?year  where { ?massDate <http://jude.org/ns-missal/hasAdventYear> ?year }');
Sequence.from([fn.count(seq), Sequence.from(seq.toArray().map(s => s.year))])
