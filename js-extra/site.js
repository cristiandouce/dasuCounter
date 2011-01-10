$(document).ready(function(){
	
	function CounterBoard(id,maxlength,timeinterval,startson){
		if ($('#'+id).length > 0) {

			var number =  Math.floor(startson) + '';

			var counters = number.split('');

			counters.reverse();

			for (i=0;i<maxlength;i++)
			{
				$('#'+id).prepend('<span id="'+id+'-unit-'+i+'" class="counterunit"></span>');
			}

			$('#'+id).prepend('<div class="black-cover"></div>');

			for(i=0;i<maxlength;i++)
			{
				counters[i] = counters[i] ? parseInt(counters[i]) : 0;

				$('#'+id+'-unit-'+i).html(counters[i]+'');

			}

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

	}

	year = new Date().getFullYear();
	start = new Date(year,0,1,0,0,0);
	now = new Date();
	production = (7*(now - start))/1000;

	CounterBoard('myCounter',9,1000/7,production);
	
	//testing
	$('#dasuCounter').dasuCounter(9,1500,100);
	
	
});
