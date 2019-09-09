const sem = require("/MarkLogic/semantics.xqy");

const NSM = "http://jude.org/ns-missal/";

// s - a string that will set as sem.iri(s)
// p - a  string that will set as sem.iri(p)
// o - an atomic or a sem.iri. Treated as is
function link(s, p, o) {
	sem.rdfInsert(sem.iri(s), sem.iri(p), o);
}

module.exports = {
  NSM: NSM,
  link: link
};
