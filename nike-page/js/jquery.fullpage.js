/*
 *	created by zhangkai on 2016/10/10 
 */
;(function(global,$){
	'use strict';

	var Fullpage = (function(){
		function Fullpage (el,options) {
			this.$el = el;
			this.currIndex = 0;
			this.animating = false;
			this.init();
		}

		var utils = {
			throttle:function(callback,delayTime,maxTime){
				var timer = null;
				var prevTime = 0;

				return function(){
					var context = this;
					var argument = arguments;
					var currTime = Date.now();
					if(maxTime && currTime - prevTime >= maxTime){
						prevTime = currTime;
						callback.apply(context,argument);
					}else{
						if(timer) clearTimeout(timer);
						timer = setTimeout(function(){
							callback.apply(context,argument);
						},delayTime);
					}
				}
			}
		};

		Fullpage.prototype = {
			constructor:Fullpage,
			init:function(){
				this.initHTML();
				this.bindEvent();
				
			},
			initHTML:function(){
				this.$el.children().css({
					'height':'100vh',
					'transition':'all .4s',
					'-webkit-transition':'all .4s'
				});
				var count = $("#fullpage section").length;
				for (var i = 0; i <= count-1; i++) {
					$("#dots").append('<span id="s'+i+'" dot="'+i+'"></span>');
				}$('#dots span#s0').addClass('dot');
			},
			bindEvent:function(){
				var that = this;
				var targetIndex,x0,y0,xDiff,yDiff,delta;

				$(window).on('wheel DOMMouseScroll',utils.throttle(function(){
					var e = arguments[0].originalEvent;
					delta = e.wheelDelta?e.wheelDelta:-e.detail;
					targetIndex = that.currIndex + (delta>0?-1:1);
					var count = $("#fullpage section").length - 1;
					if (targetIndex>count) {
						that.gotoTarget(0);
					}
					if (targetIndex<0) {
						that.gotoTarget(count);
					}
					else{
					that.gotoTarget(targetIndex);
				}
				},100));

				this.$el.on('touchstart',function(e){     
					x0 = e.touches[0].clientX;
					y0 = e.touches[0].clientY;
				});

				this.$el.on('touchmove',utils.throttle(function(){
					var e = arguments[0];
					if (!x0 || !y0) return;
					xDiff = e.touches[0].clientX - x0;
					yDiff = e.touches[0].clientY - y0;
					var count = $("#fullpage section").length - 1;
					targetIndex = that.currIndex + (yDiff>0?-1:1);
					if (targetIndex>count) {
						that.gotoTarget(0);
					}
					if (targetIndex<0) {
						that.gotoTarget(count);
					}
					else{
					that.gotoTarget(targetIndex);
				}
					that.gotoTarget(targetIndex);
				},16));

				$('#dots span').on('click',utils.throttle(function(){
					delta = 3?-3:0;
					console.log(delta);
					var id = $(this).attr('dot');
					that.currIndex = id;
					targetIndex =that.currIndex -(delta>3?-3:0);
					that.gotoTarget(targetIndex);

				}));
			},
			gotoTarget:function(targetIndex){
				var children = this.$el.children();
				var that = this;
				var translateY;

				if(this.animating || targetIndex<0 || targetIndex>this.$el.children().length-1) return;

				translateY= 'translateY(-'+targetIndex*100+'%)';
				this.animating = true;
				$(children[0]).on('transitionend', function callback() {
			        this.removeEventListener('transitionend', callback);
			        that.animating = false;
		        });
		        children.css({
					'transform':translateY,
					'-webkit-transform':translateY
				});	

		        
				this.currIndex = targetIndex;
				var id = $('#dots span#s'+this.currIndex).attr('dot');
		       if (id == this.currIndex){
		       		$('#dots span').removeClass('dot');
		       	$('#dots span#s'+targetIndex).addClass('dot');
		       }

		        
			}
		};

		return Fullpage;
	})();

	$.fn.fullpage = function(options){
		this.each(function(){
			new Fullpage($(this),options);
		});
		return this;
	};
})(this,this.jQuery);