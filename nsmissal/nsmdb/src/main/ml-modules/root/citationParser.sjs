'use strict';

function parseBCV(citation, context) {
  const SEP = [":", ",", "-", "(", ")", " "];
  const EOS = 42;
  var toks = [citation];
  SEP.forEach(function(x) { toks = mysplit(toks, x); } );
  
  // now run the state machine
  var sm = {
    state: "init";
    currentTerm: "",
    rangeSourceChapter: "",
    rangeSourceVerse: ""
  };
  toks = toks.push(EOS); // add an EOS marker
  for (var i = 0; i < toks.length; i++) /* feed the event stream */ {
    var event = toks[i];
    
    xdmp.log("SM in event *" + event + "* citation *" + citation + "* sm " + JSON.stringify(sm));
    
    var handled = false;
    switch(sm.state) {
      case "init":
        switch(event) {
          case "Cf.": case "see":
            sm.state = "cfing";
            handled = true;
            break;
          default:
            handled = buildBook(event, SEP, context, sm);
            break;
        }
        break;
      case "cfing":
        handled = buildBook(event, SEP, context, sm);
        break;        
      case "booking":
        switch(event) {
          case ":": // This is like the ":" in "b c:a ; c2:x-y". c2 is the new chapter for current book b
            if (isValidChapter(sm.currentTerm, context) == true)  {
              handled = true;
              context.currentChapter = sm.currentTerm;
              sm.currentTerm = "";
              sm.state = "chaptered";
            }
            break;
          case "(": // This is like the "(" in "b c:a ; c2(c3):x-y". c2 is the new chapter for current book b
            if (isValidChapter(sm.currentTerm, context) == true)  {
              handled = true;
              context.currentChapter = sm.currentTerm;
              sm.currentTerm = "";
              sm.state = "bracketing";
            }
            break;            
          case "and": case ",": // This is like  in "b c:a | resp x and y". Adding verse x to current book b chapter c
            if (isValidVerse(sm.currentTerm, context) == true) {
              handled = true;
              pushVerse(sm.currentTerm, context);
              sm.currentTerm = "";
              sm.state = "anding";
            }
            break;
          case "-": // This is like  in "b c:a | resp x-y". Ranging from verse x in current book b chapter c
            if (isValidVerse(sm.currentTerm, context) == true) {
              handled = true;
              sm.rangeStart=sm.currentTerm;
              sm.currentTerm = "";
              sm.state = "ranging";
            }
            break;
          case EOS: // This like "b c:a | resp x". Adding verse x in current book b chapter c
            if (isValidVerse(sm.currentTerm, context) == true) {
              handled = true;
              pushVerse(sm.currentTerm, context);
              sm.currentTerm = "";
              sm.state = "complete";
            }
            break;            
          default: // the normal case!
            handled = buildBook(event, SEP, context, sm);
            break;       
        }
      case "booked": // if we're booked, we want a chapter to come next "b c:d". Here we are processing the "c"
        if (isValidChapter(event, context) == true) {
          context.currentChapter = event;
          handled = true;
          sm.state = "chaptering";
        }
        break;
      case "chaptering": 
        switch(event) {
          case "(":  // "b c(c2):d". Here we are processing the "("
            sm.state = "bracketing";
            handled = true;
            break;
          case ":": // "b c:d". Here we are processing the ":"
            sm.state = "chaptered";
            handled = true;
            break;
        }
      case "bracketing":
        handled = true;
        switch(event) {
          case ")": // "b c(c2):d". Here we are processing the ")"
            state = "chaptering"; 
            break;
        }
      case "chaptered":
      case "anding":
        if (isValidVerse(event, context) == true) { // sanity check it must start with a digit
          handled = true;
          sm.currentTerm = event; 
          sm.state = "versing";
        }
        break;
      case "versing":
        switch(event) {
          case "and": case ",":
            if (isValidVerse(sm.currentTerm, context) == true) {
              handled = true;
              pushVerse(sm.currentTerm, context);
              sm.currentTerm = "";
              sm.state = "anding";
            }
            break;
          case "-":
            if (isValidVerse(sm.currentTerm, context) == true) {
              handled = true;
              sm.rangeStart=sm.currentTerm;
              sm.currentTerm = "";
              sm.state = "ranging";
            }
            break;
          case EOS:
            if (isValidVerse(sm.currentTerm, context) == true) {
              handled = true;
              pushVerse(sm.currentTerm, context);
              sm.currentTerm = "";
              sm.state = "complete";
            }
            break;            
        }
        break;                   
      case "ranging":
        if (eventIsNumber(event)) { // this is like "b c:v1-v2" where v2 is a number (it could be either a new chapter or a verse)
          handled = true;
          sm.currentTerm = event;
          sm.state = "ranged";
        }
        else if (isVerselike(event) == true && isValidVerse(event, context) == true) { // this is like "b c:v1-v2", where v2 is something like "5ab" (obviously a verse)
          handled = true;
          pushVerseRange(sm.rangeStart, event, context); // this will push the verse range [sm.rangeStart, event]
          sm.currentTerm = "";
          sm.rangeStart = "";
          sm.state = "versing";
        }
        break;
      case "ranged": 
        switch(event) {
          case "and": case ",":
            if (isValidVerse(sm.currentTerm, context) == true) {
              handled = true;
              pushVerseRange(sm.rangeStart, sm.currentTerm, context); // this will push the verse range [sm.rangeStart, event]
              sm.currentTerm = "";
              sm.rangeStart = "";
              sm.state = "versing";
            }
            break;
          case ":": // "b c:v-c2:v2". Here we process the ":" after c2. 
            if (isValidChapter(sm.currentTerm, context) == true) {
              handled = true;
              context.currentChapter = sm.currentTerm;
              
              sm.rangeStart=sm.currentTerm;
              sm.currentTerm = "";
              sm.state = "chaptered";
              
              
              // TODO when I get the v2, I need to somehow set range c:v - c2:v2
              
            }
            break;
          case EOS:
            if isValidVerse(sm.currentTerm, context) == true) {
              handled = true;
              pushVerseRange(sm.rangeStart, sm.currentTerm, context); // this will push the verse range [sm.rangeStart, event]
              sm.currentTerm = "";
              sm.rangeStart = "";
              sm.state = "complete";
            }
            break;            
        }
        break;
      case "complete":
        break;
      default:
        throw "Invalid state *" + state + "*";
    }
    
    xdmp.log("SM out event *" + event + "* citation *" + citation + "* sm " + JSON.stringify(sm));
    if (handled == false) throw "In state " + sm.state + " unhandled event " + event;
  }
  
  if (sm.state != "complete") throw "State machine concluded in incomplete state " + sm.state;
}

function isWord(w, sep) {
  return sep.indexOf(w[0]) < 0;
}

function mysplit(s, sep) {
  var rtoks = [];
  var as = Array.isArray(s) ? s : [s];
  for (var i = 0; i < as.length; i++) {
    var toks = as[i].split(sep);
    for (var j = 0; j < toks.length; j++) {
      rtoks.push(toks[j].trim());
      if (j < toks.length - 1) rtoks.push(sep);
    }    
  }
  return rtoks.map(str => str.trim()).filter(s => s != "");
}

function parseCitation(citation, bibleToc) {
	var context = {currentBook: "", currentChapter: "", verses: []}, bibleToc: bibleToc};
	var mainAndResp = citation.split("|"); 
  switch(mainAndResp.length) {
    case 1:
      break;
    case 2:
      var temp = mainAndResp[2].trim();
      if (fn.startsWith(temp.toLowerCase, "resp")) mainAndResp[2] = temp.substring(4);
      break;
    default:
      throw "Illegal citation resp length " + mainAndResp.length + " in " + citation;
  }
  mainAndResp.forEach(mr => mr.split(";").forEach(cx => parseBCV(cx, context)));
  return context;
}

var citation = "Cf. Ps 95(94) 3:2-4;4:1-4 and 6 | resp (see 1); Is 1:1";
parseCitation(citation, null)
