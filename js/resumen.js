var relativeOffset = anime.timeline();

relativeOffset
  .add({
    targets: '#relativeOffset .green',
    translateX: 250,
    easing: 'easeOutExpo',
    offset: 10
  })
  .add({
    targets: '#relativeOffset .blue',
    opacity: [1,0],
    easing: 'easeOutExpo',
    offset: 20 // Starts 600ms before the previous animation ends
  })
  .add({
    targets: '#relativeOffset .red',
    translateX: 250,
    easing: 'easeOutExpo',
    offset: 40 // Starts 800ms before the previous animation ends
  });
