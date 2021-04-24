
var NUM_PARTICLES = ( ( ROWS = 'AUTO' ) * ( COLS = 'AUTO' ) ),
    BASE_THICKNESS = Math.pow( 15, 3 ),
    LAZYNESS = 10,
    SPACING = 8,
    MARGIN = 0,
    COLOR = 255,
    DRAG = 0.99,
    EASE = 0.25,
    BREATHING_SPEED = 0.0,
    NEEDS_TO_CLICK = false,
    

    container,
    particle,
    canvas,
    mouse,
    stats,
    list,
    ctx,
    tog,
    man,
    dx, dy,
    mx, my,
    mOld, mNew,
    d, t, f,
    a, b,
    i, n,
    w, h,
    p, s,
    r, c
    ;

particle = {
  vx: 0,
  vy: 0,
  x: 0,
  y: 0
};


function init() {
  container = document.getElementById( 'container' );
  canvas = document.createElement( 'canvas' );
  
  ctx = canvas.getContext( '2d' );
  man = false;
  tog = true;
  
  list = [];
  
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  MARGIN = Math.min(w, h) * MARGIN;

  COLS = Math.floor((w - 2 * MARGIN) / SPACING)
  ROWS = Math.floor((h  - 2 * MARGIN) / SPACING)
  NUM_PARTICLES = COLS * ROWS
  console.log('Particles:', NUM_PARTICLES)

  container.style.marginLeft = Math.round( w * -0.5 ) + 'px';
  container.style.marginTop = Math.round( h * -0.5 ) + 'px';
  
  for ( i = 0; i < NUM_PARTICLES; i++ ) {
    
    p = Object.create( particle );
    p.x = p.ox = MARGIN + SPACING * ( i % COLS );
    p.y = p.oy = MARGIN + SPACING * Math.floor( i / COLS );
    
    list[i] = p;
  }

  container.addEventListener( 'mousemove', function(e) {
    bounds = container.getBoundingClientRect();
    mx = e.clientX - bounds.left;
    my = e.clientY - bounds.top;
    man = !NEEDS_TO_CLICK || !!e.buttons;

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
  });

  if (NEEDS_TO_CLICK) {  
    container.addEventListener( 'mousedown', function(e) {
      mx = e.clientX - bounds.left;
      my = e.clientY - bounds.top;

      mOld = mNew = {
        x: mx,
        y: my
      }
      man = true;
    })

    container.addEventListener( 'mouseup', function(e) {
      mOld = mNew = null
      man = false
    })
  }
  
  if ( typeof Stats === 'function' ) {
    document.body.appendChild( ( stats = new Stats() ).domElement );
  }
  
  container.appendChild( canvas );
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

const FACTOR = 0.5
const PIXEL_SIZE = 7
const setColor = (p, data) => {
  const rgb = [
    COLOR / (1 + FACTOR * LA.norm({ x: p.vx, y: p.vy })),
    COLOR / (1 + FACTOR * FACTOR * Math.abs(p.vx)),
    COLOR / (1 + FACTOR * FACTOR * Math.abs(p.vy))
  ]
  for (let x = p.x; x < p.x + PIXEL_SIZE; x++) {
    for (let y = p.y; y < p.y + PIXEL_SIZE; y++) {    
      const n = ( ~~x + ( ~~y * w ) ) * 4
      data[n] = rgb[0]
      data[n+1] = rgb[1]
      data[n+2] = rgb[2]
      data[n+3] = 255;  
    }
  }
}

let stepCount = 0
function step() {

  if ( stats ) stats.begin();

  if ( tog = !tog ) {
    stepCount += 1
    THICKNESS = Math.abs(Math.cos(2 * Math.PI * BREATHING_SPEED * stepCount / 30.0) * BASE_THICKNESS)

    const mouseLine = man && mNew && line(mOld || mNew, mNew)
    for ( i = 0; i < NUM_PARTICLES; i++ ) {
      
      p = list[i];

      if (mouseLine) {
        const { d, v, lineLenght } = mouseLine.distance(p)
        dx = v.x
        dy = v.y
        // d = ( dx = mx - p.x ) * dx + ( dy = my - p.y ) * dy;
        f = -THICKNESS / (d + LAZYNESS);

        if ( d < THICKNESS ) {
          t = Math.atan2( dy, dx );
          p.vx += f * Math.cos(t);
          p.vy += f * Math.sin(t);
        }
      }
      
      p.x += ( p.vx *= DRAG ) + (p.ox - p.x) * EASE;
      p.y += ( p.vy *= DRAG ) + (p.oy - p.y) * EASE;

      if (p.vx * (p.x - p.ox) < 0.01) {
        p.x = p.ox
      }
      if (p.vy * (p.y - p.oy) < 0.01) {
        p.y = p.oy
      }
    }

    mOld = null
  } else {
    const image = ctx.createImageData( w, h )

    for ( i = 0; i < NUM_PARTICLES; i++ ) {
      const p = list[i]
      setColor(p, image.data)
      // setColor({
      //   ...p,
      //   x: p.x + 1,
      //   y: p.y
      // }, image.data)
      // setColor({
      //   ...p,
      //   x: p.x,
      //   y: p.y + 1
      // }, image.data)
      // setColor({
      //   ...p,
      //   x: p.x + 1,
      //   y: p.y + 1
      // }, image.data)
      // setColor({
      //   ...p,
      //   x: p.x + 2,
      //   y: p.y
      // }, image.data)
      // setColor({
      //   ...p,
      //   x: p.x,
      //   y: p.y + 2
      // }, image.data)
      // setColor({
      //   ...p,
      //   x: p.x + 2,
      //   y: p.y + 1
      // }, image.data)
      // setColor({
      //   ...p,
      //   x: p.x + 1,
      //   y: p.y + 2
      // }, image.data)
      // setColor({
      //   ...p,
      //   x: p.x + 2,
      //   y: p.y + 2
      // }, image.data)
    }

    ctx.putImageData( image, 0, 0 );
  }

  if ( stats ) stats.end();

  requestAnimationFrame( step );
}

init();
step();