const grid = document.querySelector('.grid')
const resultados = document.querySelector('.resultados')
const cambio = document.querySelector('.repetir')
let disparador = 202
let width = 15
let direction = 1
let invadersId
let move = true
let alienEliminado = []
let res = 0

for (let i = 0; i < 225; i++) {
  const cuadrado = document.createElement('div')
  grid.appendChild(cuadrado)
}

const cuadrados = Array.from(document.querySelectorAll('.grid div'))

const aliniacionIn = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

function inicio() {
  for (let i = 0; i < aliniacionIn.length; i++) {
    if(!alienEliminado.includes(i)) {
      cuadrados[aliniacionIn[i]].classList.add('invader')
    }
  }
}

inicio()

function remove() {
  for (let i = 0; i < aliniacionIn.length; i++) {
    cuadrados[aliniacionIn[i]].classList.remove('invader')
  }
}

cuadrados[disparador].classList.add('shooter')

// Movimiento Nave <- ->
function moveShooter(e) {
  cuadrados[disparador].classList.remove('shooter')
  switch(e.key) {
    case 'ArrowLeft':
      if (disparador % width !== 0) disparador -=1
      break
    case 'ArrowRight' :
      if (disparador % width < width -1) disparador +=1
      break
  }
  cuadrados[disparador].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

// Movimiento Enemigo
function movimientoInvader() {
  const leftEdge = aliniacionIn[0] % width === 0
  const rightEdge = aliniacionIn[aliniacionIn.length - 1] % width === width -1
  remove()

  if (rightEdge && move) {
    for (let i = 0; i < aliniacionIn.length; i++) {
      aliniacionIn[i] += width +1
      direction = -1
      move = false
    }
  }

  if(leftEdge && !move) {
    for (let i = 0; i < aliniacionIn.length; i++) {
      aliniacionIn[i] += width -1
      direction = 1
      move = true
    }
  }

  for (let i = 0; i < aliniacionIn.length; i++) {
    aliniacionIn[i] += direction
  }

  inicio();
  
  
  //Casos......
  if (cuadrados[disparador].classList.contains('invader', 'shooter')){
    cambio.innerHTML = '<div style="padding-top: 45vh;" class="center"> <a class="btn-neon" href="../nivel.html"><span id="span1"></span><span id="span2"></span><span id="span3"></span><span id="span4"></span>GAME OVER</a></div>'
    clearInterval(invadersId)
  }

  for (let i = 0; i < aliniacionIn.length; i++) {
    if(aliniacionIn[i] > (cuadrados.length)) {
      cambio.innerHTML = '<div style="padding-top: 45vh;" class="center"> <a href="../nivel.html" class="btn-neon"><span id="span1"></span><span id="span2"></span><span id="span3"></span><span id="span4"></span>GAME OVER</a></div>'
      clearInterval(invadersId)
    }
  }
  if (alienEliminado.length === aliniacionIn.length) {
    cambio.innerHTML = '<div style="padding-top: 35vh;"><h1 class="otro">YOU WIN Level 2</h1><div class="center"><a href="../nivel.html" class="btn-neon"><span id="span1"></span><span id="span2"></span><span id="span3"></span><span id="span4"></span>Levels</a><a href="../nivelTres/index.html" class="btn-neon"><span id="span1"></span><span id="span2"></span><span id="span3"></span><span id="span4"></span>Next Level -></a></div></div>'
    clearInterval(invadersId)
  }
}
invadersId = setInterval(movimientoInvader, 300)

// disparo------
function shoot(e) {
  let laserId
  let laser = disparador
  function moveLaser() {
    cuadrados[laser].classList.remove('laser')
    laser -= width
    cuadrados[laser].classList.add('laser')

    if (cuadrados[laser].classList.contains('invader')) {
      cuadrados[laser].classList.remove('laser')
      cuadrados[laser].classList.remove('invader')
      cuadrados[laser].classList.add('boom')

      setTimeout(()=> cuadrados[laser].classList.remove('boom'), 300)
      clearInterval(laserId)

      const alienRemoved = aliniacionIn.indexOf(laser)
      alienEliminado.push(alienRemoved)
      res++
      resultados.innerHTML = res
      console.log(alienEliminado)
    }
  }
  switch(e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100)
  }
}

document.addEventListener('keydown', shoot)
