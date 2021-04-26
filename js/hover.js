function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

const logos = ['soundcloud', 'spotify', 'instagram']
window.addEventListener('load', () => {
  logos.forEach(logo => {
    if (isTouchDevice()) {
      document.querySelectorAll(`.${logo}`).forEach(el => {
        el.src = `/logos/${logo}.svg`
      })      
    } else {    
      document.querySelectorAll(`.${logo}`).forEach(el => {
        el.addEventListener('mouseenter', () => {
          el.src = `/logos/${logo}.svg`
        })
        el.addEventListener('mouseleave', () => {
          el.src = `/logos/${logo}-white.svg`
        })
      })
    }
  })
})