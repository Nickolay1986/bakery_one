const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  //зациклинность true false
  loop: true,
  //эффекты перелистывания
  effect: 'slider',  //cards, coverflow, cube, slider, flip, fade, cards
  
  //кол-во слайдов в поле зрения
//   slidesPerView: 2,
  //центрирование слайда
//   centeredSlides: 1,
  //Номер слайда по умолчания при загрузке
  initialSlide: 2,
  
  //свободное перелистывание без центрирования
//   freeMode: true,
  // Пагинация
  pagination: {
    el: ".swiper-pagination",
  },

  // атвоперелистывание в милисекундах
  // autoplay: {
  //     delay: 1000,
  // },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
