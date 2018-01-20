var title = document.getElementsByClassName('.resumen-forno');

var combinedFunctionBasedProp = anime({
    targets: '.resumen-card-rectangle',
    borderRadius: ['50px', '50px'],
    width: ['0', '30vw'],
    height: ['0', '30vw'],
    duration: 1050,
    rotate: function(el) {
        return el.getAttribute('data-rotate');
    },
    delay: function(target, index) {
        // 100ms delay multiplied by every div index, in ascending order
        return index * 100;
    },
    elasticity: function(el, i, l) {
        return (200 + i * 200);
    }
});


title.onmouseover = function() {
    console.log('hola')
}
