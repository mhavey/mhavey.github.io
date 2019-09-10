var rows = [];
URI.split(';').forEach(function(adventYear) {
   var seq = sem.sparql(`select ?mass ?date where { 
   	?mass  <http://jude.org/ns-missal/hasMassDate> ?md . 
   	?md <http://jude.org/ns-missal/hasAdventYear> ${adventYear} . 
   	?md <http://jude.org/ns-missal/hasDate> ?date }`).toArray().forEach(r => rows.push([adventYear, r.mass, r.date].join(',')));
});
Sequence.from(rows)
