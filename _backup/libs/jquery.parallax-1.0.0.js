/*
 * Criado por: Jefferson William
 * Nome do Plugin: Parallax
 * Versão: 1.0.0
 * Data de criação do plugin: 24/06/2012
 * Última atualização: 25/06/2012
*/

(function($){
	$.fn.parallaxMouse = function( settings){
		// settings
		var config = {
			'mouseOver': 'body',
			'speed': 'medium',
			'followMouse': true
		};
		if( settings)
			$.extend( config, settings);

		// functions
		// obter velocidade da animação
		var getSpeed = function(){
			switch( config.speed){
				case 'slow' :
					speed = 20;
					break;
				case 'medium' :
					speed = 10;
					break;
				case 'fast' :
					speed = 5;
					break;
				case 'veryfast' :
					speed = 1;
					break;
				default:
					speed = speed;
					break;
			}
			return speed;
		};

		return this.each(function(){
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
			};
			var mouse = {
				'previousTop': obj.pageTop,
				'previousLeft': obj.pageLeft
			};
			var speed = getSpeed();
			var n = 0;
			var soma = 0;

			// functions
			var addNewPosition = function(){
				obj.i.css({'top': obj.i.position().top + obj.changeTop + 'px', 'left': obj.i.position().left + obj.changeLeft + 'px'});
				return true;
			};
			var subtractNewPosition = function(){
				obj.i.css({'top': obj.i.position().top - obj.changeTop + 'px', 'left': obj.i.position().left - obj.changeLeft + 'px'});
				return true;
			};
			var assignNewPosition = function( action){
				if( 'add' == action)
					addNewPosition();
				else
					subtractNewPosition();
			};
			var resetAll = function(){
				n = 0;
				soma = 0;
			};

			$(config.mouseOver).mousemove(function(e){
				if( (mouse.previousTop + speed) < e.pageY){
					n = mouse.previousTop + speed;
					do{
						n += speed;
						soma += 1;
					}
					while( n < e.pageY);
					obj.changeTop = soma;
					assignNewPosition( 'add');
					mouse.previousTop = e.pageY;
					resetAll();
				}
				if( (mouse.previousTop - speed) > e.pageY){
					n = mouse.previousTop - speed;
					do{
						n -= speed;
						soma -= 1;
					}
					while( n > e.pageY);
					obj.changeTop = soma;
					assignNewPosition( 'subtract');
					mouse.previousTop = e.pageY;
					resetAll();
				}
				if( (mouse.previousLeft + speed) < e.pageX){
					n = mouse.previousLeft + speed;
					do{
						n += speed;
						soma += 1;
					}
					while( n < e.pageX);
					obj.changeLeft = soma;
					assignNewPosition( 'add');
					mouse.previousLeft = e.pageX;
					resetAll();
				}
				if( (mouse.previousLeft - speed) > e.pageX){
					n = mouse.previousLeft - speed;
					do{
						n -= speed;
						soma -= 1;
					}
					while( n > e.pageX);
					obj.changeLeft = soma;
					assignNewPosition( 'subtract');
					mouse.previousLeft = e.pageX;
					resetAll();
				}

				var s = '';
				var b = '<br />';
				s += b + 'type: ' + typeof(obj);
				s += b + 'initial: ' + b + obj.initialTop + b + obj.initialLeft;
				s += b + 'page: ' + b + obj.i.offset().top + b + obj.i.offset().left;
				s += b + 'new position: ' + b + obj.i.position().top + b + obj.i.position().left;
				s += b + 'previous: ' + b + mouse.previousTop + b + mouse.previousLeft;
				s += b + 'speed: ' + b + speed;
				$('#text').html(s);
			}); // mousemove();
		});
		// alert('final');
	};
	// parallaxMouse();
})(jQuery);