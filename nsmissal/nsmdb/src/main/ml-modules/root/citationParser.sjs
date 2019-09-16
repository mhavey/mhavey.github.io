const SEP = [":", ",", "-", "(", ")", " "];
const EOS = 42;
const VERSE_LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const CV_NUMBERS = "0123456789".split("");

function parseBCV(citation, context) {
  xdmp.log("Starting SM for " + citation);
  
  var toks = [citation];
  SEP.forEach(function(x) { toks = mysplit(toks, x); } );
  
  // now run the state machine
  var sm = {
    state: "init",
    currentTerm: "",
    rangeSourceChapter: "",
    rangeSourceVerse: ""
  };
  toks.push(EOS); // add an EOS marker

  for (var i = 0; i < toks.length; i++) /* feed the event stream */ {
    var event = toks[i];
    
    xdmp.log("SM in event *" + event + "* citation *" + citation + "* sm " + JSON.stringify(sm) + " ctx: book/chapter/verses *" 
             + context.currentBook + "*" + context.currentChapter + "*" + JSON.stringify(context.verses));
    
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
          case "and": case "or": case ",": // This is like  in "b c:a | resp x and y". Adding verse x to current book b chapter c
            if (pushValidVerse(sm.currentTerm, context) == true) {
              handled = true;
              sm.currentTerm = "";
              sm.state = "anding";
            }
            break;
          case "-": // This is like  in "b c:a | resp x-y". Ranging from verse x in current book b chapter c
            if (isValidVerse(sm.currentTerm, context) == true) {
              handled = true;
              sm.rangeSourceVerse=sm.currentTerm;
              sm.rangeSourceChapter=context.currentChapter;
              sm.currentTerm = "";
              sm.state = "ranging";
            }
            break;
          case EOS: // This like "b c:a | resp x". Adding verse x in current book b chapter c
            if (pushValidVerse(sm.currentTerm, context) == true) {
              handled = true;
              sm.state = "complete";
            }
            break;            
          default: // the normal case!
            handled = buildBook(event, SEP, context, sm);
            break;       
        }
        break;
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
            sm.state = "chaptering"; 
            break;
        }
        break;
      case "chaptered":
        if (isValidVerse(event, context) == true) { // sanity check it must start with a digit
          handled = true;
          sm.currentTerm = event; 
          sm.state = "versing";
        }
        break;
      case "anding":  // TODO - this can be either a chapter or a verse. It can be the "e" in either "B c:d, e:f" or "B c:d, e"
        if (eventIsVerselike(event) == true) {
          sm.state = "versing";
          sm.currentTerm= event;
          handled = true;
        }
        break;
      case "versing":
        switch(event) {
          case "and": case "or": case ",":
            if (pushValidVerse(sm.currentTerm, context) == true) {
              handled = true;
              sm.currentTerm = "";
              sm.state = "anding";
            }
            break;
          case "-":
            if (isValidVerse(sm.currentTerm, context) == true) {
              handled = true;
              sm.rangeSourceVerse=sm.currentTerm;
              sm.rangeSourceChapter=context.currentChapter;
              sm.currentTerm = "";
              sm.state = "ranging";
            }
            break;
          case ":":
            if (isValidChapter(sm.currentTerm, context) == true) {
              handled = true;
              context.currentChapter = sm.currentTerm;
              sm.state = "chaptered";
            }
            break;
          case EOS:
            if (pushValidVerse(sm.currentTerm, context) == true) {
              handled = true;
              sm.state = "complete";
            }
            break;
        }
        break;                   
      case "ranging":
        if (eventIsVerselike(event) == true) { // b c:v1-v2. Here v2 will be either a verse or a chapter)
          handled = true;
          sm.currentTerm = event;
          sm.state = "rangeTargeting";
        }
        break;
      case "rangeTargeting":
        switch(event) {
          case ",": case "and": case "or":
            if (pushValidRange(sm.rangeSourceChapter, sm.rangeSourceVerse, sm.currentTerm, context) == true) {
              handled = true;
              sm.rangeSourceVerse = "";
              sm.rangeSourceChapter = "";
              sm.currentTerm = ""; 
              sm.state = "anding";
            }
            break;
          case ":":
            if (isValidChapter(sm.currentTerm, context) == true) {
              handled = true;
              context.currentChapter = sm.currentTerm;
              sm.state = "rangeChaptered";
            }
            break;
          case EOS: 
            if (pushValidRange(sm.rangeSourceChapter, sm.rangeSourceVerse, sm.currentTerm, context) == true) {
              handled = true;
              sm.state = "complete";
            }
            break;
        }
        break;
      case "rangeChaptered": 
        if (pushValidRange(sm.rangeSourceChapter, sm.rangeSourceVerse, event, context) == true) {
          handled = true;
          sm.rangeSourceVerse = "";
          sm.rangeSourceChapter = "";
          sm.currentTerm = ""; 
          sm.state = "ranged";
        }
        break;
      case "ranged":
        switch(event) {
          case ",": case "and": case "or":
            handled = true;
            sm.currentTerm = "";
            sm.state = "anding";
            break;
          case EOS: 
            handled = true;
            sm.state = "complete";
            break;
        }
        break;
      case "complete":
        break;
      default:
        throw "Invalid state *" + state + "*";
    }
    
    xdmp.log("SM out event *" + event + "* citation *" + citation + "* sm " + JSON.stringify(sm) + " ctx: book/chapter/verses *" 
             + context.currentBook + "*" + context.currentChapter + "*" + JSON.stringify(context.verses));
    if (handled == false) throw "In state " + sm.state + " unhandled event " + event;
  }
  
  if (sm.state != "complete") throw "State machine concluded in incomplete state " + sm.state;
}

function buildBook(event, seps, context, sm) {

  // must be a word that doesn't start with a separator
  if (event.length == 0 || seps.indexOf(event[0]) >= 0) return false;

  // build the current term
  if (sm.currentTerm == "") sm.currentTerm = event;
  else sm.currentTerm += " " + event;

  // is the current term a book of the bible?
  for (var book in context.bibleToc) {
    if (""+book == sm.currentTerm) {

      // it's a bible book! Check it if's a unibook
      if (context.bibleToc[book].verses.length == 1) {
        context.currentChapter = "1";
        sm.state = "chaptered";
      }
      else {
        context.currentChapter = "";
        sm.state = "booked";
      }
      context.currentBook = sm.currentTerm;
      sm.currentTerm = "";
      return true;
    }
  }

  sm.state = "booking";
  return true;
}

function isValidChapter(term, context) {
  if (context.currentBook == "") return false;
  try {
    var chapter = Iint(term) - 1; // make zero-based
    var numChapters =context.bibleToc[context.currentBook].verses.length;
    if (chapter < numChapters) return true;

    xdmp.log("BREF - CHAPTER OUT OF RANGE in " + context.currentBook + " chapter " + chapter + " actual num " + numChapters); 
    return false;
  } catch(e) {
    return false;
  }
}

function isValidVerse(term, context) {
  return actualVerse(term, context) != null;
}

function actualVerse(term, context, altChapter) {

  if (context.currentBook == "") return null
  if (context.currentChapter == "") return null;
  try {
    var chapter = altChapter ? altChapter : Iint(context.currentChapter);
    var numVersesInChapter = context.bibleToc[context.currentBook].verses[chapter - 1]; 

    // reduce the verse to a number; strip the letters
    if (term[0] == "0") return false;
    var goodVerse = term.split("").filter(s => CV_NUMBERS.indexOf(s) >= 0).join("");
    if (goodVerse.length == 0) return null;
    if (goodVerse[0] == "0") return null;

    goodVerse = Iint(goodVerse);
    if (goodVerse <= numVersesInChapter) return goodVerse;

    xdmp.log("BREF - VERSE OUT OF RANGE in " + context.currentBook + "/" + chapter + " verse " + goodVerse + " actual " + numVersesInChapter); 
    return null;
  }
  catch(e) {
    return null;
  } 
}

function eventIsVerselike(term) {
  // notice CV_NUMBERS.indexOf checks > 0. "=0" not allowed. the term cannot start with a zero
  return term.length > 0 && CV_NUMBERS.indexOf(term[0]) > 0;
}

function hasVerse(c, v, context) {
  // make sure no dupes
  for (var i = 0; i < context.verses.length; i++) {
    if (context.verses[i].book == context.currentBook && context.verses[i].chapter == c && context.verses[i].verse == v) return true;
  }
  return false;
}

function pushValidVerse(sverse, context) {
  var verse = actualVerse(sverse, context);
  if (verse == null) return false;

  var chapter = Iint(context.currentChapter);

  if (hasVerse(chapter, verse, context) == true) return true;
  context.verses.push({book: context.currentBook, chapter: chapter, verse: verse});
  return true;
}

function pushValidRange(sSourceChapter, sSourceVerse, sTargetVerse, context) {
  try {
    var sourceChapter = Iint(sSourceChapter);
    var targetChapter = Iint(context.currentChapter);
    var numSourceVerses = context.bibleToc[context.currentBook].verses[sourceChapter - 1];
    var sourceVerse = actualVerse(sSourceVerse, context, sourceChapter);
    var targetVerse = actualVerse(sTargetVerse, context);
    if (sourceVerse == null || targetVerse == null) return false;

    // case 1 - source and target chapters are the same
    if (sourceChapter == targetChapter) {
      if (sourceVerse >= targetVerse) return false; // backwards
      for (var v = sourceVerse; v <= targetVerse; v++) {
        if (hasVerse(sourceChapter, v, context)) continue;
        context.verses.push({book: context.currentBook, chapter: sourceChapter, verse: v});
      }
      return true;
    }
    else if (sourceChapter < targetChapter) {
      for (var c = sourceChapter; c <= targetChapter; c++) {
        var startVerse = c == sourceChapter ? sourceVerse : 1;
        var endVerse = c == targetChapter ? targetVerse : numSourceVerses;
        for (var v = startVerse; v <= endVerse; v++) {
          if (hasVerse(c, v, context)) continue;
          context.verses.push({book: context.currentBook, chapter: c, verse: v});
        }
      }
      return true;
    }
    else return false; // it's illegal to go backwards!
  } catch (e) {
    xdmp.log("pushValidRange " + sourceChapter + " " + targetChapter + " " + numSourceVerses + " " + sourceVerse + " " + targetVerse + "-e" + e);
    return false;
  }
}

function Iint(s) {
  return parseInt("" + xs.integer(s));
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
  return rtoks.map(str => str.trim()).filter(s => s != "" && s.toLowerCase() != "cf." && s.toLowerCase() != "see");
}

function parseCitation(citation, bibleToc) {
  if (citation.trim().toLowerCase() == "noref") return [];

  var context = {currentBook: "", currentChapter: "", verses: [], bibleToc: bibleToc};
  try {
    var mainAndResp = citation.split("|"); 
    switch(mainAndResp.length) {
      case 1:
        break;
      case 2:
        var temp = mainAndResp[1].trim();
        if (fn.startsWith(temp.toLowerCase(), "resp")) mainAndResp[1] = temp.substring(4);
        break;
      default:
        throw "Illegal citation resp length " + mainAndResp.length + " in " + citation;
    }
    mainAndResp.forEach(mr => mr.split(";").forEach(cx => parseBCV(cx, context)));    
  } catch(e) {
    xdmp.log("ERROR parsing citation *" + citation + "* error is " + e, "error");
    context.verses = [];
  }
  return context.verses;
}

module.exports = {
  parseCitation: parseCitation
};
