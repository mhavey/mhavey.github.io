var seq = sem.sparql('select distinct ?chapter  where { ?chapter <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://jude.org/ns-missal/chapter> }');
Sequence.from([fn.count(seq), Sequence.from(seq.toArray().map(s => s.chapter))])
