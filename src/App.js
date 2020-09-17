import React from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl'
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import data from './data/combined.json'
import Tooltip from './components/tooltip'
import ReactDOM from 'react-dom'
import {MapboxLayer} from '@deck.gl/mapbox';
import {ArcLayer} from 'deck.gl';
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import {COORDINATE_SYSTEM} from '@deck.gl/core';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NtaWxsYXIiLCJhIjoiY2pvcDhrbGl4MDFvaTNrczR0d2hxcjdnNSJ9.JYgBw6y2pEq_AEAOCaoQpw'

// Color scale & legend agreed upon by team:
var stops =  [
  [0.0, 'rgba(033,033,033, 0.005)'],
  [0.001, 'rgba(245, 230, 220, 0.65)'],
  [0.25, 'rgba(230, 197, 175, 0.65)'],		
  [0.5, 'rgba(208,129,91, 0.65)'], 
  [0.75, 'rgba(167,84,52, 0.65)'],
    [1.0, 'rgba(188, 45, 50, 0.78)']
    // other options:
    // [1.0, 'rgba(165, 37, 37, 0.65)']
    // rgba(165, 37, 37, 0.7)
]

var stopsSymbol = [
  ['true', 1],
  ['false', 0.0],
]


const options = [{
  name: '2000',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2000',
  presenceProperty: 'Presence 2000',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2001',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2001',
  presenceProperty: 'Presence 2001',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2002',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2002',
  presenceProperty: 'Presence 2002',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2003',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2003',
  presenceProperty: 'Presence 2003',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2004',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2004',
  presenceProperty: 'Presence 2004',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2005',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2005',
  presenceProperty: 'Presence 2005',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2006',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2006',
  presenceProperty: 'Presence 2006',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2007',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2007',
  presenceProperty: 'Presence 2007',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2008',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2008',
  presenceProperty: 'Presence 2008',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2009',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2009',
  presenceProperty: 'Presence 2009',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2010',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2010',
  presenceProperty: 'Presence 2010',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2011',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2011',
  presenceProperty: 'Presence 2011',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2012',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2012',
  presenceProperty: 'Presence 2012',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2013',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2013',
  presenceProperty: 'Presence 2013',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2014',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2014',
  presenceProperty: 'Presence 2014',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2015',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2015',
  presenceProperty: 'Presence 2015',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2016',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2016',
  presenceProperty: 'Presence 2016',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2017',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2017',
  presenceProperty: 'Presence 2017',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2018',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2018',
  presenceProperty: 'Presence 2018',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2019',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2019',
  presenceProperty: 'Presence 2019',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2020',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2020',
  presenceProperty: 'Presence 2020',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2021',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2021',
  presenceProperty: 'Presence 2021',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2022',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2022',
  presenceProperty: 'Presence 2022',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2023',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2023',
  presenceProperty: 'Presence 2023',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2024',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2024',
  presenceProperty: 'Presence 2024',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2025',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2025',
  presenceProperty: 'Presence 2025',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2026',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2026',
  presenceProperty: 'Presence 2026',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2027',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2027',
  presenceProperty: 'Presence 2027',
  stops: stops,
  stopsSymbol: stopsSymbol,
}, {
  name: '2028',
  description: 'Introduction Probability',
  property: 'Agg Prob Intro 2028',
  presenceProperty: 'Presence 2028',
  stops: stops,
  stopsSymbol: stopsSymbol,
}
]

// migrate out - red
var SOURCE_COLOR = [35, 181, 184];
// migrate in - blue
var TARGET_COLOR =  [166, 3, 3];

// var RADIUS_SCALE = d3.scaleSqrt().domain([0, 8000]).range([1000, 20000]);
// var WIDTH_SCALE = 400;

const myDeckLayer = new MapboxLayer({
  coordinateSystem: COORDINATE_SYSTEM.LNGLAT_OFFSETS,
  id: 'connectionsArcs',
  type: ArcLayer,
  pickable: true,
    getWidth: 5,
  getSourcePosition: d => d.START,
  getTargetPosition: d => d.END,
  getSourceColor: SOURCE_COLOR,
  getTargetColor: TARGET_COLOR,
  transitions: {
  },
  auto_highlight: true
});

console.log(myDeckLayer)

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
      active: options[0],
      // active: arcOptions[0] ,
      viewport: {
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



    this.map.on('load', () => {
    
      console.log(this.map.addLayer(myDeckLayer))
          

      this.map.addSource('countries', {
        type: 'geojson',
        data
      });

    
      this.map.addLayer({
        id: 'countries',
        type: 'fill',
        source: 'countries',
        filter: ["all",
        ["!=", "NAME", "China"],
        ["!=", "NAME", "India"],
        ["!=", "NAME", "Viet Nam"],
     ]
      },'country-label'); 

      this.map.addLayer({
        id: 'native-data',
        type: 'fill',
        source: 'countries',
        filter: ["in", "NAME", "China", "India", "Viet Nam"],
      },'country-label'); 
      this.map.addLayer({
        id: 'native-data2',
        type: 'fill',
        source: 'countries',
        filter: ["in", "NAME", "China", "India", "Viet Nam"],
      },'country-label'); 

     
        console.log(data.features[0].geometry.coordinates);
        const centroid_lat = data.features[0].properties.centroid_lat[0]
        const centroid_lon = data.features[0].properties.centroid_lon[0]
        console.log(centroid_lat)
        console.log(centroid_lon)
   

      this.map.addLayer({
        id: 'presence',
        type: 'symbol',
        source: 'countries',
        filter: ['==', '$type', 'Point'],
        interactive: true,
        layout: {
          // "icon-image": "SLF_Vector",
          "icon-image": "pest_icon_outline_01",
          'icon-allow-overlap': true,
          'icon-ignore-placement': false,
          // 'icon-anchor': data.
          'icon-size':0.60,
          // 'icon-color':'#fff'
        },
      },'country-label'); 
   
 
// console.log(myFeatures);
    this.setFill();
    

    });


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
          .addTo(this.map)
        
        });

       


    this.map.on('mouseleave', 'countries', (e) => {
      this.map.getCanvas().style.cursor =  '';
      popup.remove();
    });

   
  }
  
  setFill() {
    const { property, stops, presenceProperty } = this.state.active;
    this.map.setPaintProperty('countries', 'fill-color', {
      property,
      stops
    },
    )
    this.map.setPaintProperty('countries', 'fill-outline-color', {
      property,
      stops:
      [
        [0.0, 'rgba(033,033,033, 0.005)'],
        [0.001, 'rgba(255, 247, 236, 1)'],
        [0.25, 'rgba(246,197,165, 1)'],		
        [0.5, 'rgba(208,129,91, 1)'], 
        [0.75, 'rgba(177,84,52, 1)'],
        [1.0, 'rgba(127,0,0, 1)']
      ]
    },
    )
    this.map.setPaintProperty('presence', 'icon-opacity', {
        property: presenceProperty,
        type: "categorical",
           stops: 
           [
            ['true', 1],
            ['false', 0.0],
           ]
          },
    
    )
  
    this.map.setPaintProperty('native-data', 'fill-color', 'rgba(100, 100, 100, 1)')
    
    this.map.setPaintProperty('native-data2', "fill-pattern", 
    // 'diagonal'); 
    'diagonal_lines'); 
  
  }
 


features () {   
  this.mapRef.current.queryRenderedFeatures( { layers: ['countries','presence'] })
  }

  render() {
   
    const { 
      viewport,
    } = this.state
    const { name, description, stops, property } = this.state.active;
    // const { name, description, stops, property, presenceProperty , stopsSymbol} = this.state.active;
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
      <React.Fragment>
      <div>

        <div ref={this.mapRef} 
        {...viewport}
        width="100%"
        height="100%"
        className="absolute top right left bottom align-middle grid" />
        <label className=" align-middle top  txt-s mb30 mt3 ml18 ctxt-bold pa0 color-white absolute bg-transparent" ><b>Select Year:</b></label>
        <div className="toggle-group grid-2 grid mt24 pl3 pr3 align-middle top ctxt-bold  color-white absolute border border--2 border--white bg-transparent shadow-darken10  ">
        {options.map(renderOptions)} 
        </div>
        <div  className=" bg-transparent px3  grid-3 color-white absolute align-middle bottom w100 left border--white round border border--2 round shadow-darken10  txt-xs">
          <div className=' color-gray-light px3 txt-xs'>
            <h2 className="txt-bold txt-xs block color-white px0 ">{name}</h2>
            <p className='txt-xs color-white px0 py0'>{description}</p>
            {/* <p className='txt-xs color-white px0 py0'>{presenceProperty}</p> */}
          </div>
          {stops.map(renderLegendKeys)}
          {/* {stopsSymbol.map(renderLegendKeys)} */}
        </div>
      </div>
      </React.Fragment>
    );//absolute top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1
  }
}

export default App;
