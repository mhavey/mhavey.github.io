var seq = sem.sparql('select distinct ?chapter  where { ?chapter <http://www.w3.org/2000/01/rdf-schema#type> <http://jude.org/ns-missal/chapter> }');
Sequence.from([fn.count(seq), Sequence.from(seq.toArray().map(s => s.chapter))])
