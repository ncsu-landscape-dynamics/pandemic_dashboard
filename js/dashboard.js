mapboxgl.accessToken = 'pk.eyJ1Ijoic3BhY2V0aW1lLWVjb2xvZ3kiLCJhIjoiY2s3bHlmZjNjMGFubTNlcW5zODI3cWpuaiJ9.OZegWFSdGN3-Ge25TJ5vVw';
	var map = new mapboxgl.Map({
	  container: 'map',
	  style: 'mapbox://styles/spacetime-ecology/ck84k0fvr20u91io74dkp7myq',
	  //center: [-96, 32.8],
	  center: [30, 32.8],
	  zoom: 1.7
	});

	// Cairo
	var origin = [30, 31];

	// Belfast
	var destination = [-6.1, 53.3];

	// Cairo
	 var origin2 = [30, 31];
	
	// Bogota
	var destination2 = [-74, 5];

	// Cairo
	//var origin3 = [30, 31];
	// Cartegena
	var origin3 = [-75.5, 10.4];

	// San Francisco
	//var destination3 = [90, 24];
	// Houston
	var destination3 = [-94.8, 29.3];

	// Fiji
	//var origin4 = [-180, -17];
	// Fiji
	var origin4 = [-10.3, 52.1];

	// San Francisco
	//var destination4 = [-120.5, 34.4];
	// San Francisco
	var destination4 = [-77.9, 34.1];


	// A simple line from origin to destination.
	var route = {
	  'type': 'FeatureCollection',
	  'features': [{
	    'type': 'Feature',
	    'geometry': {
	      'type': 'LineString',
	      'coordinates': [origin, destination]
	    }
	  }]
	};

	var route2 = {
	  'type': 'FeatureCollection',
	  'features': [{
	    'type': 'Feature',
	    'geometry': {
	      'type': 'LineString',
	      'coordinates': [origin2, destination2]
	    }
	  }]
	};

	var route3 = {
	  'type': 'FeatureCollection',
	  'features': [{
	    'type': 'Feature',
	    'geometry': {
	      'type': 'LineString',
	      'coordinates': [origin3, destination3]
	    }
	  }]
	};

	var route4 = {
	  'type': 'FeatureCollection',
	  'features': [{
	    'type': 'Feature',
	    'geometry': {
	      'type': 'LineString',
	      'coordinates': [origin4, destination4]
	    }
	  }]
	};

	// A single point that animates along the route.
	// Coordinates are initially set to origin.
	var point = {
	  'type': 'FeatureCollection',
	  'features': [{
	    'type': 'Feature',
	    'properties': {},
	    'geometry': {
	      'type': 'Point',
	      'coordinates': origin
	    }
	  }]
	};

	var point2 = {
	  'type': 'FeatureCollection',
	  'features': [{
	    'type': 'Feature',
	    'properties': {},
	    'geometry': {
	      'type': 'Point',
	      'coordinates': origin2
	    }
	  }]
	};

	var point3 = {
	  'type': 'FeatureCollection',
	  'features': [{
	    'type': 'Feature',
	    'properties': {},
	    'geometry': {
	      'type': 'Point',
	      'coordinates': origin3
	    }
	  }]
	};

	var point4 = {
	  'type': 'FeatureCollection',
	  'features': [{
	    'type': 'Feature',
	    'properties': {},
	    'geometry': {
	      'type': 'Point',
	      'coordinates': origin4
	    }
	  }]
	};

	// Calculate the distance in kilometers between route start/end point.
	var lineDistance = turf.lineDistance(route.features[0], 'kilometers');
	var arc = [];

	var lineDistance2 = turf.lineDistance(route2.features[0], 'kilometers');
	var arc2 = [];

	var lineDistance3 = turf.lineDistance(route3.features[0], 'kilometers');
	var arc3 = [];

	var lineDistance4 = turf.lineDistance(route4.features[0], 'kilometers');
	var arc4 = [];

	// Number of steps to use in the arc and animation, more steps means
	// a smoother arc and animation, but too many steps will result in a
	// low frame rate
	var steps = 500;

	// Draw an arc between the `origin` & `destination` of the two points
	for (var i = 0; i < lineDistance; i += lineDistance / steps) {
	  var segment = turf.along(route.features[0], i, 'kilometers');
	  arc.push(segment.geometry.coordinates);
	}

	for (var i = 0; i < lineDistance2; i += lineDistance2 / steps) {
	  var segment2 = turf.along(route2.features[0], i, 'kilometers');
	  arc2.push(segment2.geometry.coordinates);
	}

	for (var i = 0; i < lineDistance3; i += lineDistance3 / steps) {
	  var segment3 = turf.along(route3.features[0], i, 'kilometers');
	  arc3.push(segment3.geometry.coordinates);
	}

	for (var i = 0; i < lineDistance4; i += lineDistance4 / steps) {
	  var segment4 = turf.along(route4.features[0], i, 'kilometers');
	  arc4.push(segment4.geometry.coordinates);
	}

	// Update the route with calculated arc coordinates
	route.features[0].geometry.coordinates = arc;
	route2.features[0].geometry.coordinates = arc2;
	route3.features[0].geometry.coordinates = arc3;
	route4.features[0].geometry.coordinates = arc4;

	// Used to increment the value of the point measurement against the route.
	var counter = 0;



var timesteps = [
	["Probability of introduction T0"],
	["Probability of introduction T1"],
	["Probability of introduction T2"],
	["Probability of introduction T3"],
	["Probability of introduction T4"],
	["Probability of introduction T5"],
	["Probability of introduction T6"],
	["Probability of introduction T7"],
	["Probability of introduction T8"],
	["Probability of introduction T9"],
	["Probability of introduction T10"],
	["Probability of introduction T11"],
	["Probability of introduction T12"],
	["Probability of introduction T13"],
	["Probability of introduction T14"],
	["Probability of introduction T15"],
	["Probability of introduction T16"],
	["Probability of introduction T17"],
	["Probability of introduction T18"],
	["Probability of introduction T19"],
	["Probability of introduction T20"],
	["Probability of introduction T21"],
	["Probability of introduction T22"],
	["Probability of introduction T23"],
	["Probability of introduction T24"],
	["Probability of introduction T25"],
	["Probability of introduction T26"]
		// var years = [
	// 	"1993", 
	// 	"1994", 
	// 	"1995", 
	// 	"1996", 
	// 	"1997", 
	// 	"1998", 
	// 	"1999", 
	// 	"2000",
	// 	"2001", 
	// 	"2002",
	// 	"2003", 
	// 	"2004", 
	// 	"2005", 
	// 	"2006", 
	// 	"2007", 
	// 	"2008",
	// 	"2009",
	// 	"2010",
	// 	"2011",
	// 	"2012", 
	// 	"2013", 
	// 	"2014", 
	// 	"2015", 
	// 	"2016", 
	// 	"2017", 
	// 	"2018"
	// 	];
];

function filterBy(timestep) {
	var filters = ['match', ['get', timesteps]].concat(timestep);
	map.setFilter('pandemic_output', filters);
	// Set the label to the month
	document.getElementById('timestep').innerText = timestep;
}
// console.log(filters);

	map.on('load', function () {
		d3.json(
            'https://raw.githubusercontent.com/ncsu-landscape-dynamics/pandemic_dashboard/master/pandemic_output.geojson',
            function(err, data) {
				if (err) throw err;
                // Create a year property value based on timestep
				// used to filter against.
				data.features = data.features.map(function(d) {
					
					document.getElementById('slider').addEventListener('input', function(e) {
						// var timestep = parseInt(e.target.value)
						for (var i = 0; i < 27; i++) {
						// console.log(timestep);
						d.properties.timesteps = timesteps
						// console.log(d.properties.timesteps )

						var id = JSON.stringify(timesteps[i]);
						var id_step  = id.slice(31,33).replace(/\"/g, "");
						// console.log(id_step);
						// n = 30;
						// var timestep =  
						// d.properties.id_step =  id_step;
						// console.log(d.properties);
						// return timestep;
					}
					// timestep);

                        if (map.getLayer("pandemic_output")) {
                            map.removeLayer("pandemic_output");
                        };

                        if (map.getSource("pandemic")) {
                            map.removeSource("pandemic");
						};
						map.addSource('pandemic', {
							'type': 'geojson',
							data: d
						});
						// timesteps = JSON.stringify(timesteps);
						// console.log(JSON.stringify(timesteps));
						// var expression = ['match', ['get', timesteps]];
						
						// // Last value is the default, used where there is no data
						// expression.push('rgba(0,0,0,0)');
						timestep = [].concat.apply([], timesteps);
						console.log( timestep);
						
						// year_step = console.log(JSON.stringify(year));
						// ].concat.apply([], timesteps

						map.addLayer({
							'id': 'pandemic_output',
								'type': 'fill',
								'source': 'pandemic',
								'layout': {},
								'paint': {
									'fill-color': {
										// expression
										// property: ['match', ['get', timestep ]], 
										stops: [
										[0, '#0D0887'],	
										[0.1, '#42049E'], 
										[0.2, '#6A00A8'],	
										[0.3, '#900DA4'],
										[0.4, '#B12A90'], 
										[0.5, '#CC4678'],	
										[0.6, '#E16462'], 
										[0.7, '#F1844B'],
										[0.8, '#FCA636'], 
										[0.9, '#FCCE25'],	
										[1, '#F0F921']
									]
								}, 
								'fill-opacity': 0.6,
									},
						});
                        // update text in the UI
                      });
						return  d;
				})
				// document.getElementById('timesteps').innerText = timesteps;
		
			  // Add a source and layer displaying a point which will be animated along a route.
			  map.addSource('route', {
				'type': 'geojson',
				'data': route
			  });
		
			  map.addSource('point', {
				'type': 'geojson',
				'data': point
			  });
		
			  map.addLayer({
				'id': 'route',
				'source': 'route',
				'type': 'line',
				'paint': {
				  'line-width': 2,
				  'line-color': '#AAAAAA',
				  'line-opacity': .2
				}
			  });
		
			  map.addLayer({
				'id': 'point',
				'source': 'point',
				'type': 'symbol',
				'layout': {
				  'icon-image': 'airport-15',
				  'icon-rotate': ['get', 'bearing'],
				  'icon-rotation-alignment': 'map',
				  'icon-allow-overlap': true,
				  'icon-ignore-placement': true,
				  //'icon-size' : .67
				}
			  });
		
			  map.addSource('route2', {
				'type': 'geojson',
				'data': route2
			  });
		
			  map.addSource('point2', {
				'type': 'geojson',
				'data': point2
			  });
		
			  map.addLayer({
				'id': 'route2',
				'source': 'route2',
				'type': 'line',
				'paint': {
				  'line-width': 2,
				  'line-color': '#AAAAAA',
				  'line-opacity': .2
				}
			  });
		
			  map.addLayer({
				'id': 'point2',
				'source': 'point2',
				'type': 'symbol',
				'layout': {
				  'icon-image': 'airport-15',
				  'icon-rotate': ['get', 'bearing'],
				  'icon-rotation-alignment': 'map',
				  'icon-allow-overlap': true,
				  'icon-ignore-placement': true
				}
			  });
		
			  map.addSource('route3', {
				'type': 'geojson',
				'data': route3
			  });
		
			  map.addSource('point3', {
				'type': 'geojson',
				'data': point3
			  });
		
			  map.addLayer({
				'id': 'route3',
				'source': 'route3',
				'type': 'line',
				'paint': {
				  'line-width': 2,
				  'line-color': '#AAAAAA',
				  'line-opacity': .2
				}
			  });
		
			  map.addLayer({
				'id': 'point3',
				'source': 'point3',
				'type': 'symbol',
				'layout': {
				  'icon-image': 'in-national-2',
				  'icon-rotate': ['get', 'bearing'],
				  'icon-rotation-alignment': 'map',
				  'icon-allow-overlap': true,
				  'icon-ignore-placement': true,
				  'icon-size' : .67
				}
			  });
		
			  map.addSource('route4', {
				'type': 'geojson',
				'data': route4
			  });
		
			  map.addSource('point4', {
				'type': 'geojson',
				'data': point4
			  });
		
			  map.addLayer({
				'id': 'route4',
				'source': 'route4',
				'type': 'line',
				'paint': {
				  'line-width': 2,
				  'line-color': '#AAAAAA',
				  'line-opacity': .2
				}
			  });
		
			  map.addLayer({
				'id': 'point4',
				'source': 'point4',
				'type': 'symbol',
				'layout': {
				  'icon-image': 'in-national-2',
				  'icon-rotate': ['get', 'bearing'],
				  'icon-rotation-alignment': 'map',
				  'icon-allow-overlap': true,
				  'icon-ignore-placement': true,
				  'icon-size' : .67
				}
			  });
		
			  var stateLegendEl = document.getElementById('state-legend');
			  var borderLegendEl = document.getElementById('border-legend');
		
		
			  function animate() {
				// Update point geometry to a new position based on counter denoting
				// the index to access the arc.
				point.features[0].geometry.coordinates =
				route.features[0].geometry.coordinates[counter];
		
				point2.features[0].geometry.coordinates =
				route2.features[0].geometry.coordinates[counter];
				
				point3.features[0].geometry.coordinates =
				route3.features[0].geometry.coordinates[counter];
		
				point4.features[0].geometry.coordinates =
				route4.features[0].geometry.coordinates[counter];
		
				// Calculate the bearing to ensure the icon is rotated to match the route arc
				// The bearing is calculate between the current point and the next point, except
				// at the end of the arc use the previous point and the current point
				point.features[0].properties.bearing = turf.bearing(
				  turf.point(
					route.features[0].geometry.coordinates[
					  counter >= steps ? counter - 1 : counter
					]
				  ),
				  turf.point(
					route.features[0].geometry.coordinates[
					  counter >= steps ? counter : counter + 1
					]
				  )
				);
		
				point2.features[0].properties.bearing = turf.bearing(
				  turf.point(
					route2.features[0].geometry.coordinates[
					  counter >= steps ? counter - 1 : counter
					]
				  ),
				  turf.point(
					route2.features[0].geometry.coordinates[
					  counter >= steps ? counter : counter + 1
					]
				  )
				);
		
				point3.features[0].properties.bearing = 180+turf.bearing(
				  turf.point(
					route3.features[0].geometry.coordinates[
					  counter >= steps ? counter - 1 : counter
					]
				  ),
				  turf.point(
					route3.features[0].geometry.coordinates[
					  counter >= steps ? counter : counter + 1
					]
				  )
				);
		
				point4.features[0].properties.bearing = 180+turf.bearing(
				  turf.point(
					route4.features[0].geometry.coordinates[
					  counter >= steps ? counter - 1 : counter
					]
				  ),
				  turf.point(
					route4.features[0].geometry.coordinates[
					  counter >= steps ? counter : counter + 1
					]
				  )
				);
		
				// Update the source with this new data.
				map.getSource('point').setData(point);
				map.getSource('point2').setData(point2);
				map.getSource('point3').setData(point3);
				map.getSource('point4').setData(point4);
		
				// Request the next frame of animation so long the end has not been reached.
				if (counter < steps) {
				  requestAnimationFrame(animate);
				}
				counter = counter + 1;
			  }
		
			  document.getElementById('replay').addEventListener('click', function () {
				// Set the coordinates of the original point back to origin
				point.features[0].geometry.coordinates = origin;
				point2.features[0].geometry.coordinates = origin2;
				point3.features[0].geometry.coordinates = origin3;
				point4.features[0].geometry.coordinates = origin4;
				// Update the source layer
				map.getSource('point').setData(point);
				map.getSource('point2').setData(point2);
				map.getSource('point3').setData(point3);
				map.getSource('point4').setData(point4);
				// Reset the counter
				counter = 0;
				// Restart the animation.
				animate(counter);
			  });
		
			  // Start the animation.
			  animate(counter);


	
			}
		);
    });