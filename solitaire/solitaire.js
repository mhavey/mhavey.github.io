/*
Game variables 
*/

// TODO
// 1. I can move a non-king onto a face down card. 
// workerPiles 0 10 workerPiles 1 0
//solitaire.js:250 passed dest card is on bottom
//solitaire.js:250 passed worker piles must be different
//solitaire.js:250 passed source worker card must be faceup
//solitaire.js:250 passed if dest card is face down/drop card, source card must be king
//solitaire.js:250 passed drop must be different color
//solitaire.js:250 passed if dest card is face up, source card must be one less in kind


// THe state of the game in these arrays
var deck = [];
var freeCards = []; // 3 cards
var suitPiles = []; // stack of suit
var workerPiles = []; // 7xN

// suits, kinds, associated functions
var suits = ["H","D","S","C"];
var kinds = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

// return color of card given its suit
function color(suitIdx) {
	if (suitIdx < 2) return "red"; else return "black";
}

// build HTML text of card face
function suitString(suit) {
	if (suit == "D") return "&diams;";
	if (suit == "H") return "&hearts;";
	if (suit == "S") return "&spades;";
	if (suit == "C") return "&clubs;";
	if (suit == "") return ""; // if no suit
	throw "illegal suit " + suit; // if invalid suit
}

/*
 * Game state and rules
 */

function setupGame() {

	document.getElementById("cheat").checked=false;

	// build the deck
	deck = [];
	freeCards = [];

	for (var s = 0; s < suits.length; s++) {
		var suit = suits[s];
		for (var k = 0; k < kinds.length; k++) {
			var kind = kinds[k];
			deck.push({
				dropCard: false,
				faceUp:true,
				suit:suit,
				kind:kind, 
				card:kind+suit, 
				color:color(s),
				kindIdx:k,
				position: Math.random()}
				);
		}
	}

	// shuffle
	deck.sort(function (c1,c2) { 
		if (c1.position < c2.position) return -1; 
		else if (c1.position > c2.position) return 1; 
		return 0;
	});

	// build and draw the worker piles
	for (var i = 0; i < 7; i++) {
		workerPiles[i] = deck.slice(i*7, (i+1)*7);
		for (var j = 0; j < 7; j++) {
			workerPiles[i][j].faceUp = i <= j;
		}
		drawWorkerPile(i);
	}

	// build and the suit piles; initially each card is a "drop" card
	for (var i = 0; i < 4; i++) {
		suitPiles[i] = [];
		drawSuitPile(i);
	}

	// build and the free cards
	freeCards = deck.slice(49,52);
	for (var i = 0; i < freeCards.length; i++) {
		freeCards[i].sourceType = "freeCards";
		freeCards[i].sourceX = i;
		freeCards[i].sourceY = -1;
		freeCards[i].draggable = true;
		freeCards[i].droppable = false;
		freeCards[i].flippable = false;
		document.getElementById("freeCardsTable").rows[0].cells[i].innerHTML = drawCard(freeCards[i]);
	}
}

// return true if game is won, false otherwise
function gameIsWon() {
	for (var i = 0; i < 4; i++) {
		if (suitPiles[i][suitPiles[i].length-1].kind != "K") return false;
	}

	return true;
}

// handler to process flip move
function flip(sourceX, sourceY) {

	// checks
	checkRule("bottom", sourceY == workerPiles[sourceX].length - 1);
	var card = workerPiles[sourceX][sourceY];
	checkRule("face down", card.faceUp == false);

	// actions
	card.faceUp = true;
	drawWorkerPile(sourceX);
}

// handler to process the move from free/suit,worker/suit,
function dropSuitPile(destX,destY,isDropCard, sourceType,sourceX,sourceY) {

	// checks
	var destCard = null;
	if (isDropCard == false) {
		destCard = suitPiles[destX][suitPiles[destX].length-1];
	}
	var sourceCard; 
	if (sourceType == "freeCards") {
		sourceCard = freeCards[sourceX];
	}
	else if (sourceType == "workerPiles") {
		sourceCard = workerPiles[sourceX][sourceY];
		checkRule("worker card must be bottom and face up", 
			sourceY == workerPiles[sourceX].length - 1 && sourceCard.faceUp == true,
			[sourceCard]);
	}
	else ("illegal source type *" + sourceType + "*", true);

	checkRule("source must be same suit", sourceCard.suit == suits[destX], [sourceCard,destCard]);
	checkRule("source must be one greater in kind", (isDropCard==true && sourceCard.kind=='A') 
		|| (isDropCard==false && sourceCard.kindIdx==destCard.kindIdx + 1), 
		[sourceCard,destCard]);

	// actions
	if (sourceType == "freeCards") {
		removeFreeCard(sourceX);
	}
	else if (sourceType == "workerPiles") {
		// remove the bottom
		sourceCard = workerPiles[sourceX].pop();
		drawWorkerPile(sourceX);
	}
	else ("illegal source type *" + sourceType + "*", true);
	suitPiles[destX].push(sourceCard);
	drawSuitPile(destX);
}

// handler to process the move from free/worker, suit/worker, worker/worker
function dropWorkerPile(destX,destY,isDropCard,sourceType,sourceX,sourceY) {

	var cheatAllowed = document.getElementById("cheat").checked;

	// checks
	checkRule("dest card is on bottom", isDropCard == true || destY == workerPiles[destX].length - 1);

	var destCard = null;
	if (isDropCard != null) {
		destCard = workerPiles[destX][destY];
	}

	var sourceCard; 
	if (sourceType == "freeCards") {
		sourceCard = freeCards[sourceX];
	}
	else if (sourceType == "workerPiles") {
		sourceCard = workerPiles[sourceX][sourceY];
		checkRule("worker piles must be different", sourceX != destX, [sourceCard,destCard]);
		checkRule("source worker card must be faceup", sourceCard.faceUp == true, [sourceCard]);
	}
	else if (sourceType == "suitPiles") {
		sourceCard = suitPiles[sourceX][(suitPiles[sourceX].length)-1];
	}
	else ("illegal source type *" + sourceType + "*", true);

	var r1 = checkRule("if dest card is face down/drop card, source card must be king",
		!(isDropCard == true || destCard.faceUp == false) || sourceCard.kind == "K", [sourceCard,destCard], cheatAllowed);
	var r2 = checkRule("drop must be different color", isDropCard==true || destCard.faceUp == false || 
		(sourceCard.color != destCard.color), [sourceCard,destCard], cheatAllowed);
	var r3 = checkRule("if dest card is face up, source card must be one less in kind", 
		!(isDropCard == false && destCard.faceUp==true)
		|| (sourceCard.kind=='K' && destCard.kind=='A') 
		|| sourceCard.kindIdx == destCard.kindIdx - 1, 
		[sourceCard,destCard], cheatAllowed);

	if (r1 == "cheat" || r2 == "cheat" || r3 == "cheat") {
		if (confirm("This is totally a cheat. You got this far because you checked the cheat box. Click OK to go ahead with this invalid move.")) {
			console.log("allowed cheat");
		}
	}

	// action
	var cardsToAdd = [sourceCard];
	if (sourceType == "freeCards") {
		removeFreeCard(sourceX);
	}
	else if (sourceType == "workerPiles") {
		var len = workerPiles[sourceX].length;
		cardsToAdd = workerPiles[sourceX].splice(sourceY, len);
		if (sourceY == 0) {
			workerPiles[sourceX] = [];
		}
		else {
			workerPiles[sourceX] = workerPiles[sourceX].splice(0, sourceY);
		}
		drawWorkerPile(sourceX);
	}
	else if (sourceType == "suitPiles") {
		suitPiles[sourceX].pop();
		drawSuitPile(sourceX);
	}
	else ("illegal source type *" + sourceType + "*", true);

	for (var i = 0; i < cardsToAdd.length; i++) {
		workerPiles[destX].push(cardsToAdd[i]);
	}
	drawWorkerPile(destX);
}


// / do rule check for move/flip
function checkRule(message, rule, cards, cheatAllowed) {
	var cardStr = "";
	if (cards) {
		cardStr = JSON.stringify(cards);
	}
	if (rule != true) {
		if (cheatAllowed && cheatAllowed == true) {
			console.log("cheat " + message);
			return "cheat";
		}
		throw "Failed rule: " + message + " cards " + cardStr;			
	}
	else {
		console.log("passed " + message);
		return "pass";
	}
}

/*
 * Rendering
 */

// render HTML for given card
function drawCard(card) {
	var text = "";
	var textColor = "black";
	var color="white";
	if (card.faceUp == true || card.dropCard == true) {
		var text = card.kind + suitString(card.suit);
		var color = card.color;
		var textColor = "white";
	}
	else if (card.faceUp == false) {
		color="blue";	
	}

	var dragText = "";
	var dropText = "";
	var flipText = "";
	if (card.draggable == true) {
		dragText = 'draggable="true" id="' + card.card + 
		'" ondragstart="drag(event,' + "'" + card.sourceType + "'," + card.sourceX + "," + card.sourceY + ");" + '"';
	}
	if (card.droppable == true) {
		dropText = 'ondrop="drop(event,' + "'" + card.sourceType + "'," + card.sourceX + "," + card.sourceY + ',' + card.dropCard + ');" ondragover="allowDrop(event)"';
	}
	if (card.flippable == true) {
		flipText = 'onclick="flip(' + card.sourceX + "," + card.sourceY + ");" + '"';
	}

	// here she is; isn't she pretty?
	var dhtml = '<div ' + flipText + ' ' + dragText + ' ' + dropText 
		+ ' style="width:35px;height:35px;border:1px solid black;color:' 
		+ textColor + ';background-color:' + color + ';">'
		+ text + '</div>';
	return dhtml;
}

function drawSuitPile(i) {

	var suitPilesCells = document.getElementById("suitPilesTable").rows[0].cells;

	// if list is empty, need a placeholder for drop
	if (suitPiles[i].length == 0) {
		var dropCard = {
			dropCard: true, 
			kind: "Drop ",
			suit: suits[i], 
			color:color(i), 
			kindIdx: -1, 
			draggable: false,
			droppable: true,
			flippable: false,
			sourceType: "suitPiles", 
			sourceX: i, 
			sourceY: -1
		} ;
		suitPilesCells[i].innerHTML = drawCard(dropCard);
		return;
	}

	// Top card is special
	var lastCard = suitPiles[i].length - 1;
	suitPiles[i][lastCard].flippable = false;
	suitPiles[i][lastCard].droppable = true;
	suitPiles[i][lastCard].draggle = true;

	// reseq the deck; might not be needed
	for (var j = 0; j< suitPiles[i].length; j++) {
		suitPiles[i][j].sourceType = "suitPiles";
		suitPiles[i][j].sourceX = i;
		suitPiles[i][j].sourceY = j; 
	}
	suitPilesCells[i].innerHTML=drawCard(suitPiles[i][lastCard]);
}

// redraw worker pile given
function drawWorkerPile(pile) {

	var workerCells =  document.getElementById("workerPilesTable").rows[0].cells;

	// if list is empty, need a placeholder for drop
	if (workerPiles[pile].length == 0) {
		var dropCard = '<div>' + drawCard({
			dropCard: true, 
			faceUp: false, // Drop card is considered face down
			kind: "Drop",
			suit: "", 
			color: "black", 
			kindIdx: -1, 
			sourceType: "workerPiles", 
			sourceX: pile, 
			sourceY: 0,
			droppable: true,
			draggable: false,
			flippable: false
		}) + "</div>";
		workerCells[pile].innerHTML = dropCard;
		return;
	}

	// draw what is given
	var cellContent = '<div>'; 
	for (var i = 0; i < workerPiles[pile].length; i++) {
		// here is where we decide flippable, draggable, droppable
		workerPiles[pile][i].sourceType = "workerPiles";
		workerPiles[pile][i].sourceX = pile;
		workerPiles[pile][i].sourceY = i;
		workerPiles[pile][i].draggable = workerPiles[pile][i].faceUp;
		workerPiles[pile][i].droppable = (i == workerPiles[pile].length -1);
		workerPiles[pile][i].flippable = workerPiles[pile][i].droppable==true && workerPiles[pile][i].faceUp==false;
		cellContent += drawCard(workerPiles[pile][i]);
	}
	cellContent += "</div>";
	workerCells[pile].innerHTML = cellContent;
}

// redraw free card as blank once it's been played from free pile
function removeFreeCard(i) {
	document.getElementById("freeCardsTable").rows[0].cells[i].innerHTML = drawCard({
		color:"white",
		card:"",
		suit:"",
		kind:"",
		draggable: false,
		droppable:false,
		flippable:false});
}

/*
 * UI event handlers
 */

// handler to allow drop
function allowDrop(event) {
	event.preventDefault();
}

// handler to initiate drag
function drag(event, sourceType, sourceX, sourceY) {
	event.dataTransfer.setData("sourceType", sourceType);
	event.dataTransfer.setData("sourceX", sourceX);	
	event.dataTransfer.setData("sourceY", sourceY);	
}

// handler to process the move from free/suit, free/worker, worker/suit,
// suit/worker, worker/worker
function drop(event, destType, destX, destY, isDropCard) {
	event.preventDefault();
	var sourceType = event.dataTransfer.getData("sourceType");
	var sourceX = parseInt(event.dataTransfer.getData("sourceX"));
	var sourceY = parseInt(event.dataTransfer.getData("sourceY"));
	console.log(sourceType + " " + sourceX + " " + sourceY + " " + destType + " " + destX + " " + destY);

	if (destType == "suitPiles") {
		dropSuitPile(destX,destY,isDropCard,sourceType,sourceX,sourceY);			
	}
	else if (destType == "workerPiles") {
		dropWorkerPile(destX,destY,isDropCard,sourceType,sourceX,sourceY);
	}
	else {
		checkRule("illegal drop dest *" + destType + "*", true);	
	}

	// IT IS ONLY a drop that can win the game
	if (gameIsWon() == true) {
		alert("YOU WON!!!");
	}
}	
