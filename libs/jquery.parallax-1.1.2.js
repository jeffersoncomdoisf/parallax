
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

        // Realizando validação do objeto area
        var area;
        area = $(config.area);
        if(typeof(area) !== 'object' || area.offset() === null) alert('Objeto area não encontrado.');

        // Inicializando as variáveis
        var area_width = area.width(),
            area_height = area.height(),
            area_posx = area.offset().left,
            area_posy = area.offset().top,
            area_offsetTop = area_posy,
            area_offsetRight = area_posx + area_width,
            area_offsetBottom = area_posy + area_height,
            area_offsetLeft = area_posx;

        var layer = $(config.layer),
            layer_count = layer.length,
            layer_move_validate = true,
            layer_move_posx = 0,
            layer_move_posy = 0;

        var mouse_posx = 0,
            mouse_posy = 0;

        var $document = $(document),
            global = {},
            _i = 0;

        // Centralizar imagens
        function CentralizeLayers(layer) {
            var cssPos = {},
                _layer;
            layer.each(function(){
                _layer = $(this);
                cssPos.left = Math.round((area_width - _layer.width()) / 2);
                cssPos.top = Math.round((area_height - _layer.height()) / 2);
                _layer.css(cssPos);
            });
        }

        // Configurações do slide show
        var SlideShow = function(layer, config){
            this.layer = layer;
            this.fx = config.fx;
            this.fxSpeed = config.fxSpeed;
            this.delay = config.delay;
            this.count = layer_count;

            // O que fazer antes de começar o slide show
            this.init = function(){
                this.layer.hide();
                this.layer.eq(0).show();
            };
            // Rodar slide show
            this.run = function(){
                if('fade' === this.fx){
                    setInterval(function(){
                        alert(_i);
                        this.layer.eq(_i).fadeOut(this.fxSpeed);
                        _i = (_i + 1 === this.count) ?
                            0 :
                            _i + 1;
                        this.layer.eq(_i).fadeIn(this.fxSpeed);
                    },
                    this.delay);
                }
            };
        };

        // Configurações referente ao mover da layer
        var Move = function(move){
            this.validate = true;

            // Se não for mover a layer
            if(move === false){
                // Zerar variáveis de movimento
                layer_move_posx = 0;
                layer_move_posy = 0;

                this.validate = false;
            }

            return this.validate;
        };

        // Mapeando a área de movimento do mouse
        var MapArea = function(){
            // Verificando se o mouse está sobre a área
            return  ((mouse_posx >= area_offsetLeft && mouse_posx <= area_offsetRight) &&
                    (mouse_posy >= area_offsetTop && mouse_posy <= area_offsetBottom)) ?
                        true : false;
        };

        if(global.move && config.align === 'center') {
            // Centralizando layers
            CentralizeLayers(layer);
        }

        global.move = new Move(config.move);
        global.slideshow = new SlideShow(layer, config);

        global.slideshow.init();
        global.slideshow.run();

        return $document.mousemove(function(e){
            // Pegando as posições do mouse e jogando na variável global
            global.mapArea = new MapArea(e.pageX, e.pageY);

            // Se o mouse estiver dentro da área que foi mapeada
            if( global.mapArea ) {
                // Posição do mouse dentro da área
                var area_mouse_posx = e.pageX - area_posx;
                var area_mouse_posy = e.pageY - area_posy;

                // Pegar as porcentagens das posições do mouse dentro da área
                var area_mouse_posx_percent = Math.round(area_mouse_posx / area_width * 100);
                var area_mouse_posy_percent = Math.round(area_mouse_posy / area_width * 100);

                // Mover a sobra da imagem até encostar na borda da área de movimento do mouse
                var _layer = layer;
                _layer.each( function() {
                    _layer.width = $(this).width();
                    _layer.height = $(this).height();
                    _layer.posx = $(this).offset().left;
                    _layer.posy = $(this).offset().top;
                    _layer.cssLeft = parseInt( $(this).css('left'));
                    _layer.cssTop = parseInt( $(this).css('top'));

                    // Configurações para mover o objeto
                    if(global.move) {
                        // Encontrar a área de sobra da imagem
                        _layer.width_out = (area_width - _layer.width) + config.marginHoriz;
                        _layer.height_out = (area_height - _layer.height) + config.marginVert;

                        // Quantos % vou mover a imagem de acordo com o movimento do mouse
                        _layer.move_posx = _layer.width_out * (area_mouse_posx_percent / 100);
                        _layer.move_posy = _layer.height_out * (area_mouse_posy_percent / 50);
                                                
                        // Mover a imagem até a posição do mouse levemente
                        $(this).animate({
                            left: _layer.move_posx + 'px',
                            top: _layer.move_posy + 'px',
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