
/*
 * Criado por: Jefferson William
 * Nome do Plugin: Parallax
 * Versão: 1.1.2
 * Data de criação do plugin: 12/07/2012
 * Última atualização: 15/07/2012
 */

(function($) {

    $.parallaxMouse = function(settings) {
        var config = {
            area: '.parallax',
            layer: 'img',
            fx: 'fade',
            delay: 3000,
            fxSpeed: 500,
            move: true,
            marginHoriz: 0,
            marginVert: 0,
            align: 'center'
        };

        if(settings) { $.extend(config, settings); }

        // Variáveis globais
        var mouse = {},
            area = {},
            img = {},
            i = 0;

        // Inicializando as variáveis
        area = typeof( $(config.area)) == 'object' && $(config.area).offset() != null ?
            $(config.area) :
            alert("Objeto area não encontrado.");
        area.width = area.width();
        area.height = area.height();
        area.posx = area.offset().left;
        area.posy = area.offset().top;

        img = $(config.layer);
        img.count = img.length;

        // Centralizar imagens
        function centralize_imgs() {
            img.each(function() {
                $(this).css({
                    left: Math.round( ( area.width - $(this).width()) / 2),
                    top: Math.round( ( area.height - $(this).height()) / 2)
                });
            });
        }

        // Mapeando a área de movimento do mouse
        var map_area = function() {
            // Obtendo as posições da área
            area.offsetTop      = area.posy;
            area.offsetRight    = area.posx + area.width;
            area.offsetBottom   = area.posy + area.height;
            area.offsetLeft     = area.posx;

            var horizontal  = (mouse.posx >= area.offsetLeft && mouse.posx <= area.offsetRight) ? true : false;
            var vertical    = (mouse.posy >= area.offsetTop && mouse.posy <= area.offsetBottom) ? true : false;

            // Verificando se o mouse está sobre a área
            return horizontal && vertical ? true : false;
        };

        // Configurações do slide show
        var slideshow = {
            init: function() {
                // O que fazer antes de começar o slide show
                img.hide();
                img.eq(0).show();

                slideshow.run();
            },
            run: function() {
                // Rodando slide show
                if('fade' === config.fx) {
                    setInterval( function(){
                        img.eq( i ).fadeOut(config.fxSpeed);
                        i = (i + 1 == img.count) ? 0 : i + 1;
                        img.eq( i ).fadeIn(config.fxSpeed);
                    }, config.delay );
                }
            }
        };

        // Configurações referente ao mover da layer
        var move = {
            init: function() {
                var validate_direction;
                // Se for mover a layer mesmo não espeficicando a direção
                if(config.move != false) {
                    validate_direction = true;
                } else {
                    // Se não for mover a layer
                    // Zerar variáveis de movimento
                    img.move_posx = 0;
                    img.move_posy = 0;
                    validate_direction = false;
                }
                return { value: validate_direction };
            }
        };

        move.init();

        if(move.init().value && config.align == 'center') {
            // Centralizando imagens
            centralize_imgs();
        }

        slideshow.init();

        return $(document).mousemove( function(e) {
            // Pegando as posições do mouse e jogando na variável global
            mouse.posx = e.pageX;
            mouse.posy = e.pageY;

            // Se o mouse estiver dentro da área que foi mapeada
            if( map_area() ) {
                // Posição do mouse dentro da área
                area.mouse_posx = mouse.posx - area.posx;
                area.mouse_posy = mouse.posy - area.posy;

                // Pegar as porcentagens das posições do mouse dentro da área
                area.mouse_posx_percent = Math.round(area.mouse_posx / area.width * 100);
                area.mouse_posy_percent = Math.round(area.mouse_posy / area.width * 100);

                // Mover a sobra da imagem até encostar na borda da área de movimento do mouse
                img.each( function() {
                    img.width = $(this).width();
                    img.height = $(this).height();
                    img.posx = $(this).offset().left;
                    img.posy = $(this).offset().top;
                    img.cssLeft = parseInt( $(this).css('left'));
                    img.cssTop = parseInt( $(this).css('top'));

                    // Configurações para mover o objeto
                    if( move.init().value ) {
                        // Encontrar a área de sobra da imagem
                        img.width_out = (area.width - img.width) + config.marginHoriz;
                        img.height_out = (area.height - img.height) + config.marginVert;

                        // Quantos % vou mover a imagem de acordo com o movimento do mouse
                        img.move_posx = img.width_out * (area.mouse_posx_percent / 100);
                        img.move_posy = img.height_out * (area.mouse_posy_percent / 50);
                                                
                        // Mover a imagem até a posição do mouse levemente
                        $(this).animate({
                            left: img.move_posx + 'px',
                            top: img.move_posy + 'px',
                        }, {
                            duration: 50,
                            queue: false,
                            easing: 'linear'
                        });
                    }
                });
            }
        });
    };
})(jQuery);