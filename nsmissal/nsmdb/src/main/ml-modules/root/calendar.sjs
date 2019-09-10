const nsem = require("nsmSem.sjs");

const FIRST_C_YEAR = 2012; // begins advent 2012
const ABC_YEARS = ["C", "A", "B"];
const FIRST_I_YEAR = 2013; // is this true?
const I__II_YEARS = ["I", "II"];

// https://www.irt.org/articles/js052/index.htm
function getEasterDate(Y) {
    var C = Math.floor(Y/100);
    var N = Y - 19*Math.floor(Y/19);
    var K = Math.floor((C - 17)/25);
    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7*Math.floor(J/7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40)/44);
    var D = L + 28 - 31*Math.floor(M/4);
  
    return new Date(Y,M,D);
}

function getFirstDayOfNextYear(easterYear) {
	var xmas = getDate(easterYear, 12, 25);
	var xd = getDayOfWeek(xmas);
	var a4 = addDays(xmas, -1 * (xd == 0 ? 7 : xd));
	return addDays(a4, -21);
}

function getDate(year, month, day) {return new Date(year, month-1, day);}
function addDays(date, days) {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}
function getDayOfWeek(d) {return d.getDay();}
function getDayOfMonth(d) {return d.getDate();}
function compareDates(d1, d2) {
  var t1 = d1.getTime()
  var t2 = d2.getTime();
  if (t1 == t2) return 0;
  if (t1 > t2) return 1;
  return -1;
}
function isLeap(year) {return new Date(year, 1, 29).getDate() === 29;}

function addMassDate(uri, context, arg1, arg2) {
	var date;
	if (arg2) {
		var aDate = getDate(context.adventYear, arg1, arg2);
		// if we're calculating the date, which year to use?
		// adventYear if M/D >= M/D of advent year; else easterYear
		if (compareDates(context.advent1Date,  aDate) <= 0) date = aDate;
		date = getDate(context.easterYear, arg1, arg2);
	}
	else date = arg1;

	// now link the date to uri
	nsem.linkMassToDate(uri, context.adventYear, date);
}

function ith(n) {
	switch (n) {
	case 1: case 21: case 31: return n + "st"; break;
	case 2: case 22: case 32: return n + "nd"; break;
	case 3: case 23: case 33: return n + "rd"; break;
	default:
		if (n <= 0 || n > 34) throw "Illegal ith for " + n;
		return n + "th";
	}
}

function buildReport(years) {
	years.forEach(y => null);
}

function buildCalendar(adventYear) {
	if (adventYear < FIRST_C_YEAR) throw "Year too early, must be at least " + FIRST_C_YEAR;
	var context = {
		adventYear: adventYear,
		easterYear: adventYear + 1,
		sundayCycle: ABC_YEARS[(adventYear - FIRST_C_YEAR) % ABC_YEARS.length],
		weekdayCycle: I__II_YEARS[(adventYear + 1 - FIRST_I_YEAR) % I__II_YEARS.length],
		christmasDate: getDate(adventYear, 12, 25),
		easterDate: getEasterDate(adventYear + 1),
		firstDayNextYear: getFirstDayOfNextYear(adventYear + 1)
	};
	context.christmasDayOfWeek = context.christmasDate.getDay();
	context.advent4Date = context.christmasDayOfWeek == 0 ? 
		addDays(context.christmasDate, -7) : 
		addDays(context.christmasDate, -1 * context.christmasDayOfWeek);
	context.advent1Date = addDays(context.advent4Date, -21);

	//
	// Advent
	//

	addMassDate("http://jude.org/ns-missal/advent/1st+Week+of+Advent/Sunday/" + context.sundayCycle, context, context.advent1Date);
	addMassDate("http://jude.org/ns-missal/advent/1st+Week+of+Advent/Monday", context, addDays(context.advent1Date, 1));
	addMassDate("http://jude.org/ns-missal/advent/1st+Week+of+Advent/Tuesday", context, addDays(context.advent1Date, 2));
	addMassDate("http://jude.org/ns-missal/advent/1st+Week+of+Advent/Wednesday", context, addDays(context.advent1Date, 3));
 	addMassDate("http://jude.org/ns-missal/advent/1st+Week+of+Advent/Thursday", context, addDays(context.advent1Date, 4));
 	addMassDate("http://jude.org/ns-missal/advent/1st+Week+of+Advent/Friday", context, addDays(context.advent1Date, 5));
	addMassDate("http://jude.org/ns-missal/advent/1st+Week+of+Advent/Saturday", context, addDays(context.advent1Date, 6));
	addMassDate("http://jude.org/ns-missal/advent/2nd+Week+of+Advent/Sunday/" + context.sundayCycle, context, addDays(context.advent1Date, 7));
	addMassDate("http://jude.org/ns-missal/advent/2nd+Week+of+Advent/Monday", context, addDays(context.advent1Date, 8));
	addMassDate("http://jude.org/ns-missal/advent/2nd+Week+of+Advent/Tuesday", context, addDays(context.advent1Date, 9));
	addMassDate("http://jude.org/ns-missal/advent/2nd+Week+of+Advent/Wednesday", context, addDays(context.advent1Date, 10));
	addMassDate("http://jude.org/ns-missal/advent/2nd+Week+of+Advent/Thursday", context, addDays(context.advent1Date, 11));
	addMassDate("http://jude.org/ns-missal/advent/2nd+Week+of+Advent/Friday", context, addDays(context.advent1Date, 12));
	addMassDate("http://jude.org/ns-missal/advent/2nd+Week+of+Advent/Saturday", context, addDays(context.advent1Date, 13));

	addMassDate("http://jude.org/ns-missal/advent/3rd+Week+of+Advent/Sunday/" + context.sundayCycle, context, addDays(context.advent1Date, 14));

	addMassDate("http://jude.org/ns-missal/advent/4th+Week+of+Advent/Sunday/" + context.sundayCycle, context, context.advent4Date);

	// Use masses for 17-24 for weekdays
	var dec17 = getDate(context.adventYear, 12, 17);
	if (getDayOfWeek(dec17) > 0) addMassDate("http://jude.org/ns-missal/advent/4th+Week+of+Advent/Dec+17", context, dec17);
	var dec18 = getDate(context.adventYear, 12, 18);
	if (getDayOfWeek(dec18) > 0) addMassDate("http://jude.org/ns-missal/advent/4th+Week+of+Advent/Dec+18", context, dec18);
	var dec19 = getDate(context.adventYear, 12, 19);
	if (getDayOfWeek(dec19) > 0) addMassDate("http://jude.org/ns-missal/advent/4th+Week+of+Advent/Dec+19", context, dec19);
	var dec20 = getDate(context.adventYear, 12, 20);
	if (getDayOfWeek(dec20) > 0) addMassDate("http://jude.org/ns-missal/advent/4th+Week+of+Advent/Dec+20", context, dec20);
	var dec21 = getDate(context.adventYear, 12, 21);
	if (getDayOfWeek(dec21) > 0) addMassDate("http://jude.org/ns-missal/advent/4th+Week+of+Advent/Dec+21", context, dec21);
	var dec22 = getDate(context.adventYear, 12, 22);
	if (getDayOfWeek(dec22) > 0) addMassDate("http://jude.org/ns-missal/advent/4th+Week+of+Advent/Dec+22", context, dec22);
	var dec23 = getDate(context.adventYear, 12, 23);
	if (getDayOfWeek(dec23) > 0) addMassDate("http://jude.org/ns-missal/advent/4th+Week+of+Advent/Dec+23", context, dec23);
	var dec24 = getDate(context.adventYear, 12, 24);
	if (getDayOfWeek(dec24) > 0) addMassDate("http://jude.org/ns-missal/advent/4th+Week+of+Advent/Dec+24+morning", context, dec24);

	// the 3rd week of advent; use masses 16th or earlier
	var advent3Mon = addDays(context.advent1Date, 15);
	if (getDayOfMonth(advent3Mon) <= 16) addMassDate("http://jude.org/ns-missal/advent/3rd+Week+of+Advent/Monday", context, advent3Mon);
	var advent3Tue = addDays(context.advent1Date, 16);
	if (getDayOfMonth(advent3Tue) <= 16) addMassDate("http://jude.org/ns-missal/advent/3rd+Week+of+Advent/Tuesday", context, advent3Tue);
	var advent3Wed = addDays(context.advent1Date, 17);
	if (getDayOfMonth(advent3Wed) <= 16) addMassDate("http://jude.org/ns-missal/advent/3rd+Week+of+Advent/Wednesday", context, advent3Wed);
	var advent3Thu = addDays(context.advent1Date, 18);
	if (getDayOfMonth(advent3Thu) <= 16) addMassDate("http://jude.org/ns-missal/advent/3rd+Week+of+Advent/Thursday", context, advent3Thu);
	var advent3Fri = addDays(context.advent1Date, 19);
	if (getDayOfMonth(advent3Fri) <= 16) addMassDate("http://jude.org/ns-missal/advent/3rd+Week+of+Advent/Friday", context, advent3Fri);

	//
	// Christmas 
	//

	addMassDate("http://jude.org/ns-missal/christmas/Nativity", context, context.christmasDate);
	addMassDate("http://jude.org/ns-missal/christmas/Jan+1+Mary+Mother+of+God", context, 1, 1);

	if (context.christmasDayOfWeek == 0) {
		addMassDate("http://jude.org/ns-missal/christmas/Holy+Family/" + context.sundayCycle, context, 12, 30);
		context.epiphanyDate = addDays(context.christmasDate, 14);
		addMassDate("http://jude.org/ns-missal/christmas/Epiphany", context, context.epiphanyDate);
	} else {
		addMassDate("http://jude.org/ns-missal/christmas/Holy+Family/" + context.sundayCycle, context, addDays(context.advent4Date, 7));
		context.epiphanyDate  = addDays(context.advent4Date, 14);
		addMassDate("http://jude.org/ns-missal/christmas/Epiphany", context, context.epiphanyDate);
		addMassDate("http://jude.org/ns-missal/christmas/Dec+30+6th+Day+Octave", context, 12, 30);
	}

	var octave29 = getDate(context.adventYear, 12, 29);
	if (getDayOfWeek(octave29) > 0) addMassDate("http://jude.org/ns-missal/christmas/Dec+29+5th+Day+Octave", context, octave29);
	var octave31 = getDate(context.adventYear, 12, 31);
	if (getDayOfWeek(octave31) > 0) addMassDate("http://jude.org/ns-missal/christmas/Dec+31+7th+Day+Octave", context, octave31);

	context.epiphanyDayOfMonth = getDayOfMonth(context.epiphanyDate);
	if (context.epiphanyDayOfMonth < 7) context.baptismDate = addDays(context.epiphanyDate, 7);
	else context.baptismDate = addDays(context.epiphanyDate, 1);
	addMassDate("http://jude.org/ns-missal/christmas/Baptism+of+the+Lord/" + context.sundayCycle, context, context.baptismDate);

	// before epiphany
	var jan2 = getDate(context.easterYear, 1, 2); 
	if (context.epiphanyDayOfMonth > 2 && getDayOfMonth(jan2) > 0) addMassDate("http://jude.org/ns-missal/christmas/Jan+2", context, jan2);
	var jan3 = getDate(context.easterYear, 1, 3); 
	if (context.epiphanyDayOfMonth> 3 && getDayOfMonth(jan3) > 0) addMassDate("http://jude.org/ns-missal/christmas/Jan+3", context, jan3);
	var jan4 = getDate(context.easterYear, 1, 4); 
	if (context.epiphanyDayOfMonth > 4 && getDayOfMonth(jan4) > 0) addMassDate("http://jude.org/ns-missal/christmas/Jan+4", context, jan4);
	var jan5 = getDate(context.easterYear, 1, 5); 
	if (context.epiphanyDayOfMonth > 5 && getDayOfMonth(jan5) > 0) addMassDate("http://jude.org/ns-missal/christmas/Jan+5", context, jan5);
	var jan6 = getDate(context.easterYear, 1, 6); 
	if (context.epiphanyDayOfMonth > 6 && getDayOfMonth(jan6) > 0) addMassDate("http://jude.org/ns-missal/christmas/Jan+6", context, jan6);
	var jan7 = getDate(context.easterYear, 1, 7); 
	if (context.epiphanyDayOfMonth > 7 && getDayOfMonth(jan7) > 0) addMassDate("http://jude.org/ns-missal/christmas/Jan+7+before+epiphany", context, jan7);

    // after epiphany (but before baptism)
    if (context.epiphanyDayOfMonth < 7) {
		addMassDate("http://jude.org/ns-missal/christmas/Monday+After+Epiphany+or+Jan+7", context, addDays(context.epiphanyDate, 1));
		addMassDate("http://jude.org/ns-missal/christmas/Tuesday+After+Epiphany+or+Jan+8", context, addDays(context.epiphanyDate, 2));
		addMassDate("http://jude.org/ns-missal/christmas/Wednesday+After+Epiphany+or+Jan+9", context, addDays(context.epiphanyDate, 3));
		addMassDate("http://jude.org/ns-missal/christmas/Thursday+After+Epiphany+or+Jan+10", context, addDays(context.epiphanyDate, 4));
		addMassDate("http://jude.org/ns-missal/christmas/Friday+After+Epiphany+or+Jan+11", context, addDays(context.epiphanyDate, 5));
		addMassDate("http://jude.org/ns-missal/christmas/Saturday+After+Epiphany+or+Jan+12", context, addDays(context.epiphanyDate, 6));
    }

    //
    // Lent
    //

    context.ashWednesdayDate = addDays(context.easterDate, -46);
	addMassDate("http://jude.org/ns-missal/lent/Ash+Wednesday",context, context.ashWednesdayDate);
	addMassDate("http://jude.org/ns-missal/lent/Thursday+after+Ash+Wednesday",context, addDays(context.easterDate, -45));
	addMassDate("http://jude.org/ns-missal/lent/Friday+after+Ash+Wednesday",context, addDays(context.easterDate, -44));
	addMassDate("http://jude.org/ns-missal/lent/Saturday+after+Ash+Wednesday",context, addDays(context.easterDate, -43));

	var week1 = 1; 
	var week2 = 5;
	var days =  ["Sunday/" + context.sundayCycle, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var startPos = -42;
	for (var we = week1; we <= week2; we++) {
		for (da = 0; da < days.length; da++) {
			addMassDate("http://jude.org/ns-missal/lent/" + ith(we) + "+Week+of+Lent/" + days[da],context, addDays(context.easterDate, startPos));
			startPos++;
		}
	}

	addMassDate("http://jude.org/ns-missal/lent/Palm+Sunday/Mass/" + context.sundayCycle,context, addDays(context.easterDate, -7));
	addMassDate("http://jude.org/ns-missal/lent/Monday+of+Holy+Week",context, addDays(context.easterDate, -6));
	addMassDate("http://jude.org/ns-missal/lent/Tuesday+of+Holy+Week",context, addDays(context.easterDate, -5));
	addMassDate("http://jude.org/ns-missal/lent/Wednesday+of+Holy+Week",context, addDays(context.easterDate, -4));
	addMassDate("http://jude.org/ns-missal/lent/Thursday+Chrism+Mass",context, addDays(context.easterDate, -3));
	addMassDate("http://jude.org/ns-missal/triduum/Thursday+of+the+Lords+Supper",context, addDays(context.easterDate, -3));
	addMassDate("http://jude.org/ns-missal/triduum/Good+Friday",context, addDays(context.easterDate, -2));
	addMassDate("http://jude.org/ns-missal/triduum/Easter+Vigil",context, addDays(context.easterDate, -1));

    //
    // Easter
    //

	addMassDate("http://jude.org/ns-missal/easter/Easter/Easter+Sunday",context, context.easterDate);
 	addMassDate("http://jude.org/ns-missal/easter/Easter/Monday+Within+Easter+Octave", context, addDays(context.easterDate, 1));
  	addMassDate("http://jude.org/ns-missal/easter/Easter/Tuesday+Within+Easter+Octave", context, addDays(context.easterDate, 2));
 	addMassDate("http://jude.org/ns-missal/easter/Easter/Wednesday+Within+Easter+Octave", context, addDays(context.easterDate, 3));
  	addMassDate("http://jude.org/ns-missal/easter/Easter/Thursday+Within+Easter+Octave", context, addDays(context.easterDate, 4));
 	addMassDate("http://jude.org/ns-missal/easter/Easter/Friday+Within+Easter+Octave", context, addDays(context.easterDate, 5));
 	addMassDate("http://jude.org/ns-missal/easter/Easter/Saturday+Within+Easter+Octave", context, addDays(context.easterDate, 6));

	week1 = 2; 
	week2 = 6;
	days =  ["Sunday/" + context.sundayCycle, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	startPos = 7;
	for (var we = week1; we <= week2; we++) {
		for (da = 0; da < days.length; da++) {
			addMassDate("http://jude.org/ns-missal/easter/" + ith(we) + "+Week+of+Easter/" + days[da],context, addDays(context.easterDate, startPos));
			startPos++;
		}
	}

	addMassDate("http://jude.org/ns-missal/easter/6th+Week+of+Easter/Ascension/Day/" + context.sundayCycle, context, addDays(context.easterDate, 42));
 	addMassDate("http://jude.org/ns-missal/easter/7th+Week+of+Easter/Monday", context, addDays(context.easterDate, 43));
 	addMassDate("http://jude.org/ns-missal/easter/7th+Week+of+Easter/Tuesday", context, addDays(context.easterDate, 44));
 	addMassDate("http://jude.org/ns-missal/easter/7th+Week+of+Easter/Wednesday", context, addDays(context.easterDate, 45));
 	addMassDate("http://jude.org/ns-missal/easter/7th+Week+of+Easter/Thursday", context, addDays(context.easterDate, 46));
 	addMassDate("http://jude.org/ns-missal/easter/7th+Week+of+Easter/Friday", context, addDays(context.easterDate, 47));
 	addMassDate("http://jude.org/ns-missal/easter/7th+Week+of+Easter/Saturday", context, addDays(context.easterDate, 48));

 	context.pentecostDate = addDays(context.easterDate, 49);
	addMassDate("http://jude.org/ns-missal/easter/7th+Week+of+Easter/Pentecost/Day/" + context.sundayCycle, context, context.pentecostDate);

	//
	// Ordinary 
	// Pre-lent: 1st starts after baptism; go as far as we can until ash wednesday
	// The farthest wa can go is 9
	// 
	context.baptismDayOfWeek = getDayOfWeek(context.baptismDate);
	var ordinaryZero = context.baptismDayOfWeek == 0 ? context.baptismDate : context.epiphanyDate;
	if (context.baptismDayOfWeek == 0) addMassDate("http://jude.org/ns-missal/ordinary/1st+Week+in+Ordinary+Time/Monday/" + context.weekdayCycle, context, addDays(ordinaryZero, 1));
	addMassDate("http://jude.org/ns-missal/ordinary/1st+Week+in+Ordinary+Time/Tuesday/" + context.weekdayCycle, context, addDays(ordinaryZero, 2));
	addMassDate("http://jude.org/ns-missal/ordinary/1st+Week+in+Ordinary+Time/Wednesday/" + context.weekdayCycle, context, addDays(ordinaryZero, 3));
	addMassDate("http://jude.org/ns-missal/ordinary/1st+Week+in+Ordinary+Time/Thursday/" + context.weekdayCycle, context, addDays(ordinaryZero, 4));
	addMassDate("http://jude.org/ns-missal/ordinary/1st+Week+in+Ordinary+Time/Friday/" + context.weekdayCycle, context, addDays(ordinaryZero, 5));
	addMassDate("http://jude.org/ns-missal/ordinary/1st+Week+in+Ordinary+Time/Saturday/" + context.weekdayCycle, context, addDays(ordinaryZero, 6));

	startPos = 7;
	week1 = 2; 
	week2 = 9;
	days = ["Sunday/" + context.sundayCycle, "Monday/" + context.weekdayCycle, "Tuesday/" + context.weekdayCycle,
		"Wednesday/" + context.weekdayCycle, "Thursday/" + context.weekdayCycle, "Friday/" + context.weekdayCycle, 
		"Saturday/" + context.weekdayCycle];
	var endOrdinaryTime1 = false;
	for (var we = week1; we <= week2 && endOrdinaryTime1 == false; we++) {
		for (da = 0; da < days.length && endOrdinaryTime1 == false; da++) {
			var d = addDays(ordinaryZero, startPos);
			startPos++;
			if (compareDates(d, context.ashWednesdayDate) < 0) {
				addMassDate("http://jude.org/ns-missal/ordinary/" + ith(we) + "+Week+in+Ordinary+Time/" + days[da], context, d);
			}
			else {
				endOrdinaryTime1 = true;
				break;
			}
		}
	}

	// 
	// Ordinary
	// Post-easter: End at 34th; where do we start? - work backwards from 34th
	//

	addMassDate("http://jude.org/ns-missal/ordinary/Christ+the+King/" + context.sundayCycle, context, addDays(context.firstDayNextYear, -7));
	addMassDate("http://jude.org/ns-missal/ordinary/34th+Week+in+Ordinary+Time/Monday/" + context.weekdayCycle, context, addDays(context.firstDayNextYear, -6));
	addMassDate("http://jude.org/ns-missal/ordinary/34th+Week+in+Ordinary+Time/Tuesday/" + context.weekdayCycle, context, addDays(context.firstDayNextYear, -5));
	addMassDate("http://jude.org/ns-missal/ordinary/34th+Week+in+Ordinary+Time/Wednesday/" + context.weekdayCycle, context, addDays(context.firstDayNextYear, -4));
	addMassDate("http://jude.org/ns-missal/ordinary/34th+Week+in+Ordinary+Time/Thursday/" + context.weekdayCycle, context, addDays(context.firstDayNextYear, -3));
	addMassDate("http://jude.org/ns-missal/ordinary/34th+Week+in+Ordinary+Time/Friday/" + context.weekdayCycle, context, addDays(context.firstDayNextYear, -2));
	addMassDate("http://jude.org/ns-missal/ordinary/34th+Week+in+Ordinary+Time/Saturday/" + context.weekdayCycle, context, addDays(context.firstDayNextYear, -1));

	context.trinityDate = addDays(context.pentecostDate, 7);
	context.bodyBloodDate = addDays(context.pentecostDate, 14);
	context.sacredHeartDate = addDays(context.bodyBloodDate, 5);
	addMassDate("http://jude.org/ns-missal/ordinary/Most+Holy+Trinity/" + context.sundayCycle, context, context.trinityDate);
	addMassDate("http://jude.org/ns-missal/ordinary/Most+Holy+Body+and+Blood+of+Christ/" + context.sundayCycle, context, context.bodyBloodDate);
	addMassDate("http://jude.org/ns-missal/ordinary/Most+Sacred+Heart+of+Jesus/" + context.sundayCycle, context, context.sacredHeartDate);

	week2 = 33;
	week1 = 6;
	var startWeekPos = -14;
	var hitPentecost = false;
	for (var we = week2; we >= week1 && hitPentecost == false; we--) {
		for (da = 0; da < days.length; da++) {
			var d = addDays(ordinaryZero, startWeekPos + da);
			if (compareDates(d, context.pentecostDate) == 0) hitPentecost = true;
			else if (compareDates(d, context.trinityDate) == 0 || 
				compareDates(d, context.bodyBloodDate) == 0 || 
				compareDates(d, context.trinityDate) == 0) {
				// already got these; skip
			}
			else {
				addMassDate("http://jude.org/ns-missal/ordinary/" + ith(we) + "+Week+in+Ordinary+Time/" + days[da], context, d);
			}
		}
		startWeekPos -= 7;
	}

	//
	// Saints
	//

	addMassDate("http://jude.org/ns-missal/saints/Conversion+of+St+Paul+the+Apostle",context, 1, 25);
	addMassDate("http://jude.org/ns-missal/saints/Presentation+of+the+Lord",context, 2, 2);
	addMassDate("http://jude.org/ns-missal/saints/Chair+of+St+Peter+the+Apostle", context, 2, 22);
	addMassDate("http://jude.org/ns-missal/saints/St+Joseph+Spouse+of+the+Blessed+Virgin+Mary",context, 3, 19);
	addMassDate("http://jude.org/ns-missal/saints/Annunication+of+the+Lord", context, 3, 25);
	addMassDate("http://jude.org/ns-missal/saints/St+Mark+Evangelist",context, 4, 25);
	addMassDate("http://jude.org/ns-missal/saints/Sts+Philip+and+James+Apostles", context, 5, 3);
	addMassDate("http://jude.org/ns-missal/saints/St+Matthias+Apostle", context, 5, 14);
	addMassDate("http://jude.org/ns-missal/saints/Visitation+of+the+Blessed+Virgin+Mary", context, 5, 31);
	addMassDate("http://jude.org/ns-missal/saints/Nativity+of+St+John+the+Baptist", context, 6, 24);
	addMassDate("http://jude.org/ns-missal/saints/Sts+Peter+and+Paul+Apostles", context, 6, 29);
	addMassDate("http://jude.org/ns-missal/saints/St+Thomas+Apostle", context, 7, 3);
	addMassDate("http://jude.org/ns-missal/saints/St+James+Apostle", context, 7, 25);
	addMassDate("http://jude.org/ns-missal/saints/Transfiguration+of+the+Lord", context, 8, 6);
	addMassDate("http://jude.org/ns-missal/saints/St+Lawrence+Deacon+and+Martyr", context, 8, 10);
	addMassDate("http://jude.org/ns-missal/saints/Assumption+of+the+Blessed+Virgin+Mary", context, 8, 15);
	addMassDate("http://jude.org/ns-missal/saints/St+Bartholemew+Apostle", context, 8, 24);
	addMassDate("http://jude.org/ns-missal/saints/Nativity+of+the+Blessed+Virgin+Mary", context, 9, 8);
	addMassDate("http://jude.org/ns-missal/saints/Exaltation+of+the+Holy+Cross", context, 9, 14);
	addMassDate("http://jude.org/ns-missal/saints/Sts+Michael+Gabriel+and+Raphael+Archangels", context, 9, 29);
	addMassDate("http://jude.org/ns-missal/saints/St+Matthew+Apostle+and+Evagelist", context, 9, 21);
	addMassDate("http://jude.org/ns-missal/saints/St+Luke+Evangelist", context, 10, 18);
	addMassDate("http://jude.org/ns-missal/saints/Sts+Simon+and+Jude+Apostles", context, 10, 28);
	addMassDate("http://jude.org/ns-missal/saints/All+Saints", context, 11, 1);
    addMassDate("http://jude.org/ns-missal/saints/All+Souls", context, 11, 2);
	addMassDate("http://jude.org/ns-missal/saints/Dedication+of+Lateran+Basilica", context, 11, 9);
	addMassDate("http://jude.org/ns-missal/saints/St+Andrew+Apostle", context, 11, 30);
	addMassDate("http://jude.org/ns-missal/saints/Immaculate+Conception+of+the+Blessed+Virgin+Mary", context, 12, 8);
	addMassDate("http://jude.org/ns-missal/saints/Our+Lady+of+Guadalupe", context, 12 ,12);
	addMassDate("http://jude.org/ns-missal/saints/St+Stephen", context, 12, 26);
	addMassDate("http://jude.org/ns-missal/saints/St+John+the+Apostle+and+Evangelist",context, 12, 27);
	addMassDate("http://jude.org/ns-missal/saints/Holy+Innocents+Martyrs", context, 12, 28);

	return context;
}

module.exports = {
  buildCalendar: buildCalendar
};
