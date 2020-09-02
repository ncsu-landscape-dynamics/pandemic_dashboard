// import React, {useState, useRef, useCallback, Component }  from 'react';
// import logo from './logo.svg';
// import MapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
// import { render } from "react-dom";
// import { Icon } from "semantic-ui-react";
// import ReactMapboxGl from 'react-mapbox-gl';
// import DeckGL from '@deck.gl/react';
// import {StaticMap} from 'react-map-gl';
// import StylesControl from 'mapbox-gl-controls/lib/styles';
// import CompassControl from 'mapbox-gl-controls/lib/compass';
// import RulerControl from 'mapbox-gl-controls/lib/ruler';
// import ZoomControl from 'mapbox-gl-controls/lib/zoom';
// import LanguageControl from 'mapbox-gl-controls/lib/language';
// import InspectControl from 'mapbox-gl-controls/lib/inspect';
// import TooltipControl from 'mapbox-gl-controls/lib/tooltip';
// import { json } from 'd3-request';
import React from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl'
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import data from './pandemic_output.json'
import presence_data from './presence_pandemic.json'
import native_data from './native.json'
import Tooltip from './components/tooltip'
import ReactDOM from 'react-dom'
import {ArcLayer} from '@deck.gl/layers';
import {MapboxLayer} from '@deck.gl/mapbox';
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import arcData from './arcs.json'
import {COORDINATE_SYSTEM} from '@deck.gl/core';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NtaWxsYXIiLCJhIjoiY2pvcDhrbGl4MDFvaTNrczR0d2hxcjdnNSJ9.JYgBw6y2pEq_AEAOCaoQpw'
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2NtaWxsYXIiLCJhIjoiY2pvcDhrbGl4MDsFvaTNrczR0d2hxcjdnNSJ9.JYgBw6y2pEq_AEAOCaoQpw'

var stops =  [
  [0.0, 'rgba(0,0,0, 0.36)'],
  [0.001, 'rgba(255,255,204, 0.5)'], //[0.001, 'rgba(125, 0, 100, 0.36)'],
  //[0.1, 'rgba(255,240,168, 0.5)'],	
  //[0.2, 'rgba(254,225,134, 0.5)'],			
  //[0.3, 'rgba(254,201,101, 0.6)'], 
  //[0.4, 'rgba(253,170,72, 0.6)'],	
  [0.5, 'rgba(253,141,60, 0.7)'], 
  //[0.6, 'rgba(252,90,45, 0.7)'],		
  //[0.7, 'rgba(236,46,33, 0.8)'], 
  //[0.8, 'rgba(211,15,32, 0.8)'],	
  //[0.9, 'rgba(176,0,38, 0.8)'],
  [1.0, 'rgba(128,0,38, 0.9)'] //[1.0, 'rgba(255,40,40, .9)'] 
]

const options = [{
  name: '2000',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2000',
  presenceProperty: 'Presence 2000',
  stops: stops
}, {
  name: '2001',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2001',
  presenceProperty: 'Presence 2001',
  stops: stops
}, {
  name: '2002',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2002',
  presenceProperty: 'Presence 2002',
  stops: stops
}, {
  name: '2003',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2003',
  presenceProperty: 'Presence 2003',
  stops: stops
}, {
  name: '2004',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2004',
  presenceProperty: 'Presence 2004',
  stops: stops
}, {
  name: '2005',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2005',
  presenceProperty: 'Presence 2005',
  stops: stops
}, {
  name: '2006',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2006',
  presenceProperty: 'Presence 2006',
  stops: stops
}, {
  name: '2007',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2007',
  presenceProperty: 'Presence 2007',
  stops: stops
}, {
  name: '2008',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2008',
  presenceProperty: 'Presence 2008',
  stops: stops
}, {
  name: '2009',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2009',
  presenceProperty: 'Presence 2009',
  stops: stops
}, {
  name: '2010',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2010',
  presenceProperty: 'Presence 2010',
  stops: stops
}, {
  name: '2011',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2011',
  presenceProperty: 'Presence 2011',
  stops: stops
}, {
  name: '2012',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2012',
  presenceProperty: 'Presence 2012',
  stops: stops
}, {
  name: '2013',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2013',
  presenceProperty: 'Presence 2013',
  stops: stops
}, {
  name: '2014',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2014',
  presenceProperty: 'Presence 2014',
  stops: stops
}, {
  name: '2015',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2015',
  presenceProperty: 'Presence 2015',
  stops: stops
}, {
  name: '2016',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2016',
  presenceProperty: 'Presence 2016',
  stops: stops
}, {
  name: '2017',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2017',
  presenceProperty: 'Presence 2017',
  stops: stops
}, {
  name: '2018',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2018',
  presenceProperty: 'Presence 2018',
  stops: stops
}, {
  name: '2019',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2019',
  presenceProperty: 'Presence 2019',
  stops: stops
}, {
  name: '2020',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2020',
  presenceProperty: 'Presence 2020',
  stops: stops
}, {
  name: '2021',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2021',
  presenceProperty: 'Presence 2021',
  stops: stops
}, {
  name: '2022',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2022',
  presenceProperty: 'Presence 2022',
  stops: stops
}, {
  name: '2023',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2023',
  presenceProperty: 'Presence 2023',
  stops: stops
}, {
  name: '2024',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2024',
  presenceProperty: 'Presence 2024',
  stops: stops
}, {
  name: '2025',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2025',
  presenceProperty: 'Presence 2025',
  stops: stops
}, {
  name: '2026',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2026',
  presenceProperty: 'Presence 2026',
  stops: stops
}, {
  name: '2027',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2027',
  presenceProperty: 'Presence 2027',
  stops: stops
}, {
  name: '2028',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2028',
  presenceProperty: 'Presence 2028',
  stops: stops
}
]

// const markerList = [{
//   name: '2000',
//   description: 'Presence',
//   property: 'Presence 2000'
// }, {
//   name: '2001',
//   description: 'Presence',
//   property: 'Presence 2001'
// }, {
//   name: '2002',
//   description: 'Presence',
//   property: 'Presence 2002'
// }, {
//   name: '2003',
//   description: 'Presence',
//   property: 'Presence 2003'
// }, {
//   name: '2004',
//   description: 'Presence',
//   property: 'Presence 2004'
// }, {
//   name: '2005',
//   description: 'Presence',
//   property: 'Presence 2005'
// }, {
//   name: '2006',
//   description: 'Presence',
//   property: 'Presence 2006'
// }, {
//   name: '2007',
//   description: 'Presence',
//   property: 'Presence 2007'
// }, {
//   name: '2008',
//   description: 'Presence',
//   property: 'Presence 2008'
// }, {
//   name: '2009',
//   description: 'Presence',
//   property: 'Presence 2009'
// }, {
//   name: '2010',
//   description: 'Presence',
//   property: 'Presence 2010'
// }, {
//   name: '2011',
//   description: 'Presence',
//   property: 'Presence 2011'
// }, {
//   name: '2012',
//   description: 'Presence',
//   property: 'Presence 2012'
// }, {
//   name: '2013',
//   description: 'Presence',
//   property: 'Presence 2013'
// }, {
//   name: '2014',
//   description: 'Presence',
//   property: 'Presence 2014'
// }, {
//   name: '2015',
//   description: 'Presence',
//   property: 'Presence 2015'
// }, {
//   name: '2016',
//   description: 'Presence',
//   property: 'Presence 2016'
// }, {
//   name: '2017',
//   description: 'Presence',
//   property: 'Presence 2017'
// }, {
//   name: '2018',
//   description: 'Presence',
//   property: 'Presence 2018'
// }, {
//   name: '2019',
//   description: 'Presence',
//   property: 'Presence 2019'
// }, 
/*{
  name: '2013',
  description: 'Presence',
  property: 'Presence 2013'
}, {
  name: '2014',
  description: 'Presence',
  property: 'Presence 2014'
}, {
  name: '2015',
  description: 'Presence',
  property: 'Presence 2015'
}, {
  name: '2016',
  description: 'Presence',
  property: 'Presence 2016'
}, {
  name: '2017',
  description: 'Presence',
  property: 'Presence 2017'
}, {
  name: '2018',
  description: 'Presence',
  property: 'Presence 2018'
}
]*/


// const arcOptions = [{
//   name: '1993',
//   property: 'id',
// }, {
//   name: '1994',
//   property: 'id',
// }, {
//   name: '1995',
//   property: 'id',
// }, {
//   name: '1996',  
//   property: 'id',
// }, {
//   name: '1997',
//   property: 'id',
// }, {
//   name: '1998',
//   property: 'id',
// }, {
//   name: '1999',
//   property: 'id',
// }, {
//   name: '2000',
//   property: 'id',
// }, {
//   name: '2001',
//   property: 'id',
// }, {
//   name: '2002',
//   property: 'id',
// }, {
//   name: '2003',
//   property: 'id',
// }, {
//   name: '2004',
//   property: 'id',
// }, {
//   name: '2005',
//   property: 'id',
// }, {
//   name: '2006',
//   property: 'id',
// }, {
//   name: '2007',
//   property: 'id',
// }, {
//   name: '2008',
//   property: 'id',
// }, {
//   name: '2009',
//   property: 'id',
// }
// ]


const myDeckLayer = new MapboxLayer({
  coordinateSystem: COORDINATE_SYSTEM.LNGLAT_OFFSETS,
  id: 'connectionsArcs',
  type: ArcLayer,
  data: arcData,
  getSourceColor: d => [128, 0, 0, 0],
  getTargetColor: d => [255, 255, 255, 0],
  // getFillColor: [255, 0, 0],
  strokeWidth:0.1,
  getSourcePosition: d => d.START,
  getTargetPosition: d => d.END,
  pickable: true,
  auto_highlight: true
});

class App extends React.Component {
  mapRef = React.createRef();

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };


  mapRef = React.createRef();
  map;
  tooltipContainer;

  setTooltip(features) {
    if (features.length) {
      ReactDOM.render(
        React.createElement(
          Tooltip, {
            features
          }
        ),
        this.tooltipContainer
      );
    } else {
      ReactDOM.unmountComponentAtNode(this.tooltipContainer);
    }
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      // width: 0, 
      // height: 0 ,
    //   position : {
    //     latitude: 49.437090,
    //     longitude: 1.097456,
    //  },
      active: options[0] ,
      // active: arcOptions[0] ,
      viewport: {
        // latitude: 17.44212,
        // longitude: 78.391384,
        // zoom: 15,
        // bearing: 0,
        // pitch: 0,
        // width: 0,
        // height: 0
      },
      popupInfo: null
    };
  }

  onViewportChange = viewport => { 
    const {width, height, ...etc} = viewport
    this.setState({viewport: etc})
  } 

  componentDidUpdate() {
    this.setFill();
    // this.addLayer();
  }


  componentDidMount() {
    // const mapRef = useRef()
    this.tooltipContainer = document.createElement('div');
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/gcmillar/ckc13n1qe3rgx1ilchl8u3xax',
      // style: 'mapbox://styles/mapbox/dark-v10',
      center: [40, 40],
      zoom: 1.2,
      pitch: 0,
      minpitchZoom: 1,
      maxBounds: [ [-175, -80], [195, 86] ], // Sets bounds as max extent
      });
      /* Zoom */
      // this.map.addControl(new ZoomControl(), 'top-right');
      // /* Ruler */
      // this.map.addControl(new RulerControl(), 'bottom-left');
      // /* Inspect */
      // this.map.addControl(new InspectControl(), 'bottom-left');
      /* Compass */
      // this.map.addControl(new CompassControl(), 'top-right');

      // Load the data and layers once Mapbox map style loads
      // this.map.on('style.load', () => {
      //   json(arcData);
      // });

    this.map.on('load', () => {
      this.map.addLayer(myDeckLayer);
          
      // if (this.map.getLayer("countries")) {
      //   this.map.removeLayer("countries");
      // };
      // if (this.map.getSource("countries")) {
      //   this.map.removeSource("countries");
      // };

      this.map.addSource('countries', {
        type: 'geojson',
        data
      });

      this.map.addSource('presence_data', {
        type: 'geojson',
        presence_data
      });

      // this.map.addSource('arcLayer', {
      //   type: 'ArcLayer',
      //   arcData
      // });

      this.map.addLayer({
        id: 'countries',
        type: 'fill',
        source: 'countries'
      },'country-label'); 

      this.map.addSource('native_data', {
        type: 'geojson',
        data: native_data
      });

      this.map.addLayer({
        id: 'native_data',
        type: 'fill',
        source: 'native_data',
        paint : {'fill-color' : '#cccccc', 'fill-opacity': 1} //'#198077'
      },'country-label'); 

      // this.map.addLayer({
      //   id: 'presence_data',
      //   // interactive: true,
      //   type: "symbol",
      //   source:  'presence_data',
      //     layout: {
      //       'icon-image': 
      //       ['concat', ['get', 'icon'], '-15'],
      //       'text-field': ['get', 'title'],
      //       'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      //       'text-offset': [0, 0.6],
      //       'text-anchor': 'top'
      //     }
      // }); 
      // this.map.addLayer(arclayer, 'waterway-label');
      //   this.map.addLayer(myDeckLayer, {
      //     id: 'arcLayer',
      //     type: 'ArcLayer',
      //   });
      //   if (this.map.getLayer("arcLayer")) {
      //     this.map.removeLayer("arcLayer");
      // }
      // this.map.on('styledata', function () {
      //   // Triggered when `setStyle` is called.
      //   if (data) addLayer();
      // });
      // this.map.addControl(new mapboxgl.FullscreenControl());
      
    //    presence_data.features.forEach((marker) => {
    //      const markerEl = document.createElement('div');
    //      markerEl.innerHTML = '🐞';
    //      new mapboxgl.Marker(markerEl, { offset: [5,-5] })
    //          .setLngLat(marker.geometry.coordinates)
    //          .addTo(this.map);
    //      markerEl.addEventListener('click', () => {
    //        this.map.flyTo({
    //            center: marker.geometry.coordinates,
    //            zoom: 11,
    //        });
    //      });
    //  });
    
    var myFeatures = this.map.queryRenderedFeatures('countries', 
    {
        layers: 'countries',
       // i'm confident there is data matching this filter 
    }
    );

console.log(myFeatures);
    this.setFill();
    });

    // const {arcId } = this.state.active;
    // console.log(arcId);

    // Original ES6 Class— https://github.com/tobinbradley/mapbox-gl-pitch-toggle-control
    // export default class PitchToggle {
        class PitchToggle {
          constructor({ bearing = -20, pitch = 70, minpitchzoom = null }) {
            this._bearing = bearing;
            this._pitch = pitch;
            this._minpitchzoom = minpitchzoom;
          }
  
          onAdd(map) {
            this._map = map;
            let _this = this;  
            this._btn = document.createElement("button");
            this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
            this._btn.type = "button";
            this._btn["aria-label"] = "Toggle Pitch";
            this._btn.onclick = function() {
              if (map.getPitch() === 0) {
                let options = { pitch: _this._pitch, bearing: _this._bearing };
                if (_this._minpitchzoom && map.getZoom() > _this._minpitchzoom) {
                  options.zoom = _this._minpitchzoom;
                }
                map.easeTo(options);
                _this._btn.className =
                  "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d";
              } else {
                map.easeTo({ pitch: 0, bearing: 0 });
                _this._btn.className =
                  "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
              }
            };
  
            this._container = document.createElement("div");
            this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
            this._container.appendChild(this._btn);
  
            return this._container;
          }
  
          onRemove() {
            this._container.parentNode.removeChild(this._container);
            this._map = undefined;
          }
        }
  
        /* Idea from Stack Overflow https://stackoverflow.com/a/51683226  */
        // class MapboxGLButtonControl {
        //   constructor({
        //     className = "",
        //     title = "",
        //     eventHandler = ""
        //   }) {
        //     this._className = className;
        //     this._title = title;
        //     this._eventHandler = eventHandler;
        //   }
        //   onAdd(map) {
        //     this._btn = document.createElement("button");
        //     this._btn.className = `mapboxgl-ctrl-icon${this._className}`;
        //     this._btn.type = "button";
        //     this._btn.title = this._title;
        //     this._btn.onclick = this._eventHandler;
        //     this._container = document.createElement("div");
        //     this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
        //     this._container.appendChild(this._btn);
        //     return this._container;
        //   }
  
        //   onRemove() {
        //     this._container.parentNode.removeChild(this._container);
        //     this._map = undefined;
        //   }
        // }
  
        /* Event Handlers */
        // function one(event) {
        //   alert("Event handler when clicking on \r\n" + event.target.className);
        //   console.log("event number 1", event);
        // }
  
        // function two(event) {
        //   alert("Event handler when clicking on \r\n" + event.target.className);
        //   console.log("event number 2", event);
        // }
  
        // function three(event) {
        //   alert("Event handler when clicking on \r\n" + event.target.className);
        //   console.log("event number 3", event);
        // }
  
        /* Instantiate new controls with custom event handlers */
        // const ctrlPoint = new MapboxGLButtonControl({
        //   className: "mapbox-gl-draw_point",
        //   title: "Draw Point",
        //   eventHandler: one
        // });
  
        // const ctrlLine = new MapboxGLButtonControl({
        //   className: "mapbox-gl-draw_line",
        //   title: "Draw Line",
        //   eventHandler: two
        // });
  
        // const ctrlPolygon = new MapboxGLButtonControl({
        //   className: "mapbox-gl-draw_polygon",
        //   title: "Draw Polygon",
        //   eventHandler: three
        // });
  
        /* Add Controls to the Map */
        // this.map.addControl(new mapboxgl.NavigationControl(), "top-left");
        this.map.addControl(new MapboxGeocoder({
          accessToken: 'pk.eyJ1IjoiZ2NtaWxsYXIiLCJhIjoiY2pvcDhrbGl4MDFvaTNrczR0d2hxcjdnNSJ9.JYgBw6y2pEq_AEAOCaoQpw',
          mapboxgl: mapboxgl,
          placeholder: 'Search for a Location'
        }), 'top-right');
        this.map.addControl(new PitchToggle({ minpitchzoom: 16 }), "top-right");
  

        // const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
        //   offset: [-120, 0]
        // }).setLngLat([0,0]).addTo(this.map);
    
        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
          });
    
          this.map.on('mouseenter', 'countries', (e) => {
            this.map.getCanvas().style.cursor =  'pointer';
          });
          // console.log(data)
          const { property } = this.state.active;
          const prob_intro = data.features[0].properties[property]
          console.log(prob_intro)
          this.map.on('click', 'countries', (e) => {
            const features = this.map.queryRenderedFeatures(e.point, {
          });
          const { property } = this.state.active;
          const prob_intro = features[0].properties[property]
          this.map.getCanvas().style.cursor = features.length ? 'pointer' : '';
          popup 
          .setLngLat(e.lngLat)
           .setHTML(`<b><u>Country Information</b></u><ul><li><b>Name: </b>${features[0].properties["NAME"]}</li><li><b>Introduction Probability: </b>${prob_intro}</li></ul>`)
          .addTo(this.map);
        });

        // setTimeout(function() {
        //   var features = this.map.queryRenderedFeatures({ layers: ['countries'] })
        //   this.map(function(feat) {
        //     return feat.properties && feat.properties.DEV_STATUS;
        //   });
            
        //   console.log(features);
        // }, 500);

        // console.log(this.state.active)
        // const { presenceProperty } = this.state.active;
        // const presenceBool = data.features[0].properties[presenceProperty]
        // console.log(presenceBool)

        const markerEl = document.createElement('div');
        markerEl.innerHTML = '🐞';
        var presenceMarker = new mapboxgl.Marker(markerEl, { offset: [5,-5] })
        presence_data.features.forEach((marker) => {
            presenceMarker
              .setLngLat(marker.geometry.coordinates)
              .addTo(this.map);
                markerEl.addEventListener('click', () => {
                  this.map.flyTo({
                      center: marker.geometry.coordinates,
                      zoom: 3,
                  });
                });
        });
        
    //// with custom styles:
      // this.map.addControl(new StylesControl({
      //   styles: [
      //     {
      //       label: 'Streets',
      //       styleName: 'Mapbox Streets',
      //       styleUrl: 'mapbox://styles/mapbox/streets-v9',
      //     }, {
      //       label: 'Satellite',
      //       styleName: 'Satellite',
      //       styleUrl: 'mapbox://styles/mapbox/satellite-v9',
      //     },
      //   ],
      //   onChange: (style) => console.log(style),

      // }, 
      // // this.map.getSource('countries').setData(data)
      // // this.map.addLayer('countries','country-label')
      // ), 'top-right');

  //   this.map.on('click', 'presence_data', (p) => {
  //     const presenceFeatures = this.map.queryRenderedFeatures(p.point, {
  //   });
  //   // console.log(presenceFeatures)
  // });
    this.map.on('mouseleave', 'countries', (e) => {
      this.map.getCanvas().style.cursor =  '';
      popup.remove();
    });

   
  }
  
  setFill() {
    const { property, stops } = this.state.active;
    this.map.setPaintProperty('countries', 'fill-color', {
      property,
      stops
    },
    )
    this.map.setPaintProperty('countries', 'fill-outline-color', '#7F7F7F',
    )

    // this.map.setPaintProperty('countries', 'fill-color', {
    //   presenceProperty,
    //   stops
    // },
    // )
    // this.map.setPaintProperty('native_data', 'fill-color', '#FFFFFF',
    // )
    // this.map.setPaintProperty('arcLayer',  {
    //   arcId,
    //   // stops
    // },
    // )
    //this.map.setTooltip('presence_data', '', {
    //  property,
    //  stops
    //})  ;
    //;    
  }
  // addLayer() {
  //   const { arcId } = this.state.active;
  //   this.map.addLayer('arcLayer' , {
  //     arcId
  //   }
  //   )
  // }

features () {   
  this.mapRef.current.queryRenderedFeatures( { layers: ['countries'] })
  }

  render() {
    const { 
      viewport,
    } = this.state
    const { name, description, stops, property } = this.state.active;
    const renderLegendKeys = (stop, i) => {
    return ( 
        <div key={i} className='txt-xs '>
          <span className=' round-full w12 h12 inline-block ' style={{ backgroundColor: stop[1] }} />
          <span className='px12 py12' >{`${stop[0].toLocaleString()}`}</span>
        </div>
      );
    }

   
    const renderOptions = (option, i) => {
      return (
        <label key={i} className="toggle-container w36 maxw60 pa24">
          <input  onChange={() => this.setState({ active: options[i] })} checked={option.property === property} name="toggle" type="radio" />
          <div  className="toggle txt-xs color-white toggle--gray  toggle--active-darken100 maxw60 w50 pl6 pr6">{option.name}</div>
        </label>
      );
    }
    // const [data, setData] = useState()
    // const [setViewport] = useState({
    //   latitude: 49.437090,
    //     longitude: 1.097456,
    // })
    // useEffect(() => {
    //   fetch('../data.json')
    //     .then(res => res.json())
    //     .then(res => setData(res))
    // },[])
    // const handleClick = () => {
    //   setData(filterRamps())
    // }
    
    return (
      <div>
        <div ref={this.mapRef} 
        {...viewport}
        width="100%"
        height="100%"
        // mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        // queryRenderedFeatures={features} 
        className="absolute top right left bottom align-middle grid" />
        <label className=" align-middle top  txt-s mb30 mt3 ml18 ctxt-bold pa0 color-white absolute bg-transparent shadow-darken50 " ><b>Select Year:</b></label>
        <div className="toggle-group grid-2 grid mt24 pl3 pr3 align-middle top ctxt-bold  color-white absolute border border--2 border--white bg-transparent shadow-darken10  ">
        {options.map(renderOptions)} 
        </div>
        <div  className=" bg-transparent px3  grid-3 color-white absolute align-middle bottom w100 left border--white round border border--2 round shadow-darken10  txt-xs">
          <div className=' color-gray-light px3 txt-xs'>
            <h2 className="txt-bold txt-xs block color-white px0 ">{name}</h2>
            <p className='txt-xs color-white px0 py0'>{description}</p>
          </div>
          {stops.map(renderLegendKeys)}
        </div>
      </div>
    );//absolute top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1
  }
}

export default App;
