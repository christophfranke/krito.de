function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

if (!isTouchDevice()) {
  var NUM_PARTICLES = ( ( ROWS = 'AUTO' ) * ( COLS = 'AUTO' ) ),
      BASE_THICKNESS = Math.pow( 15, 3 ),
      LAZYNESS = 30,
      SPACING = 8,
      MARGIN = 0,
      COLOR = 255,
      DRAG = 0.99,
      EASE = 0.5,
      BREATHING_SPEED = 0.0,
      

      mouse,
      stats,
      list,
      tog,
      man,
      dx, dy,
      mOld, mNew,
      d, t, f,
      a, b,
      i, n,
      s,
      r, c;

  const createParticle = () => ({
    vx: 0,
    vy: 0,
    x: 0,
    y: 0
  })

  const initHandlers = (container) => {
    const mouseMove = e => {
      const bounds = container.getBoundingClientRect()
      const mx = e.clientX - bounds.left
      const my = e.clientY - bounds.top
      move(mx, my)
    }

    const touchMove = e => {
      e.stopPropagation()
      e.preventDefault()

      const bounds = container.getBoundingClientRect()
      for (let i=0; i < e.touches.length; i++) {
        const touch = e.touches.item(i)
        const mx = touch.clientX - bounds.left
        const my = touch.clientY - bounds.top
        move(mx, my)
      }
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
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('touchmove', touchMove)

    window.addEventListener( 'touchstart', function(e) {
      const bounds = container.getBoundingClientRect()
      const mx = e.clientX - bounds.left;
      const my = e.clientY - bounds.top;

      mOld = mNew = {
        x: mx,
        y: my
      }
    })

    window.addEventListener( 'touchend', function(e) {
      console.log('end')
      mOld = mNew = null
    })
  }

  const initParticles = (container, canvas) => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    MARGIN = Math.min(width, height) * MARGIN;

    COLS = Math.floor((width - 2 * MARGIN) / SPACING)
    ROWS = Math.floor((height  - 2 * MARGIN) / SPACING)
    NUM_PARTICLES = COLS * ROWS
    // console.log('Particles:', NUM_PARTICLES)

    container.style.marginLeft = Math.round( width * -0.5 ) + 'px';
    container.style.marginTop = Math.round( height * -0.5 ) + 'px';
    
    for ( i = 0; i < NUM_PARTICLES; i++ ) {
      const particle = list[i] || createParticle()
      particle.x = particle.ox = MARGIN + SPACING * ( i % COLS );
      particle.y = particle.oy = MARGIN + SPACING * Math.floor( i / COLS );      
      list[i] = particle;
    }
  }

  let width, height, ctx, noMouseMoveCounter;
  function init() {
    const container = document.getElementById( 'particle-container' )
    const canvas = document.createElement( 'canvas' )
    
    ctx = canvas.getContext( '2d' )
    man = false
    tog = true
    
    list = []
    noMouseMoveCounter = 0

    initParticles(container, canvas)
    initHandlers(container)
    container.appendChild(canvas)

    window.addEventListener('resize', () => {
      initParticles(container, canvas)
    })
  }

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

  const FACTOR = 0.25
  const PIXEL_SIZE = 7
  const setColor = (particle, data) => {
    const rgb = [
      COLOR / (1 + FACTOR * LA.norm({ x: particle.vx, y: particle.vy })),
      COLOR / (1 + FACTOR * FACTOR * Math.abs(particle.vx)),
      COLOR / (1 + FACTOR * FACTOR * Math.abs(particle.vy))
    ]
    for (let x = particle.x; x < particle.x + PIXEL_SIZE; x++) {
      for (let y = particle.y; y < particle.y + PIXEL_SIZE; y++) {    
        const n = ( ~~x + ( ~~y * width ) ) * 4
        data[n] = rgb[0]
        data[n+1] = rgb[1]
        data[n+2] = rgb[2]
        data[n+3] = 255;  
      }
    }
  }

  let stepCount = 0
  function step() {
    noMouseMoveCounter += 1

    if ( tog = !tog ) {
      stepCount += 1
      THICKNESS = Math.abs(Math.cos(2 * Math.PI * BREATHING_SPEED * stepCount / 30.0) * BASE_THICKNESS) / noMouseMoveCounter

      const mouseLine = man && mNew && line(mOld || mNew, mNew)
      for ( i = 0; i < NUM_PARTICLES; i++ ) {
        const particle = list[i];

        if (mouseLine) {
          const { d, v, lineLenght } = mouseLine.distance(particle)
          dx = v.x
          dy = v.y
          // d = ( dx = mx - p.x ) * dx + ( dy = my - p.y ) * dy;
          f = -THICKNESS / (d + LAZYNESS);

          if ( d < THICKNESS ) {
            t = Math.atan2( dy, dx );
            particle.vx += f * Math.cos(t);
            particle.vy += f * Math.sin(t);
          }
        }
        
        particle.x += ( particle.vx *= DRAG ) + (particle.ox - particle.x) * EASE;
        particle.y += ( particle.vy *= DRAG ) + (particle.oy - particle.y) * EASE;

        if (particle.vx * (particle.x - particle.ox) < 0.01) {
          particle.x = particle.ox
        }
        if (particle.vy * (particle.y - particle.oy) < 0.01) {
          particle.y = particle.oy
        }
      }

      mOld = null
    } else {
      const image = ctx.createImageData( width, height )

      for ( i = 0; i < NUM_PARTICLES; i++ ) {
        setColor(list[i], image.data)
      }

      ctx.putImageData( image, 0, 0 );
    }

    requestAnimationFrame( step );
  }

  init();
  step();
}
