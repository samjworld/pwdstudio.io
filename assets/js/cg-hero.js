
(function(){
  const slides = Array.from(document.querySelectorAll('.cg-slide'));
  if(!slides.length) return;
  let idx=0;
  function go(n){
    slides[idx].classList.remove('cg-active');
    idx=(n+slides.length)%slides.length;
    slides[idx].classList.add('cg-active');
  }
  let t=setInterval(()=>go(idx+1),3000);
})();
