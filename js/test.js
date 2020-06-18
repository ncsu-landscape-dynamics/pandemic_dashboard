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

		const months = [
			"T0",
			"T1",
			"T2",
			"T3",
			"T4",
			"T5",
			"T6",
			"T7",
			"T8",
			"T9",
			"T10",
			"T11",
			"T12",
			"T13",
			"T14",
			"T15",
			"T16",
			"T17",
			"T18",
			"T19",
			"T20",
			"T21",
			"T22",
			"T23",
			"T24",
			"T25",
			"T26"
            ];
            


                function filterBy(month) {
                    var filters = ['==', 'month', month];
                    map.setFilter('earthquake-circles', filters);
                    map.setFilter('earthquake-labels', filters);
            
                    // Set the label to the month
                    console.log(document.getElementById('month').textContent = months[month]);
                    // );
                }
            
                map.on('load', function() {
                    // Data courtesy of http://earthquake.usgs.gov/
                    // Query for significant earthquakes in 2015 URL request looked like this:
                    // http://earthquake.usgs.gov/fdsnws/event/1/query
                    //    ?format=geojson
                    //    &starttime=2015-01-01
                    //    &endtime=2015-12-31
                    //    &minmagnitude=6'
                    //
                    // Here we're using d3 to help us make the ajax request but you can use
                    // Any request method (library or otherwise) you wish.
                    d3.json(
                        'https://docs.mapbox.com/mapbox-gl-js/assets/significant-earthquakes-2015.geojson',
                        function(err, data) {
                            if (err) throw err;
            
                            // Create a month property value based on time
                            // used to filter against.
                            data.features = data.features.map(function(d) {
                                d.properties.month = new Date(d.properties.time).getMonth();
                                return d;
                                console.log(d);
                            });
            
                            map.addSource('earthquakes', {
                                'type': 'geojson',
                                data: data
                            });
            
                            map.addLayer({
                                'id': 'earthquake-circles',
                                'type': 'circle',
                                'source': 'earthquakes',
                                'paint': {
                                    'circle-color': [
                                        'interpolate',
                                        ['linear'],
                                        ['get', 'mag'],
                                        6,
                                        '#FCA107',
                                        8,
                                        '#7F3121'
                                    ],
                                    'circle-opacity': 0.75,
                                    'circle-radius': [
                                        'interpolate',
                                        ['linear'],
                                        ['get', 'mag'],
                                        6,
                                        20,
                                        8,
                                        40
                                    ]
                                }
                            });
            
                            map.addLayer({
                                'id': 'earthquake-labels',
                                'type': 'symbol',
                                'source': 'earthquakes',
                                'layout': {
                                    'text-field': [
                                        'concat',
                                        ['to-string', ['get', 'mag']],
                                        'm'
                                    ],
                                    'text-font': [
                                        'Open Sans Bold',
                                        'Arial Unicode MS Bold'
                                    ],
                                    'text-size': 12
                                },
                                'paint': {
                                    'text-color': 'rgba(0,0,0,0.5)'
                                }
                            });
            
                            // Set filter to first month of the year
                            // 0 = January
                            filterBy(0);
            
                            document
                                .getElementById('slider')
                                .addEventListener('input', function(e) {
                                    var month = parseInt(e.target.value, 10);
                                    filterBy(month);
                                });
                        }
                    );
                });
     