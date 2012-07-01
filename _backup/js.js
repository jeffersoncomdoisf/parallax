jQuery(document).ready(function($){

	function GetSpeedParallax( speed){
		switch( speed){
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
	}

	function AssignNewPosition( element, top, left, action, mouse_direction){
		// mudando posição do elemento de acordo com a direção do mose
		if( mouse_direction == true){
			if( action == 'add'){
				element.css({'top'	: element.position().top + top + 'px'});
				element.css({'left'	: element.position().left + left + 'px'});
			} else {
				element.css({'top'	: element.position().top - top + 'px'});
				element.css({'left'	: element.position().left - left + 'px'});
			}
		} else {
			if( action == 'subtract'){
				element.css({'top'	: element.position().top + top + 'px'});
				element.css({'left'	: element.position().left + left + 'px'});
			} else {
				element.css({'top'	: element.position().top - top + 'px'});
				element.css({'left'	: element.position().left - left + 'px'});
			}
		}
	}

	var Parallax = function( element, speed, mouse_direction){
		// pegar os dados do elemento
		var cb = $(element);
		var cb_initial_top	= cb.position().top;
		var cb_initial_left	= cb.position().left;
		var cb_page_top		= cb.offset().top;
		var cb_page_left	= cb.offset().left;
		var b = '<br/>';

		// pegar a velocidade do elemento
		var speed_pixels = GetSpeedParallax( speed);

		/* inicializar as variaveis */

		// calculos
		var quant_vezes = 0;
		var soma_quant_vezes_top = 0;
		var soma_quant_vezes_left = 0;
		// novas posições do elemento
		var new_position_top = 0;
		var new_position_left = 0;
		// posição do elemento na página
		var mouse_previous_top = cb_page_top;
		var mouse_previous_left = cb_page_left;

		$(document).mousemove(function(e){
			// mouse anterior < mouse
			if( (mouse_previous_top + speed_pixels) < e.pageY){
				// calculo de quantas vezes maior na altura (top)
				quant_vezes = mouse_previous_top + speed_pixels;
				do{
					quant_vezes += speed_pixels;
					soma_quant_vezes_top += 1;
				}
				while( quant_vezes < e.pageY);
				// atribuir nova posição ao elemento
				AssignNewPosition( cb, soma_quant_vezes_top, 0, 'add', mouse_direction);
				// valor do mouse anterior é igual ao valor do mouse atual
				mouse_previous_top = e.pageY;
			}
			// mouse anterior > mouse
			if( (mouse_previous_top - speed_pixels) > e.pageY){
				// calculo de quantas vezes menor na altura (top)
				quant_vezes = mouse_previous_top - speed_pixels;
				do{
					quant_vezes -= speed_pixels;
					soma_quant_vezes_top += 1;
				}
				while( quant_vezes > e.pageY);
				// atribuir nova posição ao elemento
				AssignNewPosition( cb, soma_quant_vezes_top, 0, 'subtract', mouse_direction);
				// valor do mouse anterior é igual ao valor do mouse atual
				mouse_previous_top = e.pageY;
			}
			// debug
			s = '';
			s += b + 'quant vezes: '			+ quant_vezes;
			s += b + 'quantos pixels mudar: '	+ soma_quant_vezes_top;
			s += b + 'elemento page top: '		+ cb_page_top;
			s += b + 'elemento position top: '	+ cb.position().top;
			s += b + 'mouse anterior: '			+ mouse_previous_top;
			s += b + 'mouse position: '			+ e.pageY;

			$('#text').html(s);

			// resetando as variáveis
			quant_vezes = 0;
			soma_quant_vezes_top = 0;
			soma_quant_vezes_left = 0;
		}); // mousemove
	}; // Parallax();

	Parallax( '.plx-1', 'medium', true);
	Parallax( '.plx-1_1', 'slow', true);
	Parallax( '.plx-2', 'fast', true);

});