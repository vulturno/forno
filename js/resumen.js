var title = document.getElementsByClassName('.resumen-forno');

var basicTimeline = anime.timeline();

setTimeout(function() {
    basicTimeline
        .add({
            targets: '.resumen-card-rectangle',
            borderRadius: ['100%', '20%', '50px'],
            duration: 1050,
            rotate: function(el) {
                return el.getAttribute('data-rotate') * 5;
            },
            delay: function(target, index) {
                return index * 70;
            },
            elasticity: function(el, i, l) {
                return (200 + i * 200);
            }
        })
        .add({
            targets: '.resumen-intro-title',
            opacity: ['0', '1'],
            duration: 300
        });
}, 300);
