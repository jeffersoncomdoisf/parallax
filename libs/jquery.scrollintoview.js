
/*
 * jQuery.scrollIntoView
 * ------ --------------
 * Version 1.2 - 2010-05-01
 * Copyright (c) 2010 Cau Guanabara (caugb.com.br)
 * --
 * Licensed like jQuery - http://docs.jquery.com/License
 */

/*
 * jQuery.scrollIntoView
 * ------ --------------
 * Version 1.2 - 2010-05-01
 * Copyright (c) 2010 Cau Guanabara (caugb.com.br)
 * --
 * Licensed like jQuery - http://docs.jquery.com/License
 */

(function($) {
    $.scrollIntoView = {
        'middleClosest': function(e, opts) {
            var dh = $(document).height(),
                dw = $(document).width(),
                wh = $(window).height(),
                ww = $(window).width(),
                th = $(e).height(),
                tw = $(e).width(),
                top = $(e).offset().top,
                left = $(e).offset().left,
                bottom = dh - top,
                right = dw - left,
                rtop = th >= wh || opts.forceTop ? top - opts.marginTop : top - (wh / 2) + (th / 2),
                rleft = tw >= ww || opts.forceLeft ? left - opts.marginLeft : left - (ww / 2) + (tw / 2);
            if (!(tw >= ww /*|| opts.forceLeft*/ ) && left < ww / 2) rleft = 0;
            else if (!(tw >= ww /*|| opts.forceLeft*/ ) && right < ww / 2) rleft = dw - ww;
            if (!(th >= wh /*|| opts.forceTop*/ ) && top < wh / 2) rtop = 0;
            else if (!(th >= wh /*|| opts.forceTop*/ ) && bottom < wh / 2) rtop = dh - wh;
            return {
                top: rtop,
                left: rleft
            };
        }
    };
    $.fn.scrollIntoView = function(obj, callback) {
        var opts = $.extend({
            'forceTop': false,
            'forceLeft': false,
            'marginTop': 10,
            'marginLeft': 10,
            'easing': 'swing',
            'duration': typeof(obj) == 'number' ? obj : 1000,
            'complete': typeof(callback) == 'function' ? callback : null
        }, (obj && typeof(obj) == 'object') ? obj : {}),
            $this = $(this).get(0);
        if (opts.complete && $this) {
            $this.callback = opts.complete;
            opts.complete = function() {
                $this.callback();
            };
        }

        var pos = $.scrollIntoView.middleClosest(this, opts),
            selector = /Opera|Chrome/.test(navigator.userAgent) ? 'body' : 'html';
        $(selector).animate({
            'scrollTop': pos.top,
            'scrollLeft': pos.left
        }, opts.duration, opts.easing, opts.complete);
    };
})(jQuery);