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
    }
  })
})