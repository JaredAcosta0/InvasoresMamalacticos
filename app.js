const grid = document.querySelector('.grid')
const resultados = document.querySelector('.results')
let disparador = 202
let width = 15
let direction = 1
let invadersId
let move = true
let alienEliminado = []
let results = 0

for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if(!alienEliminado.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader')
    }
  }
}

draw()

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader')
  }
}

squares[disparador].classList.add('shooter')

// Movimiento Nave <- ->
function moveShooter(e) {
  squares[disparador].classList.remove('shooter')
  switch(e.key) {
    case 'ArrowLeft':
      if (disparador % width !== 0) disparador -=1
      break
    case 'ArrowRight' :
      if (disparador % width < width -1) disparador +=1
      break
  }
  squares[disparador].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

// Movimiento Enemigo
function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
  remove()

  if (rightEdge && move) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width +1
      direction = -1
      move = false
    }
  }

  if(leftEdge && !move) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width -1
      direction = 1
      move = true
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }

  draw()

  if (squares[disparador].classList.contains('invader', 'shooter')) {
    resultados.innerHTML = 'GAME OVER'
    clearInterval(invadersId)
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if(alienInvaders[i] > (squares.length)) {
      resultados.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
    }
  }
  if (alienEliminado.length === alienInvaders.length) {
    resultados.innerHTML = 'YOU WIN'
    clearInterval(invadersId)
  }
}
invadersId = setInterval(moveInvaders, 600)

// disparo------
function shoot(e) {
  let laserId
  let currentLaserIndex = disparador
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('laser')

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('boom')

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
      clearInterval(laserId)

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
      alienEliminado.push(alienRemoved)
      results++
      resultados.innerHTML = results
      console.log(alienEliminado)

    }

  }
  switch(e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100)
  }
}

document.addEventListener('keydown', shoot)
