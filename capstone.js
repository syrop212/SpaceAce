var mouse = {x: 0, y: 0}

var score = 0

var scoreText = makeText("-", 690, 50, 25, "sans-serif", "white", 1)
var scoreText2 = makeText("Score: ", 600, 50, 25, "sans-serif", "white", 1)

var player = makeImage("images/raiser.png",10, 50, 150, 150, 1)

var enemies =[]

var powerups = []

var missiles = []
var gameOver = false

function drawPlayer(){
    setX(player, mouse.x)
    setY(player, mouse.y)
}

function drawEverything() {
    drawPlayer()
    drawEnemies()
    drawMissle()
    checkCollisionsPlayer()
    checkCollisionsMissiles()
    if(gameOver == false){
       requestAnimationFrame(drawEverything)
    }
}

function makeEnemies() {
    var enemy = makeImage("images/destroyah.gif", 850, random(10,200), 100, 100, 1)
    enemies.push(enemy)
    setTimeout(makeEnemies, 1000)
}

function drawEnemies() {
    for(var i = 0; i < enemies.length; i++){
        if(getX(enemies[i]) > -100) {
        move(enemies[i], -3, 0)
        }
        else {
         setX(enemies[i], 850)
         setY(enemies[i], random(0, 500))
        }
    }
} 

function fireMIssile(e) {
    if(e.keyCode == 68){
    var beamx = getX(player) + 150 - 5
    var beamy = getY(player) + 150/2
    var beam = makeRect(beamx, beamy, 50, 5, "lime", 1)
    missiles.push(beam)
    }
}

document.addEventListener("keydown", fireMIssile)


function drawMissle() {
    for(var i = 0; i < missiles.length; i++) {
        move(missiles[i], 20, 0)
        }
    setTimeout(drawMissle, 0000)
    }

function checkCollisionsPlayer() {
   for(var i = 0; i < enemies.length; i++){
        if(collide(player, enemies[i], 0, 0) == true){
            removeArrayElement(enemies, i)
            gameOverDisplay()
            gameOver = true
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