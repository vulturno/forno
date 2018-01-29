var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

$('.ml7 .letters').each(function() {
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});


var basicTimeline = anime.timeline();


if (width > 767) {
    setTimeout(function() {
    basicTimeline
        .add({
            targets: '.resumen-card-rectangle',
            left: function(el) {
                return el.getAttribute('data-position');
            },
            duration: 1050,
            delay: function(target, index) {
                return index * 70;
            },
            elasticity: function(el, i, l) {
                return (200 + i * 200);
            }
        })
        .add({
            targets: '.resumen-card-rectangle',
            left: ['35vw'],
            top: ['47.5vh','20vh'],
            width: ['5vw', '30vw'],
            height: ['5vw', '30vw'],
            duration: 1050,
            delay: function(target, index) {
                return index * 70;
            },
            elasticity: function(el, i, l) {
                return (200 + i * 200);
            }
        })
        .add({
            targets: '.resumen-card-rectangle',
            borderRadius: ['100%', '20%', '50px'],
            duration: 1050,
            rotate: function(el) {
                return el.getAttribute('data-rotate') * 7;
            },
            delay: function(target, index) {
                return index * 70;
            },
            elasticity: function(el, i, l) {
                return (200 + i * 200);
            }
        })
        //Letter effect by: http://tobiasahlin.com/moving-letters/#
        .add({
            targets: '.letter',
            opacity: 1,
            translateY: ["1.1em", 0],
            translateX: ["0.55em", 0],
            translateZ: 0,
            rotateZ: [180, 0],
            duration: 750,
            easing: "easeOutExpo",
            delay: function(el, i) {
                return 50 * i;
            }
        });
}, 300);
} else {
    setTimeout(function() {
        basicTimeline
            .add({
                targets: '.resumen-card-rectangle',
                borderRadius: ['100%', '20%', '50px'],
                duration: 1050,
                rotate: function(el) {
                    return el.getAttribute('data-rotate') * 7;
                },
                delay: function(target, index) {
                    return index * 70;
                },
                elasticity: function(el, i, l) {
                    return (200 + i * 200);
                }
            })
            //Letter effect by: http://tobiasahlin.com/moving-letters/#
            .add({
                targets: '.letter',
                opacity: 1,
                translateY: ["1.1em", 0],
                translateX: ["0.55em", 0],
                translateZ: 0,
                rotateZ: [180, 0],
                duration: 750,
                easing: "easeOutExpo",
                delay: function(el, i) {
                    return 50 * i;
                }
            });
    }, 300);
}
