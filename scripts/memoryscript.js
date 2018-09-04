var memoryArray = ['<i class="fab fa-android"></i>','<i class="fab fa-android"></i>',
'<i class="fas fa-battery-full"></i>','<i class="fas fa-battery-full"></i>',
'<i class="fas fa-bomb"></i>','<i class="fas fa-bomb"></i>',
'<i class="fas fa-atom"></i>','<i class="fas fa-atom"></i>',
'<i class="fas fa-bug"></i>','<i class="fas fa-bug"></i>',
'<i class="fas fa-chess-rook"></i>','<i class="fas fa-chess-rook"></i>',
'<i class="fab fa-chrome"></i>','<i class="fab fa-chrome"></i>',
'<i class="fas fa-cogs"></i>','<i class="fas fa-cogs"></i>',
'<i class="fab fa-css3"></i>','<i class="fab fa-css3"></i>',
'<i class="fab fa-d-and-d"></i>','<i class="fab fa-d-and-d"></i>',
'<i class="fas fa-user-ninja"></i>','<i class="fas fa-user-ninja"></i>',
'<i class="fab fa-nintendo-switch"></i>','<i class="fab fa-nintendo-switch"></i>'];
//the memoryArray holds the deck

var memoryValues = [];//secondary array for holding the flipped cards for compare
var memoryTileIds = [];//holds ids when shuffled
var moveCounter = 0;//keeps track of flips as score
var secondflip = 0;//tracks if two moves have been made
var winCondition = 0;//tracking number of matches to detect win

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}//this is the Figher-Yates algorithm to shuffle or randomize arrays

//run startGame function on page onload
document.body.onload = startGame();

function startGame(){
  memoryArray = shuffle(memoryArray);//shuffle array
  moveCounter = 0;//reset moves
  gameboardDiv = document.getElementById("gameboard");
  memoryArray.forEach(addCards);
}

function addCards(item, index){
  gameboardDiv.innerHTML = gameboardDiv.innerHTML + '<div class="card" onclick="flipCard(this)">' + item + '</div>';
}

function flipCard(x){
  x.classList.add("flipped");//add the flipped class to the div
  moveCounter = moveCounter + 1 //add one to the move moveCounter
  scoreboardDiv = document.getElementById("score");
  scoreboardDiv.innerHTML = '' + moveCounter + '';
  if(memoryValues.indexOf(x.innerHTML) > -1) {//MATCH DETECTED
    setTimeout(matchDetected, 2000);
  }
  else if (secondflip == 1) {
    setTimeout(turnOver, 2000);//gives the player time to look at cards before flipping back
  }
  else {
    memoryValues.push(x.innerHTML);
    secondflip = secondflip + 1;
    console.log("No Match object pushed to array");
    console.log(memoryValues);
  }
}

function turnOver(){ //the seperated function for flipping cards back over that dont match
  console.log("not match. flipping cards back.");
  var els = document.querySelectorAll('.card.flipped');
  for (var i = 0; i < els.length; i++) {
    els[i].classList.remove('flipped');
  }
  secondflip = 0;
  memoryValues = [];
}

function matchDetected(){
  console.log("Match Detected");
  secondflip = 0
  memoryValues = [];
  winCondition = winCondition + 1
  var els = document.querySelectorAll('.card.flipped');
  for (var i = 0; i < els.length; i++) {
    els[i].classList.remove('flipped');
    els[i].classList.add('disabled');
    els[i].onclick = ""
  }
  if(winCondition >= 12){
    alert('Congratulations! You won in ' + moveCounter + ' moves! Refresh the page to try to beat your score!')
  }
}
