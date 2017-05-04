var mouse = {x: 0, y: 0}

var score = 0

var scoreText = makeText("-", 690, 50, 25, "sans-serif", "white", 1)
var scoreText2 = makeText("Score: ", 600, 50, 25, "sans-serif", "white", 1)

var player = makeImage("images/raiser.png",10, 50, 150, 150, 1)

var enemies =[]

var points = [10, 20, 30, 40]

var powerups = []

var missiles = []

var shot = []

var gameOver = false

var keyState = {};    
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

function drawPlayer(){
    setX(player, mouse.x)
    setY(player, mouse.y)
}

function drawEverything() {
    drawPlayer()
    drawEnemies()
    drawMissle()
    drawPowerUp()
    checkCollisionsPlayer()
    checkCollisionsMissiles()
    fireMIssile()
    if(gameOver == false){
       requestAnimationFrame(drawEverything)
    }
}

function makeEnemies() {
    var enemy = makeImage("images/destroyah.gif", 1000, random(50,200), 100, 100, 1)
    enemies.push(enemy)
    setTimeout(makeEnemies, 1000)
}

function drawEnemies() {
    var oldscore = score
    
    for(var i = 0; i < enemies.length; i++){
        if(getX(enemies[i]) > -100) {
            move(enemies[i], -3, 0)
            
          for(var j = 0; j < points.length; j++){    
           if(oldscore <= points[j]) {
                move(enemies[i], -oldscore*2 , 0)
                 }
          }
        }
        else {
         setX(enemies[i], 850)
         setY(enemies[i], random(0, 500))
        }
  }
}

function fireMIssile(e) {
    if(keyState[32]){
    var beamx = getX(player) + 150 - 5
    var beamy = getY(player) + 150/2
    var beam = makeRect(beamx, beamy, 50, 5, "lime", 1)
    
    missiles.push(beam)
    }
}

function drawMissle() {
    for(var i = 0; i < missiles.length; i++) {
       // for(var j = 0; shot.length; j++){
        move(missiles[i], 20,0)    
        //move(shot[j], 10, 0)
          //} 
        }
    }

function makePower(){
 var p = makeImage("images/Dust.png", 1000, random(10,500), 50, 50, 1) 
 var o = makeImage("images/daily.png", 1100, random(20, 400), 30, 30, 1)
 powerups.push(p, o)
 setTimeout(makePower, 3000)
}

function drawPowerUp() {
    for(var i = 0; i < powerups.length; i++) {
        if(getX(powerups[i]) > -100){
        move(powerups[i], -10, 0)
        }
        else {
         setX(powerups[i], 1000)
         setY(powerups[i], random(0, 500))
        }
        }
    }

function checkCollisionsPlayer() {
    var beamx = getX(player) + 150 - 5
    var beamy = getY(player) + 150/2
    
   for(var i = 0; i < enemies.length; i++){
        if(collide(player, enemies[i], 0, 0) == true){
            removeArrayElement(enemies, i)
            gameOverDisplay()
            gameOver = true
        }
     }
       for(var j = 0; j < powerups.length; j++){
           
        if(collide(player, powerups[j], 0, 0) == true){
            var beam2 = makeRect(beamx, beamy - 5, 80, 20, "red", 1)
           // var beam3 = makeRect(beamx, beamy - 10, 10, 95, "pink", 1)
            removeArrayElement(powerups, j)
            missiles.push(beam2)
            //shot.push(beam3)
        }
       }
  }
  


function checkCollisionsMissiles() {
 for (var i = 0; i < missiles.length; i++) {
   for (var j = 0; j < enemies.length; j++) {
     if (missiles[i] != undefined && enemies[j] != undefined) {
       if (collide(missiles[i], enemies[j], 0, -20) == true) {
         drawExplosion(getX(enemies[j]), getY(enemies[j]))
                removeArrayElement(missiles, i)
                removeArrayElement(enemies, j)
                score++
                scoreText.innerHTML = score
       }
     }
   }
 }
}

drawEverything()
makeEnemies()
makePower()