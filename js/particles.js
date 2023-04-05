// Linear Algebra module
const LA = {
  madd: (p1, m, p2) => ({
    x: p1.x + m * p2.x,
    y: p1.y + m * p2.y
  }),
  multiply: (m, p1) => ({
    x: m * p1.x,
    y: m * p1.y
  }),
  subtract: (p1, p2) => ({
    x: p1.x - p2.x,
    y: p1.y - p2.y
  }),
  product: (p1, p2 = p1) => p1.x * p2.x + p1.y * p2.y,
  rotate90: point => ({
    x: -point.y,
    y: point.x
  }),
  norm: point => Math.sqrt(LA.product(point, point)),
  normV: particle => Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy),
  distance: (p1, p2) => LA.norm(LA.subtract(p1, p2)),
  distanceSquared: (p1, p2) => LA.product(LA.subtract(p1, p2)),
  normalize: point => {  
    const length = LA.norm(point)
    return {
      x: point.x / length,
      y: point.y / length
    }
  }
}

export default () => {
  const BASE_THICKNESS = Math.pow( 17, 3 ),
      MOUSE_MOVE_FACTOR = 70,
      LAZYNESS = 1000,
      SPACING = 3,
      MARGIN = 0,
      COLOR = 255,
      DRAG = 0.9,
      EASE = 0.01,
      BREATHING_SPEED = 0.0
  const PIXEL_SIZE = 3

  let NUM_PARTICLES,
      THICKNESS,
      mouse,
      stats,
      list,
      tog,
      man,
      dx, dy,
      mOld, mNew,
      a, b,
      i, n,
      s,
      r, c

  const createParticle = () => ({
    vx: 0,
    vy: 0,
    x: 0,
    y: 0,
    isMoving: false
  })

  let width, height, ctx, ctxBg, noMouseMoveCounter, backgroundImage
  let numActiveParticles
  let stopParticles = []
  let startParticles = []

  const initHandlers = (container) => {
    const mouseMove = e => {
      const bounds = container.getBoundingClientRect()
      const mx = e.clientX - bounds.left
      const my = e.clientY - bounds.top
      move(mx, my)
    }

    const move = (mx, my) => {
      noMouseMoveCounter = 0
      man = true

      if (tog) {    
        if (man) {    
          mOld = mNew || {
            x: mx,
            y: my
          }
          mNew = {
            x: mx,
            y: my
          }
        } else {
          mOld = mNew = null
        }
      }    
    }

    setTimeout(() => {
      window.addEventListener('mousemove', mouseMove)
      noMouseMoveCounter = MOUSE_MOVE_FACTOR * THICKNESS
    }, 1000)

    // window.addEventListener('click', () => {
    //   list.forEach(particle => {
    //     shake(particle)
    //   })
    //   startParticles = list.filter(particle => particle.isMoving)
    // })
  }

  const initParticles = (container, canvas, canvasBg) => {
    width = canvas.width = canvasBg.width = window.innerWidth;
    height = canvas.height = canvasBg.height = window.innerHeight;

    const marginInPx = Math.min(width, height) * MARGIN;

    const COLS = Math.floor((width - 2 * marginInPx) / SPACING)
    const ROWS = Math.floor((height  - 2 * marginInPx) / SPACING)
    NUM_PARTICLES = COLS * ROWS
    // console.log('Particles:', NUM_PARTICLES)

    container.style.marginLeft = Math.round( width * -0.5 ) + 'px';
    container.style.marginTop = Math.round( height * -0.5 ) + 'px';
    
    backgroundImage = ctxBg.createImageData(width, height)
    list.length = NUM_PARTICLES
    for (i = 0; i < NUM_PARTICLES; i++) {
      if (list[i]) {
        const particle = list[i]
        particle.ox = marginInPx + SPACING * ( i % COLS )
        particle.oy = marginInPx + SPACING * Math.floor( i / COLS )
      } else {      
        const particle = createParticle()
        particle.x = particle.ox = marginInPx + SPACING * ( i % COLS )
        particle.y = particle.oy = marginInPx + SPACING * Math.floor( i / COLS )
        list[i] = particle
      }
    }

    numActiveParticles = NUM_PARTICLES
    startParticles = []
    stopParticles = list.filter(particle => !particle.isMoving)
    tog = true
  }

  const init = () => {
    const container = document.getElementById('particle-container')
    const canvas = document.createElement('canvas')
    const canvasBg = document.createElement('canvas')
    
    ctx = canvas.getContext('2d')
    ctxBg = canvasBg.getContext('2d')
    man = false
    tog = true
    
    list = []
    noMouseMoveCounter = 0

    initParticles(container, canvas, canvasBg)
    initHandlers(container)
    container.appendChild(canvasBg)
    container.appendChild(canvas)

    window.addEventListener('resize', () => {
      initParticles(container, canvas, canvasBg)
      list.forEach(particle => {
        shake(particle)
      })
    })

    document.body.style.backgroundColor = '#111'
  }
  init()



  const line = (point1, point2) => {
    const difference = LA.subtract(point2, point1)
    const diffLength = LA.norm(difference)
    const normal = LA.normalize(LA.rotate90(difference))
    const offset = LA.product(point1, normal)
    const point1Offset = LA.product(point1, difference)
    const point2Offset = LA.product(point2, difference)

    const distance = position => {
      if (diffLength === 0) {
        return {
          d: LA.distanceSquared(point1, position),
          v: LA.subtract(point1, position),
        }
      }

      const positionOffset = LA.product(position, difference)
      if (positionOffset <= point1Offset) {
        return {
          d: LA.distanceSquared(position, point1),
          v: LA.subtract(point1, position),
        }
      }
      if (positionOffset >= point2Offset) {
        return {
          d: LA.distanceSquared(position, point2),
          v: LA.subtract(point2, position),
        }
      }

      const factor = LA.product(position, normal) - offset
      return {
        d: factor * factor,
        v: LA.multiply(-factor, normal),
      }
    }

    return {
      distance
    }
  }

  const SHAKE_WEIGHT = 0.025
  const shake = (particle) => {
    particle.x += SHAKE_WEIGHT * (Math.random() * width - 0.5 * width)
    particle.y += SHAKE_WEIGHT * (Math.random() * height - 0.5 * height)
    particle.vx += SHAKE_WEIGHT * (Math.random() * width - 0.5 * width)
    particle.vy += SHAKE_WEIGHT * (Math.random() * height - 0.5 * height)
    const wasMoving = particle.isMoving
    particle.isMoving = !(particle.x === particle.ox && particle.y === particle.oy)
    if (wasMoving && !particle.isMoving) {
      stopParticles.push(particle)
    }
    if (!wasMoving && particle.isMoving) {
      startParticles.push(particle)
    }
  }

  const updateParticles = () => {
      stepCount += 1
      THICKNESS = Math.max(Math.abs(Math.cos(2 * Math.PI * BREATHING_SPEED * stepCount / 30.0) * BASE_THICKNESS) - MOUSE_MOVE_FACTOR * noMouseMoveCounter, 0)

      const mouseLine = man && mNew && line(mOld || mNew, mNew)
      if (mouseLine || numActiveParticles > 0) {
        list.forEach(particle => {
          if (mouseLine) {
            const { d, v } = mouseLine.distance(particle)

            if ( d < THICKNESS ) {
              const dx = v.x
              const dy = v.y
              const force = -THICKNESS / (d + LAZYNESS)
              const tangent = Math.atan2( dy, dx )
              particle.vx += force * Math.cos(tangent + 0.6 * Math.random() - 0.3)
              particle.vy += force * Math.sin(tangent + 0.6 * Math.random() - 0.3)

              if (!particle.isMoving) {
                particle.isMoving = true
                startParticles.push(particle)
              }
            }
          }

          if (particle.isMoving) {          
            particle.vx *= DRAG
            particle.vy *= DRAG

            particle.x += particle.vx + (particle.ox - particle.x) * EASE;
            particle.y += particle.vy + (particle.oy - particle.y) * EASE;

            if (Math.abs(particle.vx * (particle.x - particle.ox)) < 0.01) {
              particle.x = particle.ox
              particle.vx = 0
            }
            if (Math.abs(particle.vy * (particle.y - particle.oy)) < 0.01) {
              particle.y = particle.oy
              particle.vy = 0
            }

            particle.color = getColor(particle)

            if (particle.x === particle.ox && particle.y === particle.oy) {
              particle.isMoving = false
              stopParticles.push(particle)
            }
          }
        })
      }

      mOld = null
  }

  const inRange = (x, y) => x >= 0 && x < width && y >= 0 && y < height

  const COLOR_FACTOR = 1
  const RED_FACTOR = 5
  const getN = (x, y) => (Math.round(x) + Math.round(y) * width) * 4
  const getColor = (particle) => [
    COLOR / Math.sqrt(1 + RED_FACTOR * LA.normV(particle)),
    COLOR / Math.sqrt(1 + COLOR_FACTOR * Math.abs(particle.vx)),
    COLOR / Math.sqrt(1 + COLOR_FACTOR * Math.abs(particle.vy)),
  ]
  const setColor = (particle, data) => {
    for (let x = particle.x; x < particle.x + PIXEL_SIZE; x++) {
      for (let y = particle.y; y < particle.y + PIXEL_SIZE; y++) {
        if (inRange(x,y )) {        
          const n = getN(x, y)
          if (!particle.color) {
            particle.color = getColor(particle)
          }
          data[n] = particle.color[0]
          data[n+1] = particle.color[1]
          data[n+2] = particle.color[2]
          data[n+3] = 255;  
        }
      }
    }
  }

  const initColor = (particle, data) => {
    for (let x = particle.ox; x < particle.ox + PIXEL_SIZE; x++) {
      for (let y = particle.oy; y < particle.oy + PIXEL_SIZE; y++) {    
        const n = getN(x, y)
        data[n] = 255
        data[n+1] = 255
        data[n+2] = 255
        data[n+3] = 255;  
      }
    }
  }
  const removeColor = (particle, data) => {
    for (let x = particle.ox; x < particle.ox + PIXEL_SIZE; x++) {
      for (let y = particle.oy; y < particle.oy + PIXEL_SIZE; y++) {    
        const n = getN(x, y)
        data[n] = 0
        data[n+1] = 0
        data[n+2] = 0
        data[n+3] = 0
      }
    }    
  }

  const drawBackground = () => {
    numActiveParticles += startParticles.length - stopParticles.length

    if (stopParticles.length > 0 || startParticles.length > 0) {    
      stopParticles.forEach(particle => {
        initColor(particle, backgroundImage.data)
      })
      
      startParticles.forEach(particle => {
        removeColor(particle, backgroundImage.data)
      })

      ctxBg.putImageData(backgroundImage, 0, 0)
    }
  }

  const drawForeground = () => {
    if (numActiveParticles > 0) {    
      const foregroundImage = ctx.createImageData(width, height)

      list.forEach(particle => {
        if (particle.isMoving) {
          setColor(particle, foregroundImage.data)
        }
      })

      ctx.putImageData(foregroundImage, 0, 0)    
    }
  }

  let stepCount = 0
  const step = () => {
    noMouseMoveCounter += 1

    if ( tog = !tog ) {
      updateParticles()
    } else {
      drawBackground()
      drawForeground()
      stopParticles = []
      startParticles = []
    }

    requestAnimationFrame(step)
  }

  step()
}
