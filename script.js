
var marginTop = 50;
var marginLeft = 50;
var width = 600;
var height = 300;

var data = [
			{name:'UK',value:50},
			{name:'France',value:40},
			{name:'Russia',value:60},
			{name:'NZ',value:80}
		];

d3.xml('assets.svg').mimeType('image/svg+xml').get(function(error,xml){
	

	var importedNode = document.importNode(xml.documentElement,true);

	var svg = d3.select('#graph');

	var graph = svg.append('g')
					.attr('transform','translate('+marginLeft+','+marginTop+')')

	var barGroups = graph.selectAll('g')
						.data(data)
						.enter()
						.append('g')
						.attr('transform',function(d,i){ return 'translate('+ (i*150+50) +',0)'})

	barGroups.append('rect')
			.attr('class','backLayer')
			.attr('width',100)
			.attr('height',height)
			.attr('fill','rgba(0,0,0,0.2)')

	var yScale = d3.scaleLinear()
					.domain([0,100])
					.range([height,0])

	barGroups.append('rect')
			.attr('class','wineLevel')
			.attr('width',100)
			.attr('fill','rgba(45,18,22,1)')

			.attr('y',height)
			.attr('height',0)

			.transition()
			.duration(3000)

			.attr('y',function(d){ return yScale(d.value) })
			.attr('height',function(d){ return height - yScale(d.value) });
			

	barGroups.each(function(d){
		var flag = importedNode.querySelector('#'+d.name);
		//refers to g as DOM node
		this.appendChild(flag);

		graph.select('#'+d.name)
			.attr('transform', 'scale(1.7) , translate(-3,110)')

	});

	var defs = importedNode.querySelector('defs');
	svg.node().appendChild(defs);
	barGroups.style('clip-path','url(#bottleClip)')

	//axis
	var yAxisGen = d3.axisLeft(yScale).ticks(4);
	graph.append('g')
		.call(yAxisGen);

	//annotations

	var annotationData = [
		{
			type:d3.annotationCalloutCircle,

			note:{
				title:'Here we are',
				label:'we like drinks',
				wrap: 100
			},
			subject:{
				radius:20
			},
			x:600,
			y:110,
			dx:-20,
			dy:-20
		}
	];

	var annotationGen = d3.annotation()
						.type(d3.annotationLabel)
						.annotations(annotationData);
	svg.append('g')
		.attr('class','annotation-group')
		.call(annotationGen)


});











