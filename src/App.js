import React, {useState, useRef, useCallback, Component }  from 'react';
import logo from './logo.svg';
import './App.css';
import mapboxgl from 'mapbox-gl'
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import { render } from "react-dom";
import { Icon } from "semantic-ui-react";
import data from './pandemic_output.json'
import presence_data from './presence_pandemic.json'
import Tooltip from './components/tooltip'
import ReactDOM from 'react-dom'
import ReactMapboxGl from 'react-mapbox-gl';
import DeckGL from '@deck.gl/react';
import {ScatterplotLayer, GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import {MapboxLayer} from '@deck.gl/mapbox';
import "mapbox-gl/dist/mapbox-gl.css";
import  "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import StylesControl from 'mapbox-gl-controls/lib/styles';
import CompassControl from 'mapbox-gl-controls/lib/compass';
import RulerControl from 'mapbox-gl-controls/lib/ruler';
import ZoomControl from 'mapbox-gl-controls/lib/zoom';
import LanguageControl from 'mapbox-gl-controls/lib/language';
import InspectControl from 'mapbox-gl-controls/lib/inspect';
import TooltipControl from 'mapbox-gl-controls/lib/tooltip';
import arcData from './arcs.json'
import { json } from 'd3-request';
import {COORDINATE_SYSTEM} from '@deck.gl/core';



mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NtaWxsYXIiLCJhIjoiY2pvcDhrbGl4MDFvaTNrczR0d2hxcjdnNSJ9.JYgBw6y2pEq_AEAOCaoQpw'


const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2NtaWxsYXIiLCJhIjoiY2pvcDhrbGl4MDFvaTNrczR0d2hxcjdnNSJ9.JYgBw6y2pEq_AEAOCaoQpw'

var stops =  [
  [0, 'rgba(45,69,132, 0.4)'],	
  [0.1, 'rgba(77,30,129, 0.4)'],	
  [0.2, 'rgba(109,41,126, 0.4)'],			
  [0.3, 'rgba(141,52,123, 0.4)'], 
  [0.4, 'rgba(173,63,120, 0.4)'],	
  [0.5, 'rgba(205,74,118, 0.4)'], 
  [0.6, 'rgba(210,103,103	, 0.4)'],		
  [0.7, 'rgba(216,132,89,0.7)'], 
  [0.8, 'rgba(222,161,75, 0.4)'],	
  [0.9, 'rgba(228,190,61, 0.4)'],
  [1, 'rgba(240,249,33, 0.4)']
]


const options = [{
  name: '1993',
  description: 'Introduction Probability',
  property: 'Probability of introduction T0',
  stops: stops
}, {
  name: '1994',
  description: 'Introduction Probability',
  property: 'Probability of introduction T1',
  stops: stops
}, {
  name: '1995',
  description: 'Introduction Probability',
  property: 'Probability of introduction T2',
  stops: stops
}, {
  name: '1996',
  description: 'Introduction Probability',
  property: 'Probability of introduction T3',
  stops: stops
}, {
  name: '1997',
  description: 'Introduction Probability',
  property: 'Probability of introduction T4',
  stops: stops
}, {
  name: '1998',
  description: 'Introduction Probability',
  property: 'Probability of introduction T5',
  stops: stops
}, {
  name: '1999',
  description: 'Introduction Probability',
  property: 'Probability of introduction T6',
  stops: stops
}, {
  name: '2000',
  description: 'Introduction Probability',
  property: 'Probability of introduction T7',
  stops: stops
}, {
  name: '2001',
  description: 'Introduction Probability',
  property: 'Probability of introduction T8',
  stops: stops
}, {
  name: '2002',
  description: 'Introduction Probability',
  property: 'Probability of introduction T9',
  stops: stops
}, {
  name: '2003',
  description: 'Introduction Probability',
  property: 'Probability of introduction T10',
  stops: stops
}, {
  name: '2004',
  description: 'Introduction Probability',
  property: 'Probability of introduction T11',
  stops: stops
}, {
  name: '2005',
  description: 'Introduction Probability',
  property: 'Probability of introduction T12',
  stops: stops
}, {
  name: '2006',
  description: 'Introduction Probability',
  property: 'Probability of introduction T13',
  stops: stops
}, {
  name: '2007',
  description: 'Introduction Probability',
  property: 'Probability of introduction T14',
  stops: stops
}, {
  name: '2008',
  description: 'Introduction Probability',
  property: 'Probability of introduction T15',
  stops: stops
}, {
  name: '2009',
  description: 'Introduction Probability',
  property: 'Probability of introduction T16',
  stops: stops
}, {
  name: '2010',
  description: 'Introduction Probability',
  property: 'Probability of introduction T17',
  stops: stops
}, {
  name: '2011',
  description: 'Introduction Probability',
  property: 'Probability of introduction T18',
  stops: stops
}, {
  name: '2012',
  description: 'Introduction Probability',
  property: 'Probability of introduction T19',
  stops: stops
}, {
  name: '2013',
  description: 'Introduction Probability',
  property: 'Probability of introduction T20',
  stops: stops
}, {
  name: '2014',
  description: 'Introduction Probability',
  property: 'Probability of introduction T21',
  stops: stops
}, {
  name: '2015',
  description: 'Introduction Probability',
  property: 'Probability of introduction T22',
  stops: stops
}, {
  name: '2016',
  description: 'Introduction Probability',
  property: 'Probability of introduction T23',
  stops: stops
}, {
  name: '2017',
  description: 'Introduction Probability',
  property: 'Probability of introduction T24',
  stops: stops
}, {
  name: '2018',
  description: 'Introduction Probability',
  property: 'Probability of introduction T25',
  propertyPresence: 'Presence 1993',
  stops: stops
}
]

const markerList = [{
  name: '1993',
  description: 'Presence',
  property: 'Presence 1993'
}, {
  name: '1994',
  description: 'Presence',
  property: 'Presence 1994'
}, {
  name: '1995',
  description: 'Presence',
  property: 'Presence 1995'
}, {
  name: '1996',
  description: 'Presence',
  property: 'Presence 1996'
}, {
  name: '1997',
  description: 'Presence',
  property: 'Presence 1997'
}, {
  name: '1998',
  description: 'Presence',
  property: 'Presence 1998'
}, {
  name: '1999',
  description: 'Presence',
  property: 'Presence 1999'
}, {
  name: '2000',
  description: 'Presence',
  property: 'Presence 2000'
}, {
  name: '2001',
  description: 'Presence',
  property: 'Presence 2001'
}, {
  name: '2002',
  description: 'Presence',
  property: 'Presence 2002'
}, {
  name: '2003',
  description: 'Presence',
  property: 'Presence 2003'
}, {
  name: '2004',
  description: 'Presence',
  property: 'Presence 2004'
}, {
  name: '2005',
  description: 'Presence',
  property: 'Presence 2005'
}, {
  name: '2006',
  description: 'Presence',
  property: 'Presence 2006'
}, {
  name: '2007',
  description: 'Presence',
  property: 'Presence 2007'
}, {
  name: '2008',
  description: 'Presence',
  property: 'Presence 2008'
}, {
  name: '2009',
  description: 'Presence',
  property: 'Presence 2009'
}, {
  name: '2010',
  description: 'Presence',
  property: 'Presence 2010'
}, {
  name: '2011',
  description: 'Presence',
  property: 'Presence 2011'
}, {
  name: '2012',
  description: 'Presence',
  property: 'Presence 2012'
}, {
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
]

console.log(arcData);

var arcDataString = JSON.stringify(arcData);
var arcData_Array = JSON.parse(arcDataString);
console.log(arcData_Array);

const myDeckLayer = new MapboxLayer({
  coordinateSystem: COORDINATE_SYSTEM.LNGLAT_OFFSETS,
  id: 'my-scatterplot',
  type: ArcLayer,
  data: arcData,
  // getPosition: d => d.position,
  // getRadius: d => d.size,
  getSourceColor: d => [144,238,144],
  getTargetColor: d => [0, 128, 200],
   // getSourceColor: d => [255,127,80],
  // getTargetColor: d => [240,230,140],
  // getFillColor: [255, 0, 0],
  // strokeWidth:0.1,
  getSourcePosition: d => d.START,
  getTargetPosition: d => d.END,
  // pickable: true,
  // auto_highlight: true
  
});
  
// // });
// const myDeckLayer =  new ArcLayer({
//   id: 'arcs',
//   data: 
//        {
//          inbound: 72633,
//          outbound: 74735,
//          from: {
//            name: '19th St. Oakland (19TH)',
//            coordinates: [-122.269029, 37.80787]
//          },
//          to: {
//            name: '12th St. Oakland City Center (12TH)',
//            coordinates: [-122.271604, 37.803664]
//        },
//   // dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
//   // Styles
//   getSourcePosition: d.coordinates
//   getTargetPosition: f => f.geometry.coordinates,
//   getSourceColor: [0, 128, 200],
//   getTargetColor: [200, 0, 80],
//   getWidth: 1
// })
// const myDeckLayer =  new ArcLayer({
//   id: 'arcs',
//   data: AIR_PORTS,
//   dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
//   // Styles
//   getSourcePosition: f => [-0.4531566, 51.4709959], // London
//   getTargetPosition: f => f.geometry.coordinates,
//   getSourceColor: [0, 128, 200],
//   getTargetColor: [200, 0, 80],
//   getWidth: 1
// })

console.log(myDeckLayer);


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
      active: options[0],
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
  }

  componentDidMount() {
    this.tooltipContainer = document.createElement('div');
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/gcmillar/ckc13n1qe3rgx1ilchl8u3xax',
      // style: 'mapbox://styles/mapbox/dark-v10',
      center: [20, 40],
      zoom: 1.45,
      pitch: 80
      });
          /* Zoom */
      // this.map.addControl(new ZoomControl(), 'top-right');
      // /* Ruler */
      // this.map.addControl(new RulerControl(), 'bottom-left');
      // /* Inspect */
      // this.map.addControl(new InspectControl(), 'bottom-left');
      /* Compass */
      // this.map.addControl(new CompassControl(), 'top-right');

    this.map.on('load', () => {
      this.map.addLayer(myDeckLayer);
      // this.map.addLayer({
      //           id: 'my-arc',
      //           type: 'ArcLayer',
      //           data: arcData,
      //           getSourcePosition: d => d.START,
      //           getTargetPosition: d => d.END,
      //           getSourceColor: d => [64, 255, 0],
      //           getTargetColor: d => [0, 128, 200]
      //       // });
      
      //       //Add the deck.gl arc layer to the map 
      //       // .addLayer(arclayer, 'waterway-label')
      // });
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

      this.map.addLayer({
        id: 'countries',
        type: 'fill',
        source: 'countries'
      },'country-label'); 

      this.map.addLayer({
        id: 'presence_data',
        interactive: true,
        type: "symbol",
        source:  'presence_data',
        layout: {
          'icon-image': 
          ['concat', ['get', 'icon'], '-15'],
          'text-field': ['get', 'title'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      }); 
      // this.map.addLayer(arclayer, 'waterway-label');
      this.setFill();
      // this.map.on('styledata', function () {
      //   // Triggered when `setStyle` is called.
      //   if (data) addLayer();
      // });
      // this.map.addControl(new mapboxgl.FullscreenControl());
      
    //   presence_data.features.forEach((marker) => {
    //     const markerEl = document.createElement('div');
    //     markerEl.innerHTML = '🦟';
    //     new mapboxgl.Marker(markerEl, { offset: [5,-5] })
    //         .setLngLat(marker.geometry.coordinates)
    //         .addTo(this.map);
    //     markerEl.addEventListener('click', () => {
    //       this.map.flyTo({
    //           center: marker.geometry.coordinates,
    //           zoom: 11,
    //       });
    //     });
    // });
    });

     // Original ES6 Class— https://github.com/tobinbradley/mapbox-gl-pitch-toggle-control
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
        class MapboxGLButtonControl {
          constructor({
            className = "",
            title = "",
            eventHandler = ""
          }) {
            this._className = className;
            this._title = title;
            this._eventHandler = eventHandler;
          }
  
          onAdd(map) {
            this._btn = document.createElement("button");
            this._btn.className = "mapboxgl-ctrl-icon" + " " + this._className;
            this._btn.type = "button";
            this._btn.title = this._title;
            this._btn.onclick = this._eventHandler;
  
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
  
        /* Event Handlers */
        function one(event) {
          alert("Event handler when clicking on \r\n" + event.target.className);
          console.log("event number 1", event);
        }
  
        function two(event) {
          alert("Event handler when clicking on \r\n" + event.target.className);
          console.log("event number 2", event);
        }
  
        function three(event) {
          alert("Event handler when clicking on \r\n" + event.target.className);
          console.log("event number 3", event);
        }
  
        /* Instantiate new controls with custom event handlers */
        const ctrlPoint = new MapboxGLButtonControl({
          className: "mapbox-gl-draw_point",
          title: "Draw Point",
          eventHandler: one
        });
  
        const ctrlLine = new MapboxGLButtonControl({
          className: "mapbox-gl-draw_line",
          title: "Draw Line",
          eventHandler: two
        });
  
        const ctrlPolygon = new MapboxGLButtonControl({
          className: "mapbox-gl-draw_polygon",
          title: "Draw Polygon",
          eventHandler: three
        });
  
        /* Add Controls to the Map */
        // this.map.addControl(new mapboxgl.NavigationControl(), "top-left");
        this.map.addControl(new MapboxGeocoder({
          accessToken: 'pk.eyJ1IjoiZ2NtaWxsYXIiLCJhIjoiY2pvcDhrbGl4MDFvaTNrczR0d2hxcjdnNSJ9.JYgBw6y2pEq_AEAOCaoQpw',
          mapboxgl: mapboxgl,
          placeholder: 'Search for a Location'
        }), 'top-right');
        this.map.addControl(new PitchToggle({ minpitchzoom: 11 }), "top-right");
        
        
        // this.map.addControl(ctrlPoint, "bottom-left");
        // this.map.addControl(ctrlLine, "bottom-right");
        // this.map.addControl(ctrlPolygon, "top-left");
  

    const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
      offset: [-120, 0]
    }).setLngLat([0,0]).addTo(this.map);

    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
      });

      this.map.on('mouseenter', 'countries', (e) => {
        this.map.getCanvas().style.cursor =  'pointer';
      });


      this.map.on('click', 'countries', (e) => {
        const features = this.map.queryRenderedFeatures(e.point, {
      });
      const { name, description, stops, property } = this.state.active;
      const prob_intro = features[0].properties[property]
      this.map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      popup 
      .setLngLat(e.lngLat)
       .setHTML('<b><u>Country Information' + '</b></u>' +
          '<ul>' +
          '<li><b>Name: </b>' + features[0].properties["NAME"] + '</li>' +
          '<li><b>Introduction Probability: </b>' + prob_intro  + '</li>' +
          '</ul>')
      .addTo(this.map);
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

     


    this.map.on('click', 'presence_data', (p) => {
      const presenceFeatures = this.map.queryRenderedFeatures(p.point, {
    });
    // console.log(presenceFeatures)
  });
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
    this.map.setPaintProperty('countries', 'fill-outline-color', {
      property,
      stops
    },
    )
      // this.map.setTooltip('presence_data', '', {
      //   property,
      //   stops
      // })  ;
      ;    
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

    return (
      
      <div>
        <div ref={this.mapRef} width='100%' height='100%' className="absolute top right left bottom align-middle grid" />
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
