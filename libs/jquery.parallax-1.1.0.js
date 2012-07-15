
/*
 * Criado por: Jefferson William
 * Nome do Plugin: Parallax
 * Versão: 1.1.0
 * Data de criação do plugin: 12/07/2012
 * Última atualização: 15/07/2012
 */

(function($) {

    $.fn.parallaxMouse = function() {
        var mouse = {},
            area = this,
            img = this.children('img');

        area = {
            width: area.width(),
            height: area.height(),
            posx: area.offset().left,
            posy: area.offset().top
        };

        // Centralizar imagens
        function centralize_imgs() {
            img.each(function() {
                $(this).css({
                    left: Math.round( ( area.width - $(this).width()) / 2),
                    top: Math.round( ( area.height - $(this).height()) / 2)
                });
            });
        }

        centralize_imgs();

        return $(this).mousemove(function(e) {
            mouse = {
                posx: e.pageX,
                posy: e.pageY
            };

            // Posição do mouse dentro da área
            area.mouse_posx = mouse.posx - area.posx;
            area.mouse_posy = mouse.posy - area.posy;

            // Pegar as porcentagens das posições do mouse dentro da área
            area.mouse_posx_percent = Math.round(area.mouse_posx / area.width * 100);
            area.mouse_posy_percent = Math.round(area.mouse_posy / area.width * 100);

            // Mover a sobra da imagem até encostar na borda da área de movimento do mouse
            $(this).children('img').each( function() {
                img = {
                    width: $(this).width(),
                    height: $(this).height(),
                    posx: $(this).offset().left,
                    posy: $(this).offset().top,
                    cssLeft: parseInt( $(this).css('left')),
                    cssTop: parseInt( $(this).css('top'))
                };

                // Econtrar a área de sobra da imagem
                img.width_out = area.width - img.width;
                img.height_out = area.height - img.height;

                // Quantos % vou mover a imagem de acordo com o movimento do mouse
                img.move_posx = img.width_out * (area.mouse_posx_percent / 100);
                img.move_posy = img.height_out * (area.mouse_posy_percent / 50);

                $(this).animate({
                    left: img.move_posx + 'px',
                    top: img.move_posy + 'px',
                }, {
                    duration: 50,
                    queue: false,
                    easing: 'linear'
                });
            });
        });
    };
})(jQuery);