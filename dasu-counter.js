(function($) {
	
	$.fn.dasuCounter = function dasuCounter(maxlength,timeinterval,startson){
		if (this.length > 0) {

			var number =  Math.floor(startson) + '';
 			var id = this.attr('id');
			var counters = number.split('');

			counters.reverse();

			for(i=0;i<maxlength;i++)
			{
				this.prepend('<span id="'+id+'-unit-'+i+'" class="counterunit"></span>');
				
				counters[i] = counters[i] ? parseInt(counters[i]) : 0;

				$('#'+id+'-unit-'+i).html(counters[i]+'');

			}
			
			this.prepend('<div class="black-cover"></div>');

			function unitUpdate(){
				var div=0;
				var testNext=false;
				do
				{
					if (counters[div]==9)
					{
						counters[div]=0;
						$('#'+id+'-unit-'+div).html(counters[div]+'');
						testNext=true;
					}else
					{
						counters[div]+=1;
						$('#'+id+'-unit-'+div).html(counters[div]+'');
						testNext=false;
					}
					div++;
				}while(testNext)
			}
			setInterval(unitUpdate,Math.floor(timeinterval));
		}
	};
		
})(jQuery);

