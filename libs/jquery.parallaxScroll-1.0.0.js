/*
 * Criado por: Jefferson William
 * Nome do Plugin: Parallax
 * Versão: 1.0.0
 * Data de criação do plugin: 24/06/2012
 * Última atualização: 25/06/2012
*/

(function($){
	$.fn.parallaxScroll = function( settings){
		// settings
		var config = {
			'speed': '10',
			'fx': 'box',
			'targetName': 'target'
		};
		if( settings)
			$.extend( config, settings );
		
		// functions

		return this.each(function(){
			var $this = $(this);
			var get_target = $this.attr('href').replace('#', '');
			alert( get_target );
			var target = {
				'ypos': get_target.offset().top,
				'xpos': get_target.offset().left
			};

			$this.scrollIntoView();

			var target_first = config.targetName + 1;
			var target_last = config.targetName;
		});
	}; // parallaxScroll();
})(jQuery);