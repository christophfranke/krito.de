const logos = ['soundcloud', 'spotify', 'instagram']
window.addEventListener('load', () => {
  logos.forEach(logo => {  
    document.querySelectorAll(`.${logo}`).forEach(el => {
      el.addEventListener('mouseenter', () => {
        el.src = `/logos/${logo}.svg`
      })
      el.addEventListener('mouseleave', () => {
        el.src = `/logos/${logo}-white.svg`
      })
    })
  })
})