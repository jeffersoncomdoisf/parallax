
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

        /*
         * @title Centralizar imagens
         * @param Para cada imagem, encontrar o espaço que está de fora da área geral
         */
        function center_images () {
            box.obj.children('img').each( function(){
                var box = $(this).parent();
                var img = $(this);
                var margin_left = (img.width() - box.width()) / 2;
                var margin_top = (img.height() - box.height()) / 2;

                // alert( img.width()+' '+img.height()+' '+margin_left+' '+margin_top);

                img.css({
                    'position': 'absolute',
                    'left': -margin_left,
                    'top': -margin_top
                });
            });
        } // center_images ();

        var img = {},
            mou = {},
            mov = {};
        var box = { 'obj' : this };

        /*
         * @param Qual a posição do mouse (pixels) em relação a área
         */
        function mouse_position_area () {
            return mou.left - box.obj.offset().left;
        } // mouse_position_area ();

        /*
         * @param Encontrar área de sobra da imagem
         * @param Transformar em porcentagem
         * @result Quantos pixels percorrer
         */
        function area_move () {
            box_diameter = box.width / 2;
            img_diameter = img.width / 2;

            return this.value = img_diameter - box_diameter;
        } // area_move ();

        function init () {
            center_images();
        }

        // Inicializar
        init();

        box.width = box.obj.width();
        box.height = box.obj.height();

        box.obj.mousemove( function( mouse) {
            mou.left = mouse.pageX;
            mou.top = mouse.pageY;
            box.obj.children('img').each( function() {
                img.width = $(this).width();
                img.height = $(this).height();

                mov.left = ( mouse_position_area() * area_move() ) / ( box.width / 2 );

                $(this).animate({
                        'left' : mov.left + '%'
                    },
                    10
                );

                // alert( mouse_position_area() + ' * ' + area_move() + ' / ' + box.width + ' = ' + mov.left);
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