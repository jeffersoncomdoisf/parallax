
/*
 * Criado por: Jefferson William
 * Nome do Plugin: Parallax
 * Versão: 1.0.0
 * Data de criação do plugin: 24/06/2012
 * Última atualização: 25/06/2012
 */

(function($) {

    $.fn.parallaxMouse = function( settings ) {
        // settings
        var config = {
            'speed': 20,
            'followMouse': true
        };
        if( settings ) $.extend( config, settings );

        // Centralizar imagens
        this.children('img').each( function(){
            var box = $(this).parent();
            var img = $(this);
            var margin_left = (img.width() - box.width()) / 2;
            var margin_top = (img.height() - box.height()) / 2;

            img.css({
                'position': 'relative',
                'right': margin_left,
                'bottom': margin_top
            });
        });

        var box = this;
        var mouse_previous_top = 0;
        var mouse_previous_left = 0;
        box.mousemove( function( mouse){
            box.children('img').each( function(){
                // Imagem
                var offset = $(this).offset();
                var margin_left = ( $(this).width() - box.width()) / 2;
                var speed = (box.width() / 2) / margin_left;
alert( speed);
                // Posição do mouse
                // Se mouse estiver andando para a direita
                if( mouse.pageX > mouse_previous_left) {

                }
            });
        });
    };
})(jQuery);

/*$(this).animate({
    left: myX,
    top: myY
}, {
    duration: 50,
    queue: false,
    easing: 'linear'
});*/