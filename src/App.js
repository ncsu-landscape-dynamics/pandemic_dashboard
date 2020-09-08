import React from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl'
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import data from './data/pandemic_output.json'
import Tooltip from './components/tooltip'
import ReactDOM from 'react-dom'
import {ArcLayer} from '@deck.gl/layers';
// import {ArcLayer, ScatterplotLayer} from '@deck.gl/layers';
import {MapboxLayer} from '@deck.gl/mapbox';
// import {Deck} from '@deck.gl/core';
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import arcData from './data/arcs.json'
import {COORDINATE_SYSTEM} from '@deck.gl/core';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NtaWxsYXIiLCJhIjoiY2pvcDhrbGl4MDFvaTNrczR0d2hxcjdnNSJ9.JYgBw6y2pEq_AEAOCaoQpw'

// Color scale & legend agreed upon by team:
// var stops =  [
//   [0.0, 'rgba(033,033,033, 0.005)'],
//   [0.001, 'rgba(255, 247, 236, 0.6)'],
//   [0.5, 'rgba(208,129,91, 0.6)'], 
//   [1.0, 'rgba(127,0,0, 0.6)']
// ]
// NOTE: ^ scale above is simplified version of full scale range:
// [0.0, 'rgba(033,033,033, 0.005)'],
// [0.001, 'rgba(255, 247, 236, 0.6)'],
// [0.1, 'rgba(253,222,197, 0.6)'],	
// [0.2, 'rgba(246,197,165, 0.6)'],			
// [0.3, 'rgba(235,174,138, 0.6)'], 
// [0.4, 'rgba(222,151,113, 0.6)'],	
// [0.5, 'rgba(208,129,91, 0.6)'], 
// [0.6, 'rgba(193,106,71, 0.6)'],		
// [0.7, 'rgba(177,84,52, 0.6)'], 
// [0.8, 'rgba(161,62,34, 0.6)'],	
// [0.9, 'rgba(144,37,18, 0.6)'],
// [1.0, 'rgba(127,0,0, 0.6)']
// ]
//Thom's BRRD
var stops =  [
  [0.0, 'rgba(0,0,0, 0.36)'],
  [0.001, 'rgba(40, 33, 27, .8)'],
  [0.25, 'rgba(132, 82, 33, .8)'],
  [0.5, 'rgba(194, 116, 37, .8)'], 
  [0.75, 'rgba(213, 77, 40, .8)'],
  [1.0, 'rgba(196, 37, 37, .8)']
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

const myDeckLayer = new MapboxLayer({
  coordinateSystem: COORDINATE_SYSTEM.LNGLAT_OFFSETS,
  id: 'connectionsArcs',
  type: ArcLayer,
  data: arcData,
  // layers: [layers],
  getSourceColor: d => [128, 0, 0, 0],
  getTargetColor: d => [255, 255, 255, 0],
  // getFillColor: [255, 0, 0],
  strokeWidth:0.1,
  getSourcePosition: d => d.START,
  getTargetPosition: d => d.END,
  pickable: true,
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

    //   const deck = new Deck({
    //     gl: this.map.painter.context.gl,
    //     layers: [
    //         new ScatterplotLayer({
    //             id: 'my-scatterplot',
    //             data: [
    //                 {position: [-74.5, 40], size: 100}
    //             ],
    //             getPosition: d => d.position,
    //             getRadius: d => d.size,
    //             getFillColor: [255, 0, 0]
    //         })
    //     ]
    // });

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
      // add to mapbox
    // map.addLayer(new MapboxLayer({id: 'my-scatterplot', deck}));

    // // update the layer
    // deck.setProps({
    //     layers: [
    //         new ScatterplotLayer({
    //             id: 'my-scatterplot',
    //             data: [
    //                 {position: [-74.5, 40], size: 100}
    //             ],
    //             getPosition: d => d.position,
    //             getRadius: d => d.size,
    //             getFillColor: [0, 0, 255]
    //         })
    //     ]
    // });
      // this.map.loadImage(
      //   'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
      //   function(error, image) {
      //   if (error) throw error;
      //   map.addImage('cat', image);
      this.map.addLayer(myDeckLayer);
          
      // if (this.map.getLayer("countries")) {
      //   this.map.removeLayer("countries");
      // };
      // if (this.map.getSource("countries")) {
      //   this.map.removeSource("countries");
      // };
      if (this.map.getLayer("presence")) {
        this.map.removeLayer("presence");
      };
      this.map.addSource('countries', {
        type: 'geojson',
        data
      });

      // this.map.addSource('presence_data', {
      //   type: 'geojson',
      //   presence_data
      // });

      // this.map.addSource('arcLayer', {
      //   type: 'ArcLayer',
      //   arcData
      // });

      this.map.addLayer({
        id: 'countries',
        type: 'fill',
        source: 'countries',
      },'country-label'); 

      this.map.addLayer({
        id: 'native-data',
        type: 'fill',
        source: 'countries',
        filter: ["in", "NAME", "China", "India", "Viet Nam"],
      },'country-label'); 
      // const { property } = this.state.active;
      // const prob_intro = data.features[0].properties[property]
      this.map.addLayer({
        id: 'presence',
        type: 'symbol',
        source: 'countries',
        interactive: true,
        layout: {
          // "icon-image": "SLF_Vector",
          "icon-image": "pest_icon_outline_01",
          'icon-allow-overlap': false,
          // 'icon-anchor': data.
          'icon-size':0.70,
          // 'icon-color':'#fff'
        },
      },'country-label'); 
    
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
      //

    var myFeatures = this.map.queryRenderedFeatures(
    {layers:['countries','presence']
        // layers: 'countries', 'presence'
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

       

        // const markerEl = document.createElement('div');
        // markerEl.innerHTML = '🐞';
        // var presenceMarker = new mapboxgl.Marker(markerEl, { offset: [5,-5] })
        // presence_data.features.forEach((marker) => {
        //     presenceMarker
        //       .setLngLat(marker.geometry.coordinates)
        //       .addTo(this.map);
        //         markerEl.addEventListener('click', () => {
        //           this.map.flyTo({
        //               center: marker.geometry.coordinates,
        //               zoom: 3,
        //           });
        //         });
        // });
        
  
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
      stops
    },
    )
    this.map.setPaintProperty('presence', 'icon-opacity', {
        property: presenceProperty,
        type: "categorical",
           stops: 
          //  stopsSymbol
           [
            ['true', 1],
            ['false', 0.0],
           ]
          },
    
    )
  
    this.map.setPaintProperty('native-data', "fill-pattern", 
    // 'diagonal'); 
    'diagonal_lines'); 
    // 'noun_stripes_2098710');
   
   // This does country borders on top of everything else 
   //this.map.setPaintProperty('countries', 'fill-outline-color', '#7F7F7F')

  
  }
  // addLayer() {
  //   const { arcId } = this.state.active;
  //   this.map.addLayer('arcLayer' , {
  //     arcId
  //   }
  //   )
  // }

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
      <div>
        <div ref={this.mapRef} 
        {...viewport}
        width="100%"
        height="100%"
        // mapStyle="mapbox://styles/mapbox/dark-v9"
        // onViewportChange={viewport}
        // mapboxApiAccessToken={MAPBOX_TOKEN}
        // queryRenderedFeatures={features} 
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
    );//absolute top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1
  }
}

export default App;
