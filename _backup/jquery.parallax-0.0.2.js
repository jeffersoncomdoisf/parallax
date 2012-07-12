
/*
 * Criado por: Jefferson William
 * Nome do Plugin: Parallax
 * Versão: 1.0.0
 * Data de criação do plugin: 24/06/2012
 * Última atualização: 25/06/2012
 */

(function($) {

    $.fn.parallaxMouse = function(settings) {
        // settings
        var config = {
            'mouseOver': 'body',
            'speed': 'medium',
            'followMouse': true
        };
        if (settings) $.extend(config, settings);

        // functions
        // obter velocidade da animação
        var getSpeed = function() {
                switch (config.speed) {
                case 'slow':
                    speed = 20;
                    break;
                case 'medium':
                    speed = 10;
                    break;
                case 'fast':
                    speed = 5;
                    break;
                case 'veryfast':
                    speed = 1;
                    break;
                default:
                    speed = speed;
                    break;
                }
                return speed;
            };

        return this.each(function() {
            // variables
            var obj = {
                    'i': $(this),
                    'initialTop': $(this).position().top,
                    'initialLeft': $(this).position().left,
                    'pageTop': $(this).offset().top,
                    'pageLeft': $(this).offset().left,
                    'newPositionTop': 0,
                    'newPositionLeft': 0,
                    'changeTop': 0,
                    'changeLeft': 0
                },
                mouse = {
                    'previousTop': obj.pageTop,
                    'previousLeft': obj.pageLeft
                };

            var speed = getSpeed(),
                n = 0,
                soma = 0;

            // functions
            var addNewPosition = function() {
                    obj.i.animate({
                        left: obj.i.position().left + obj.changeLeft
                    }, {
                        duration: 200,
                        queue: false,
                        easing: 'swing'
                    });
                },
                subtractNewPosition = function() {
                    obj.i.animate({
                        left: obj.i.position().left + obj.changeLeft
                    }, {
                        duration: 200,
                        queue: false,
                        easing: 'swing'
                    });
                },
                assignNewPosition = function(action) {
                    if ('add' == action) addNewPosition();
                    else subtractNewPosition();
                },
                resetAll = function() {
                    n = 0;
                    soma = 0;
                },
                // _add( previous_position_mouse, current_mouse_position );
                _add = function( m, p ) {
                    // Pegar próxima posição do mouse para validar de acordo com a posição anterior do mesmo
                    n = m + speed;
                    // Calcular quantas vezes vai ter que mudar de posição
                    do {
                        n += speed;
                        soma += 1;
                    }
                    // Enquanto "próxima posição" < "posição atual do mouse"
                    while (n < p);
                    // Atribuindo valor para mudar
                    obj.changeLeft = soma;
                    // Mudar posição do objeto de acordo com a "soma" realizada
                    assignNewPosition( 'add' );
                    // Posição do mouse anterior = posição atual
                    mouse.previousLeft = p;
                    // Resetando variáveis necessárias para o próximo calculo
                    resetAll();
                },
                // _subtract( previous_position_mouse, current_mouse_position );
                _subtract = function( m, p ) {
                    // Pegar próxima posição do mouse para validar de acordo com a posição anterior do mesmo
                    n = m - speed;
                    // Calcular quantas vezes vai ter que mudar de posição
                    do {
                        n -= speed;
                        soma -= 1;
                    }
                    // Enquanto "próxima posição" < "posição atual do mouse"
                    while (n > p);
                    // Atribuindo valor para mudar
                    obj.changeLeft = soma;
                    // Mudar posição do objeto de acordo com a "soma" realizada
                    assignNewPosition( 'subtract' );
                    // Posição do mouse anterior = posição atual
                    mouse.previousLeft = p;
                    // Resetando variáveis necessárias para o próximo calculo
                    resetAll();
                };

            // Quando o mouse se mover, fazer...
            $(config.mouseOver).mousemove(function(e) {
                /*
                 * @action Se "próxima posição do mouse" < "posição atual do mouse"
                 * @param Calcular quantas vezes ele vai ter que mudar de posição para alcançar a nova posição
                 * @param Mudar para nova posição
                 */
                if( (mouse.previousLeft + speed) < e.pageX )
                    _add( mouse.previousLeft, e.pageX );

                if( (mouse.previousLeft - speed) > e.pageX )
                    _subtract( mouse.previousLeft, e.pageX );

                var s = '',
                    b = '<br />';

                s += b + 'type: ' + typeof(obj);
                s += b + 'initial: ' + b + obj.initialTop + b + obj.initialLeft;
                s += b + 'page: ' + b + obj.i.offset().top + b + obj.i.offset().left;
                s += b + 'new position: ' + b + obj.i.position().top + b + obj.i.position().left;
                s += b + 'previous: ' + b + mouse.previousTop + b + mouse.previousLeft;
                s += b + 'speed: ' + b + speed;
                $('#text').html(s);
            }); // mousemove();
        }); // alert('final');
    };
    // parallaxMouse();
})(jQuery); 

jQuery(document).ready(function($) {
    $('#Parallax').mousemove( function(e) {
        /* Work out mouse position */
        
        // Obter posição do objeto
        var offset = $(this).offset();
        // "Posição X do mouse" - "posição X do elemento"
        var xPos = e.pageX - offset.left;
        // "Posição Y do mouse" - "posição Y do elemento"
        var yPos = e.pageY - offset.top;

        /* Get percentage positions */

        // "Distância X do objeto até o mouse" / "tamanho do objeto" * "porcentagem ( 100 )"
        var mouseXPercent = Math.round(xPos / $(this).width() * 100);
        // "Distância Y do objeto até o mouse" / "tamanho do objeto" * "porcentagem ( 100 )"
        var mouseYPercent = Math.round(yPos / $(this).height() * 100);

        /* Position Each Layer */
        $(this).children('img').each( function() {
            // "Largura da area" - "largura do objeto ( imagem )"
            var diffX = $('#Parallax').width() - $(this).width();
            // "Altura da area" - "altura do objeto ( imagem )"
            var diffY = $('#Parallax').height() - $(this).height();

            // "Area movel" * "porcentagem"
            var myX = diffX * (mouseXPercent / 100); //) / 100) / 2;
            var myY = diffY * (mouseYPercent / 100);

            /*var cssObj = {
                'left': myX + 'px',
                'top': myY + 'px'
            }
            $(this).css(cssObj);*/

            $(this).animate({
                left: myX,
                top: myY
            }, {
                duration: 50,
                queue: false,
                easing: 'linear'
            });

        });

    });
});