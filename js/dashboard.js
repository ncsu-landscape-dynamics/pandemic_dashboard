// import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
// import { useState } from 'react';
// import { TrafficControl } from '@urbica/react-map-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3BhY2V0aW1lLWVjb2xvZ3kiLCJhIjoiY2s3bHlmZjNjMGFubTNlcW5zODI3cWpuaiJ9.OZegWFSdGN3-Ge25TJ5vVw';

var map = new mapboxgl.Map({
	  container: 'map',
	//   style: 'mapbox://styles/mapbox/dark-v10',
	//   style: 'mapbox://styles/spacetime-ecology/ck84k0fvr20u91io74dkp7myq',
	  style:'mapbox://styles/mapbox/dark-v9',
	  //center: [-96, 32.8],
	  center: [12, 26],
	  zoom: 1.5,
	  minZoom: 1,
	//   maxBounds: bounds // Sets bounds as max
});

function toggleSidebar(id) {
	var elem = document.getElementById('sidebar');
	var classes = elem.className.split(' ');
	var collapsed = classes.indexOf('collapsed') !== -1;

	var padding = {};

	if (collapsed) {
		// Remove the 'collapsed' class from the class list of the element, this sets it back to the expanded state.
		classes.splice(classes.indexOf('collapsed'), 1);

		padding[id] = 300; // In px, matches the width of the sidebars set in .sidebar CSS class
		map.easeTo({
			padding: padding,
			duration: 2000 // In ms, CSS transition duration property for the sidebar matches this value
		});
	} else {
		padding[id] = 0;
		// Add the 'collapsed' class to the class list of the element
		classes.push('collapsed');

		map.easeTo({
			padding: padding,
			duration: 2000
		});
	}

	// Update the class list on the element
	elem.className = classes.join(' ');
}

// map.on('load', function() {
// 	toggleSidebar('right');
// // });

// var Draw = new MapboxDraw();
// map.addControl(Draw, 'top-right');

// map.on('draw.modechange', (e) => {
// 	const data = Draw.getAll();
// 	if (Draw.getMode() == 'draw_polygon') {
// 	var pids = []
// 	const lid = data.features[data.features.length - 1].id
// 	data.features.forEach((f) => {
// 		if (f.geometry.type === 'Polygon' && f.id !== lid) {
// 		pids.push(f.id)
// 		}
// 	})
// 	Draw.delete(pids)
// 	}
// });

	
// var hoveredStateId = null;
// // Cairo
// var origin = [30, 31];

// // Belfast
// var destination = [-6.1, 53.3];

// // Cairo
// var origin2 = [30, 31];

// // Bogota
// var destination2 = [-74, 5];

// // Cairo
// //var origin3 = [30, 31];
// // Cartegena
// var origin3 = [-75.5, 10.4];

// // San Francisco
// //var destination3 = [90, 24];
// // Houston
// var destination3 = [-94.8, 29.3];

// // Fiji
// //var origin4 = [-180, -17];
// // Fiji
// var origin4 = [-10.3, 52.1];

// // San Francisco
// //var destination4 = [-120.5, 34.4];
// // San Francisco
// var destination4 = [-77.9, 34.1];


// // A simple line from origin to destination.
// var route = {
// 	'type': 'FeatureCollection',
// 	'features': [{
// 	'type': 'Feature',
// 	'geometry': {
// 		'type': 'LineString',
// 		'coordinates': [origin, destination]
// 	}
// 	}]
// };

// var route2 = {
// 	'type': 'FeatureCollection',
// 	'features': [{
// 	'type': 'Feature',
// 	'geometry': {
// 		'type': 'LineString',
// 		'coordinates': [origin2, destination2]
// 	}
// 	}]
// };

// var route3 = {
// 	'type': 'FeatureCollection',
// 	'features': [{
// 	'type': 'Feature',
// 	'geometry': {
// 		'type': 'LineString',
// 		'coordinates': [origin3, destination3]
// 	}
// 	}]
// };

// var route4 = {
// 	'type': 'FeatureCollection',
// 	'features': [{
// 	'type': 'Feature',
// 	'geometry': {
// 		'type': 'LineString',
// 		'coordinates': [origin4, destination4]
// 	}
// 	}]
// };

// // A single point that animates along the route.
// // Coordinates are initially set to origin.
// var point = {
// 	'type': 'FeatureCollection',
// 	'features': [{
// 	'type': 'Feature',
// 	'properties': {},
// 	'geometry': {
// 		'type': 'Point',
// 		'coordinates': origin
// 	}
// 	}]
// };

// var point2 = {
// 	'type': 'FeatureCollection',
// 	'features': [{
// 	'type': 'Feature',
// 	'properties': {},
// 	'geometry': {
// 		'type': 'Point',
// 		'coordinates': origin2
// 	}
// 	}]
// };

// var point3 = {
// 	'type': 'FeatureCollection',
// 	'features': [{
// 	'type': 'Feature',
// 	'properties': {},
// 	'geometry': {
// 		'type': 'Point',
// 		'coordinates': origin3
// 	}
// 	}]
// };

// var point4 = {
// 	'type': 'FeatureCollection',
// 	'features': [{
// 	'type': 'Feature',
// 	'properties': {},
// 	'geometry': {
// 		'type': 'Point',
// 		'coordinates': origin4
// 	}
// 	}]
// };
	
// // Calculate the distance in kilometers between route start/end point.
// var lineDistance = turf.lineDistance(route.features[0], 'kilometers');
// var arc = [];

// var lineDistance2 = turf.lineDistance(route2.features[0], 'kilometers');
// var arc2 = [];

// var lineDistance3 = turf.lineDistance(route3.features[0], 'kilometers');
// var arc3 = [];

// var lineDistance4 = turf.lineDistance(route4.features[0], 'kilometers');
// var arc4 = [];

// // Number of steps to use in the arc and animation, more steps means
// // a smoother arc and animation, but too many steps will result in a
// // low frame rate
// var steps = 500;

// // Draw an arc between the `origin` & `destination` of the two points
// for (var i = 0; i < lineDistance; i += lineDistance / steps) {
// 	var segment = turf.along(route.features[0], i, 'kilometers');
// 	arc.push(segment.geometry.coordinates);
// }

// for (var i = 0; i < lineDistance2; i += lineDistance2 / steps) {
// 	var segment2 = turf.along(route2.features[0], i, 'kilometers');
// 	arc2.push(segment2.geometry.coordinates);
// }

// for (var i = 0; i < lineDistance3; i += lineDistance3 / steps) {
// 	var segment3 = turf.along(route3.features[0], i, 'kilometers');
// 	arc3.push(segment3.geometry.coordinates);
// }

// for (var i = 0; i < lineDistance4; i += lineDistance4 / steps) {
// 	var segment4 = turf.along(route4.features[0], i, 'kilometers');
// 	arc4.push(segment4.geometry.coordinates);
// }

// // Update the route with calculated arc coordinates
// route.features[0].geometry.coordinates = arc;
// route2.features[0].geometry.coordinates = arc2;
// route3.features[0].geometry.coordinates = arc3;
// route4.features[0].geometry.coordinates = arc4;

// // Used to increment the value of the point measurement against the route.
// var counter = 0;

// ];
// map.on('load', function() {
// 	map.addSource('route', {
// 		'type': 'geojson',
// 		'data': route
// 	});

// 	map.addSource('point', {
// 		'type': 'geojson',
// 		'data': point
// 	});

// 	map.addLayer({
// 		'id': 'route',
// 		'source': 'route',
// 		'type': 'line',
// 		'paint': {
// 		'line-width': 2,
// 		'line-color': '#AAAAAA',
// 		'line-opacity': .2
// 		}
// 	});

// 	map.addLayer({
// 		'id': 'point',
// 		'source': 'point',
// 		'type': 'symbol',
// 		'layout': {
// 		'icon-image': 'airport-15',
// 		'icon-rotate': ['get', 'bearing'],
// 		'icon-rotation-alignment': 'map',
// 		'icon-allow-overlap': true,
// 		'icon-ignore-placement': true,
// 		//'icon-size' : .67
// 		}
// 	});

// 	map.addSource('route2', {
// 		'type': 'geojson',
// 		'data': route2
// 	});

// 	map.addSource('point2', {
// 		'type': 'geojson',
// 		'data': point2
// 	});

// 	map.addLayer({
// 		'id': 'route2',
// 		'source': 'route2',
// 		'type': 'line',
// 		'paint': {
// 		'line-width': 2,
// 		'line-color': '#AAAAAA',
// 		'line-opacity': .2
// 		}
// 	});

// 	map.addLayer({
// 		'id': 'point2',
// 		'source': 'point2',
// 		'type': 'symbol',
// 		'layout': {
// 		'icon-image': 'airport-15',
// 		'icon-rotate': ['get', 'bearing'],
// 		'icon-rotation-alignment': 'map',
// 		'icon-allow-overlap': true,
// 		'icon-ignore-placement': true
// 		}
// 	});

// 	map.addSource('route3', {
// 		'type': 'geojson',
// 		'data': route3
// 	});

// 	map.addSource('point3', {
// 		'type': 'geojson',
// 		'data': point3
// 	});

// 	map.addLayer({
// 		'id': 'route3',
// 		'source': 'route3',
// 		'type': 'line',
// 		'paint': {
// 		'line-width': 2,
// 		'line-color': '#AAAAAA',
// 		'line-opacity': .2
// 		}
// 	});

// 	map.addLayer({
// 		'id': 'point3',
// 		'source': 'point3',
// 		'type': 'symbol',
// 		'layout': {
// 		'icon-image': 'in-national-2',
// 		'icon-rotate': ['get', 'bearing'],
// 		'icon-rotation-alignment': 'map',
// 		'icon-allow-overlap': true,
// 		'icon-ignore-placement': true,
// 		'icon-size' : .67
// 		}
// 	});

// 	map.addSource('route4', {
// 		'type': 'geojson',
// 		'data': route4
// 	});

// 	map.addSource('point4', {
// 		'type': 'geojson',
// 		'data': point4
// 	});

// 	map.addLayer({
// 		'id': 'route4',
// 		'source': 'route4',
// 		'type': 'line',
// 		'paint': {
// 		'line-width': 2,
// 		'line-color': '#AAAAAA',
// 		'line-opacity': .2
// 		}
// 	});

// 	map.addLayer({
// 		'id': 'point4',
// 		'source': 'point4',
// 		'type': 'symbol',
// 		'layout': {
// 		'icon-image': 'in-national-2',
// 		'icon-rotate': ['get', 'bearing'],
// 		'icon-rotation-alignment': 'map',
// 		'icon-allow-overlap': true,
// 		'icon-ignore-placement': true,
// 		'icon-size' : .67
// 		}
// 	});

// 	var stateLegendEl = document.getElementById('state-legend');
// 	var borderLegendEl = document.getElementById('border-legend');

// 	function animate() {
// 		// Update point geometry to a new position based on counter denoting
// 		// the index to access the arc.
// 		point.features[0].geometry.coordinates =
// 		route.features[0].geometry.coordinates[counter];

// 		point2.features[0].geometry.coordinates =
// 		route2.features[0].geometry.coordinates[counter];
		
// 		point3.features[0].geometry.coordinates =
// 		route3.features[0].geometry.coordinates[counter];

// 		point4.features[0].geometry.coordinates =
// 		route4.features[0].geometry.coordinates[counter];

// 		// Calculate the bearing to ensure the icon is rotated to match the route arc
// 		// The bearing is calculate between the current point and the next point, except
// 		// at the end of the arc use the previous point and the current point
// 		point.features[0].properties.bearing = turf.bearing(
// 		turf.point(
// 			route.features[0].geometry.coordinates[
// 			counter >= steps ? counter - 1 : counter
// 			]
// 		),
// 		turf.point(
// 			route.features[0].geometry.coordinates[
// 			counter >= steps ? counter : counter + 1
// 			]
// 		)
// 		);

// 		point2.features[0].properties.bearing = turf.bearing(
// 		turf.point(
// 			route2.features[0].geometry.coordinates[
// 			counter >= steps ? counter - 1 : counter
// 			]
// 		),
// 		turf.point(
// 			route2.features[0].geometry.coordinates[
// 			counter >= steps ? counter : counter + 1
// 			]
// 		)
// 		);

// 		point3.features[0].properties.bearing = 180+turf.bearing(
// 		turf.point(
// 			route3.features[0].geometry.coordinates[
// 			counter >= steps ? counter - 1 : counter
// 			]
// 		),
// 		turf.point(
// 			route3.features[0].geometry.coordinates[
// 			counter >= steps ? counter : counter + 1
// 			]
// 		)
// 		);

// 		point4.features[0].properties.bearing = 180+turf.bearing(
// 		turf.point(
// 			route4.features[0].geometry.coordinates[
// 			counter >= steps ? counter - 1 : counter
// 			]
// 		),
// 		turf.point(
// 			route4.features[0].geometry.coordinates[
// 			counter >= steps ? counter : counter + 1
// 			]
// 		)
// 		);

// 		// Update the source with this new data.
// 		map.getSource('point').setData(point);
// 		map.getSource('point2').setData(point2);
// 		map.getSource('point3').setData(point3);
// 		map.getSource('point4').setData(point4);

// 		// Request the next frame of animation so long the end has not been reached.
// 		if (counter < steps) {
// 		requestAnimationFrame(animate);
// 		}
// 		counter = counter + 1;
// 	}

// 	document.getElementById('replay').addEventListener('click', function () {
// 		// Set the coordinates of the original point back to origin
// 		point.features[0].geometry.coordinates = origin;
// 		point2.features[0].geometry.coordinates = origin2;
// 		point3.features[0].geometry.coordinates = origin3;
// 		point4.features[0].geometry.coordinates = origin4;
// 		// Update the source layer
// 		map.getSource('point').setData(point);
// 		map.getSource('point2').setData(point2);
// 		map.getSource('point3').setData(point3);
// 		map.getSource('point4').setData(point4);
// 		// Reset the counter
// 		counter = 0;
// 		// Restart the animation.
// 		animate(counter);
// 	});

// 	// Start the animation.
// 	animate(counter);

// });
// var timesteps = [
var years = [
	"1993", //["Probability of introduction T0"],
	"1994", //["Probability of introduction T1"],
	"1995", // ["Probability of introduction T10"],,
	"1996", // ["Probability of introduction T3"],
	"1997", // ["Probability of introduction T4"],
	"1998", // ["Probability of introduction T5"],
	"1999", // ["Probability of introduction T6"],
	"2000", // ["Probability of introduction T7"],
	"2001", // ["Probability of introduction T8"],
	"2002", // ["Probability of introduction T9"],
	"2003", // ["Probability of introduction T10"],
	"2004", // ["Probability of introduction T11"],,
	"2005", // ["Probability of introduction T12"],,
	"2006", // ["Probability of introduction T13"],,
	"2007", // ["Probability of introduction T14"],,
	"2008", // ["Probability of introduction T15"],,
	"2009", // ["Probability of introduction T16"],,
	"2010", // ["Probability of introduction T17"],,
	"2011", // ["Probability of introduction T18"],,
	"2012", // ["Probability of introduction T19"],,
	"2013", // ["Probability of introduction T20"],,
	"2014", // ["Probability of introduction T21"],,
	"2015", // ["Probability of introduction T22"],,
	"2016", // ["Probability of introduction T23"],,
	"2017", // ["Probability of introduction T24"],,
	"2018", // ["Probability of introduction T25"],,
	];

function filterBy(year) {
	var filters = ['==', 'year', year];
	map.setFilter('overlay', filters);
	// map.setFilter('earthquake-labels', filters);

	document.getElementById('year').textContent = years[year];

};

	// Set the label to the month
// document.getElementById('slider').addEventListener('input', function(e) {
// 		var year = parseInt(e.target.value);
// 		document.getElementById('active-year').innerText = year;
// 	});

map.on('load', function() {
	document.getElementById('slider').addEventListener('input', function(e) {
	var year = parseInt(e.target.value);
		// console.log(year);
		var geojsonSource = "https://raw.githubusercontent.com/ncsu-landscape-dynamics/pandemic_dashboard/master/Outputs/pandemic_output_prob" + year + ".geojson";
		d3.json(
			geojsonSource, //the geoJSON data file
			function(err, data) {
			if (err) throw err;
				data.features = data.features.map(function(d) {
						o = d.properties
						var idx = 0; 

						prop = Object.keys(o)[idx];   
						// console.log(prop);          
					
						probIntro = o[prop]   ;
							d.properties.probIntro = probIntro
						//  console.log( probIntro);
							return d;
						}); 
						
						if (map.getLayer("overlay")) {
							map.removeLayer("overlay");
						};
					
						if (map.getSource("myImageSource")) {
							map.removeSource("myImageSource");
						};	
						map.addSource("myImageSource", {
							"type": "geojson",
							"data": data,
							// "tolerance":2,
							'generateId': true // This ensures that all features have unique IDs
							// promoteId: 'index'
						});
								
						map.addLayer({
							"id": "overlay",
							"type": "fill",
							"source": "myImageSource",
							'layout': {},
							'paint': {
								'fill-color': [
								'interpolate',
								['linear'],
								['get', 'probIntro'],
									0, '#0D0887',	
									0.1, '#42049E', 
									0.2, '#6A00A8',	
									0.3, '#900DA4',			
									0.4, '#B12A90', 
									0.5, '#CC4678',	
									0.6, '#E16462', 
									0.7, '#F1844B',		
									0.8, '#FCA636', 
									0.9, '#FCCE25',	
									1, '#F0F921',
								],
							// 	"fill-opacity": ["case",
							// 	["boolean", ["feature-state", "hover"], false],
							// 	1,
							// 	0.5
							// ],
						// }
								'fill-outline-color': [
									'interpolate',
								['linear'],
								['get', 'probIntro'],
									0, '#0D0887',	
									0.1, '#42049E', 
									0.2, '#6A00A8',	
									0.3, '#900DA4',			
									0.4, '#B12A90', 
									0.5, '#CC4678',	
									0.6, '#E16462', 
									0.7, '#F1844B',		
									0.8, '#FCA636', 
									0.9, '#FCCE25',	
									1, '#F0F921',
								],
								
								'fill-opacity': 0.5
								}
						});

						// map.on('click', 'overlay', function(e) {
						// 	new mapboxgl.Popup()
						// 	.setLngLat(e.lngLat)
						// 	.setHTML(e.features[0].probIntro)
						// 	.addTo(map);
						// 	console.log(e.features[0].probIntro)
						// 	});
							 
						// 	// Change the cursor to a pointer when the mouse is over the states layer.
						// 	map.on('mouseenter', 'overlay', function() {
						// 	map.getCanvas().style.cursor = 'pointer';
						// 	});
							 
						// 	// Change it back to a pointer when it leaves.
						// 	map.on('mouseleave', 'overlay', function() {
						// 	map.getCanvas().style.cursor = '';
						// 	});

						// 0 = January
						// filterBy(1993);
							document.getElementById('slider').addEventListener('input', function(e) {
							var year = parseInt(e.target.value);
							filterBy(year);
							document.getElementById('active-year').innerText = year;
							});
							// console.log();

						// document
						// .getElementById('slider')
						// .addEventListener('input', function(e) {
						// var year = parseInt(e.target.value);
						// filterBy(year);
						// });
						// // Change it back to a pointer when it leaves.
						// map.on('mouseleave', 'overlay', function () {
						// 	map.getCanvas().style.cursor = '';
						// });
						// // update text in the UI
						// document.getElementById('active-year').innerText = year;
						// // map.queryRenderedFeatures({
						// 	// layers: geojsonSource
						// 	}); 
					// console.log(probIntro );
				// });
				// Add a source and layer displaying a point which will be animated along a route.
					

							// // var mySlider = new Slider('#date_slider');
							// var margin = { top: 50, right: 10, bottom: 0, left: 10 },
							// 	width = document.getElementById('slider').clientWidth ,
							// 	height = 50 - margin.top - margin.bottom;

							// var moving = false;
							// var currentValue = 0;
							// var targetValue = width;
							// console.log(targetValue);
							// var slider = d3.select("#slider")
							// 		.append("svg")
							// 		.attr("width", width + margin.left + margin.right)
							// 		.attr("height", height + margin.top + margin.bottom)
							// 		.attr("transform", "translate(" + 0 + "," + height + ")");

							// 	var playButton = d3.select("#play-button");
							// 	var x = d3.scaleLinear()//建立映射关系
							// 		.domain([0, years.length - 1])
							// 		.range([0, targetValue])
							// 		.clamp(true);

							// 	slider.append("line")
							// 		.attr("class", "track")
							// 		.attr("x1", x.range()[0])
							// 		.attr("x2", x.range()[1])
							// 		.select(function () { return this.parentNode.appendChild(this.cloneNode(true)); })
							// 		.attr("class", "track-inset")
							// 		.select(function () { return this.parentNode.appendChild(this.cloneNode(true)); })
							// 		.attr("class", "track-overlay")
							// 		.call(d3.drag()
							// 			.on("start.interrupt", function () { slider.interrupt(); })
							// 			.on("start drag", function () {
							// 				currentValue = d3.event.x;
							// 				console.log(currentValue)
							// 				update(x.invert(currentValue));
							// 			})
							// 		);


							// slider.insert("g", ".track-overlay")
							// 	.attr("class", "ticks")
							// 	.attr("transform", "translate(0," + 18 + ")")
							// 	.selectAll("text")
							// 	.data(x.ticks(10))
							// 	.enter()
							// 	.append("text")
							// 	.attr("x", x)
							// 	.attr("y", 10)
							// 	.attr("text-anchor", "middle")
							// 	.text(function (d) {
							// 		return (d + 1);
							// 	});
							// 	var handle = slider.insert("circle", ".track-overlay")
							// 		.attr("class", "handle")
							// 		.attr("r", 9);

							// 	var labels = slider.append("g").append("text")
							// 		.attr("class", "labels")
							// 		.attr("text-anchor", "middle")
							// 		.text(years[0])
							// 		.attr("transform", "translate(0," + (-15) + ")")
							// 		.style("fill", "#4F442B")

							// 	playButton
							// 		.on("click", function () {
							// 			var button = d3.select(this);
							// 			if (button.text() == "Pause") {
							// 				moving = false;
							// 				clearInterval(timer);
							// 				// timer = 0;
							// 				button.text("Play");
							// 			} else {
							// 				moving = true;
							// 				timer = setInterval(step, 1000);//调用interval周期函数
							// 				button.text("Pause");
							// 			}
							// 			console.log("Slider moving: " + moving);//判定是否在运动
							// 		})

							// 	function step() {
							// 		update(x.invert(currentValue));
							// 		currentValue = currentValue + (targetValue / (year.length));
							// 		if (currentValue > targetValue) {
							// 			moving = false;
							// 			currentValue = 0;
							// 			clearInterval(timer);
							// 			// timer = 0;
							// 			playButton.text("Play");
							// 			// console.log("Slider moving: " + moving);
							// 		}
							// 	}
							// 	function update(year) {
							// 		var year = parseInt(year, 10);
							// 		console.log(year)
							// 		handle.attr("cx", x(year));
				
							// 		labels
							// 			.attr("x", x(year))
							// 			.text(years[year]);
				
							// 		filterBy(year);
							// 	}

		
							
								});
							});
						});
