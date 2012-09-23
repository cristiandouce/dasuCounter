
/*
 * jQuery Plugin: Simple & Styled Counter Board
 * Version 0.0.1
 *
 * Copyright (c) 2012 Cristian Douce (http://cristiandouce.com)
 * Licensed jointly under the GPL and MIT licenses,
 * choose which one suits your project best!
 *
 */

;(function($) {
	/**
	 *	Plugin's name
	 */
	var pluginName = "dasuCounter";

	/**
	 *	Plugin's key
	 */
	var pluginKey = "plugin_" + pluginName;

	/**
	 * Plugin's styles
	 */
	var styles 	= '<style id="jquery_dasuCounter_styles" type="text/css">'
							+ '.counterboard{height:36px; margin-bottom: 1em; border-top: 1px solid #C1CDD5; border-bottom: 1px solid #C1CDD5; border-right: 1px solid #C1CDD5;padding:0px; position: relative;float:left;margin-left:20px;margin-bottom:1.5em;background:#FFFFFF;}'
							+ '.counterunit{width:20px;height:36px;display:block;float:left;border-left: 1px solid #C1CDD5;text-align:center;font-size:2em;}'
							+ '.black-cover{border-top: 1px solid #C1CDD5;left: 0; right: 0; top: 50%; bottom:4px;position:absolute;}'
							+	'</style>';

	/**
	 *	Plugin's public methods
	 */
	var methods = {
		init: function(options) {
			return this.each(function() {
				if(!$.data(this, pluginKey)) {
					$.data(this, pluginKey, new DasuCounter(this, options));
				}
			});
		}
	};

	/**
	 * Plugin's defaults
	 */
	var defaults = {
			len: 2
		, interval: 1000
		, offset: 0
	};

	/**
	 * Plugin's constructor
	 */
	var DasuCounter = function(element, options) {
		options = options || {};

		this.$el = $(element);

		this.options = $.extend(defaults,options);

		this.number = this.options.offset + '';
		this.counters = this.number.split('').reverse();
		this.options.len = this.counters.length > this.options.len ? this.counters.length : this.options.len;
		this._digits = [];

		// render units
		this.render();

		if(this.options.interval) this.auto();

	};

	/**
	 * Plugin's render method
	 */
	DasuCounter.prototype.render = function() {
		var i = 0;

		for(; i < this.options.len; i++)
		{
			this.counters[i] = parseInt(this.counters[i],10) || 0;
			this._digits.push(this.$el.prepend('<span class="counterunit" data-digit="' + i + '">' + this.counters[i] + '</span>').children('span').first());
		}
		this.$el.addClass('counterboard');
		this.$el.prepend('<div class="black-cover"></div>');
		if(!$('head style#jquery_dasuCounter_styles').length) $('style,link[rel="stylesheet"][type="text/css"]').before(styles);
		if(!$('head style#jquery_dasuCounter_styles').length) $('head').append(styles);
	};

	/**
	 * Plugin's count method
	 */
	DasuCounter.prototype.count = function() {
		var pos = 0;
		do {
			if(this.counters[pos]==9) {
				this.counters[pos]=0;
				this._digits[pos].html(0);
				pos++;
			} else {
				this._digits[pos].html(++this.counters[pos]);
				pos=0;
			}
		} while(pos)
	}

	/**
	 *
	 */
	DasuCounter.prototype.auto = function() {
		if(this._tid) clearInterval(this._tid);
		this._tid = setInterval($.proxy(this.count, this), Math.floor(this.options.interval));
	}
	
	/**
	 * Plugin expose to jQuery
	 */
  $.fn[pluginName] = function (method) {
    if(methods[method]) {
      return methods[method].apply(this,  Array.prototype.slice.call(arguments, 1));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' +  method + ' does not exist on jquery-dasuCounter');
    }    
  };
})(jQuery);
