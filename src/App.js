import React, {useState, useRef, useCallback, Component }  from 'react';
import logo from './logo.svg';
import './App.css';
import mapboxgl from 'mapbox-gl'
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import { render } from "react-dom";
import Geocoder from "react-map-gl-geocoder";
import { Icon } from "semantic-ui-react";
import data from './pandemic_output.json'
// import arcData from './arcData.json'
import presence_data from './presence_pandemic.json'
import Tooltip from './components/tooltip'
import ReactDOM from 'react-dom'
import ReactMapboxGl from 'react-mapbox-gl';
// import React, {useState, useRef, useCallback} from 'react';
import DeckGL from '@deck.gl/react';
import {ScatterplotLayer, GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import Geocoder from 'react-map-gl-geocoder';
// import { Container, Col, Row } from 'reactstrap';
import {MapboxLayer} from '@deck.gl/mapbox';
import "mapbox-gl/dist/mapbox-gl.css";
import  "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
// const mapStyle = {
//   width: '100%',

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NtaWxsYXIiLCJhIjoiY2pvcDhrbGl4MDFvaTNrczR0d2hxcjdnNSJ9.JYgBw6y2pEq_AEAOCaoQpw'
// const TOKEN = 'pk.eyJ1IjoiZ2NtaWxsYXIiLCJhIjoiY2pvcDhrbGl4MDFvaTNrczR0d2hxcjdnNSJ9.JYgBw6y2pEq_AEAOCaoQpw';
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

const myDeckLayer = new MapboxLayer({
  id: 'my-scatterplot',
  type: ArcLayer,
  data: [
    // [
      // [
        {
          "id": 0,
          "START": [
            -8.409518,
            115.188919
          ],
          "END": [
            22.302711,
            114.177216
          ],
          "Year": 1993
        },
        // {
        //   "id": 1,
        //   "START": [
        //     13.736717,
        //     100.523186
        //   ],
        //   "END": [
        //     1.29027,
        //     103.851959
        //   ],
        //   "Year": 1993
        // },
        // {
        //   "id": 4,
        //   "START": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "END": [
        //     39.913818,
        //     116.363625
        //   ],
        //   "Year": 1995
        // },
        // {
        //   "id": 6,
        //   "START": [
        //     13.736717,
        //     100.523186
        //   ],
        //   "END": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "Year": 1995
        // },
        // {
        //   "id": 7,
        //   "START": [
        //     39.913818,
        //     116.363625
        //   ],
        //   "END": [
        //     35.652832,
        //     139.839478
        //   ],
        //   "Year": 1997
        // },
        // {
        //   "id": 8,
        //   "START": [
        //     35.652832,
        //     139.839478
        //   ],
        //   "END": [
        //     -8.409518,
        //     115.188919
        //   ],
        //   "Year": 1997
        // },
        // {
        //   "id": 9,
        //   "START": [
        //     13.736717,
        //     100.523186
        //   ],
        //   "END": [
        //     -8.409518,
        //     115.188919
        //   ],
        //   "Year": 1997
        // },
        // {
        //   "id": 12,
        //   "START": [
        //     1.29027,
        //     103.851959
        //   ],
        //   "END": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "Year": 1999
        // },
        // {
        //   "id": 13,
        //   "START": [
        //     39.913818,
        //     116.363625
        //   ],
        //   "END": [
        //     -8.409518,
        //     115.188919
        //   ],
        //   "Year": 1999
        // },
        // {
        //   "id": 14,
        //   "START": [
        //     39.913818,
        //     116.363625
        //   ],
        //   "END": [
        //     3.140853,
        //     101.693207
        //   ],
        //   "Year": 2000
        // },
        // {
        //   "id": 15,
        //   "START": [
        //     39.913818,
        //     116.363625
        //   ],
        //   "END": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "Year": 2000
        // },
        // {
        //   "id": 16,
        //   "START": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "END": [
        //     1.29027,
        //     103.851959
        //   ],
        //   "Year": 2000
        // },
        // {
        //   "id": 17,
        //   "START": [
        //     39.913818,
        //     116.363625
        //   ],
        //   "END": [
        //     3.140853,
        //     101.693207
        //   ],
        //   "Year": 2001
        // },
        // {
        //   "id": 18,
        //   "START": [
        //     1.29027,
        //     103.851959
        //   ],
        //   "END": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "Year": 2001
        // },
        // {
        //   "id": 19,
        //   "START": [
        //     -8.409518,
        //     115.188919
        //   ],
        //   "END": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "Year": 2001
        // },
        // {
        //   "id": 20,
        //   "START": [
        //     39.913818,
        //     116.363625
        //   ],
        //   "END": [
        //     -8.409518,
        //     115.188919
        //   ],
        //   "Year": 2001
        // },
        // {
        //   "id": 21,
        //   "START": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "END": [
        //     3.140853,
        //     101.693207
        //   ],
        //   "Year": 2003
        // },
        // {
        //   "id": 22,
        //   "START": [
        //     39.913818,
        //     116.363625
        //   ],
        //   "END": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "Year": 2003
        // },
        // {
        //   "id": 23,
        //   "START": [
        //     13.736717,
        //     100.523186
        //   ],
        //   "END": "Macao",
        //   "Year": 2003
        // },
        // {
        //   "id": 26,
        //   "START": [
        //     1.29027,
        //     103.851959
        //   ],
        //   "END": [
        //     3.140853,
        //     101.693207
        //   ],
        //   "Year": 2004
        // },
        // {
        //   "id": 27,
        //   "START": [
        //     39.913818,
        //     116.363625
        //   ],
        //   "END": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "Year": 2004
        // },
        // {
        //   "id": 29,
        //   "START": [
        //     35.652832,
        //     139.839478
        //   ],
        //   "END": [
        //     3.140853,
        //     101.693207
        //   ],
        //   "Year": 2005
        // },
        // {
        //   "id": 36,
        //   "START": [
        //     1.29027,
        //     103.851959
        //   ],
        //   "END": [
        //     3.140853,
        //     101.693207
        //   ],
        //   "Year": 2008
        // },
        // {
        //   "id": 37,
        //   "START": [
        //     1.29027,
        //     103.851959
        //   ],
        //   "END": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "Year": 2008
        // },
        // {
        //   "id": 40,
        //   "START": [
        //     13.736717,
        //     100.523186
        //   ],
        //   "END": [
        //     3.140853,
        //     101.693207
        //   ],
        //   "Year": 2009
        // },
        // {
        //   "id": 41,
        //   "START": [
        //     39.913818,
        //     116.363625
        //   ],
        //   "END": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "Year": 2009
        // },
        // {
        //   "id": 42,
        //   "START": [
        //     3.140853,
        //     101.693207
        //   ],
        //   "END": [
        //     1.29027,
        //     103.851959
        //   ],
        //   "Year": 2009
        // },
        // {
        //   "id": 44,
        //   "START": [
        //     35.652832,
        //     139.839478
        //   ],
        //   "END": [
        //     3.140853,
        //     101.693207
        //   ],
        //   "Year": 2010
        // },
        // {
        //   "id": 45,
        //   "START": [
        //     39.913818,
        //     116.363625
        //   ],
        //   "END": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "Year": 2010
        // },
        // {
        //   "id": 49,
        //   "START": [
        //     1.29027,
        //     103.851959
        //   ],
        //   "END": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "Year": 2011
        // },
        // {
        //   "id": 57,
        //   "START": [
        //     39.913818,
        //     116.363625
        //   ],
        //   "END": [
        //     1.29027,
        //     103.851959
        //   ],
        //   "Year": 2012
        // },
        // {
        //   "id": 59,
        //   "START": [
        //     3.140853,
        //     101.693207
        //   ],
        //   "END": [
        //     -8.409518,
        //     115.188919
        //   ],
        //   "Year": 2012
        // },
        // {
        //   "id": 60,
        //   "START": [
        //     1.29027,
        //     103.851959
        //   ],
        //   "END": [
        //     -8.409518,
        //     115.188919
        //   ],
        //   "Year": 2012
        // },
        // {
        //   "id": 62,
        //   "START": [
        //     13.736717,
        //     100.523186
        //   ],
        //   "END": [
        //     3.140853,
        //     101.693207
        //   ],
        //   "Year": 2013
        // },
        // {
        //   "id": 64,
        //   "START": [
        //     13.736717,
        //     100.523186
        //   ],
        //   "END": [
        //     -8.409518,
        //     115.188919
        //   ],
        //   "Year": 2013
        // },
        // {
        //   "id": 65,
        //   "START": [
        //     1.29027,
        //     103.851959
        //   ],
        //   "END": [
        //     39.913818,
        //     116.363625
        //   ],
        //   "Year": 2014
        // },
        // {
        //   "id": 72,
        //   "START": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "END": [
        //     3.140853,
        //     101.693207
        //   ],
        //   "Year": 2016
        // },
        // {
        //   "id": 75,
        //   "START": [
        //     39.913818,
        //     116.363625
        //   ],
        //   "END": [
        //     1.29027,
        //     103.851959
        //   ],
        //   "Year": 2016
        // },
        // {
        //   "id": 87,
        //   "START": [
        //     22.302711,
        //     114.177216
        //   ],
        //   "END": [
        //     3.140853,
        //     101.693207
        //   ],
        //   "Year": 2018
        // }
      // ]
    // ]
    // {"id":0,"Origin":[-8.409518,115.188919],"Destination":[22.302711,114.177216],"Year":1993},{"id":1,"Origin":[13.736717,100.523186],"Destination":[1.29027,103.851959],"Year":1993},{"id":4,"Origin":[22.302711,114.177216],"Destination":[39.913818,116.363625],"Year":1995},{"id":6,"Origin":[13.736717,100.523186],"Destination":[22.302711,114.177216],"Year":1995},{"id":7,"Origin":[39.913818,116.363625],"Destination":[35.652832,139.839478],"Year":1997},{"id":8,"Origin":[35.652832,139.839478],"Destination":[-8.409518,115.188919],"Year":1997},{"id":9,"Origin":[13.736717,100.523186],"Destination":[-8.409518,115.188919],"Year":1997},{"id":12,"Origin":[1.29027,103.851959],"Destination":[22.302711,114.177216],"Year":1999},{"id":13,"Origin":[39.913818,116.363625],"Destination":[-8.409518,115.188919],"Year":1999},{"id":14,"Origin":[39.913818,116.363625],"Destination":[3.140853,101.693207],"Year":2000},{"id":15,"Origin":[39.913818,116.363625],"Destination":[22.302711,114.177216],"Year":2000},{"id":16,"Origin":[22.302711,114.177216],"Destination":[1.29027,103.851959],"Year":2000},{"id":17,"Origin":[39.913818,116.363625],"Destination":[3.140853,101.693207],"Year":2001},{"id":18,"Origin":[1.29027,103.851959],"Destination":[22.302711,114.177216],"Year":2001},{"id":19,"Origin":[-8.409518,115.188919],"Destination":[22.302711,114.177216],"Year":2001},{"id":20,"Origin":[39.913818,116.363625],"Destination":[-8.409518,115.188919],"Year":2001},{"id":21,"Origin":[22.302711,114.177216],"Destination":[3.140853,101.693207],"Year":2003},{"id":22,"Origin":[39.913818,116.363625],"Destination":[22.302711,114.177216],"Year":2003},{"id":23,"Origin":[13.736717,100.523186],"Destination":"Macao","Year":2003},{"id":26,"Origin":[1.29027,103.851959],"Destination":[3.140853,101.693207],"Year":2004},{"id":27,"Origin":[39.913818,116.363625],"Destination":[22.302711,114.177216],"Year":2004},{"id":29,"Origin":[35.652832,139.839478],"Destination":[3.140853,101.693207],"Year":2005},{"id":36,"Origin":[1.29027,103.851959],"Destination":[3.140853,101.693207],"Year":2008},{"id":37,"Origin":[1.29027,103.851959],"Destination":[22.302711,114.177216],"Year":2008},{"id":40,"Origin":[13.736717,100.523186],"Destination":[3.140853,101.693207],"Year":2009},{"id":41,"Origin":[39.913818,116.363625],"Destination":[22.302711,114.177216],"Year":2009},{"id":42,"Origin":[3.140853,101.693207],"Destination":[1.29027,103.851959],"Year":2009},{"id":44,"Origin":[35.652832,139.839478],"Destination":[3.140853,101.693207],"Year":2010},{"id":45,"Origin":[39.913818,116.363625],"Destination":[22.302711,114.177216],"Year":2010},{"id":49,"Origin":[1.29027,103.851959],"Destination":[22.302711,114.177216],"Year":2011},{"id":57,"Origin":[39.913818,116.363625],"Destination":[1.29027,103.851959],"Year":2012},{"id":59,"Origin":[3.140853,101.693207],"Destination":[-8.409518,115.188919],"Year":2012},{"id":60,"Origin":[1.29027,103.851959],"Destination":[-8.409518,115.188919],"Year":2012},{"id":62,"Origin":[13.736717,100.523186],"Destination":[3.140853,101.693207],"Year":2013},{"id":64,"Origin":[13.736717,100.523186],"Destination":[-8.409518,115.188919],"Year":2013},{"id":65,"Origin":[1.29027,103.851959],"Destination":[39.913818,116.363625],"Year":2014},{"id":72,"Origin":[22.302711,114.177216],"Destination":[3.140853,101.693207],"Year":2016},{"id":75,"Origin":[39.913818,116.363625],"Destination":[1.29027,103.851959],"Year":2016},{"id":87,"Origin":[22.302711,114.177216],"Destination":[3.140853,101.693207],"Year":2018}
  ],
  // getPosition: d => d.position,
  // getRadius: d => d.size,
  getSourceColor: d => [64, 255, 0],
  getTargetColor: d => [0, 128, 200],
  // getFillColor: [255, 0, 0],
  // getSourcePosition: d => d.Origin,
  // getTargetPosition: d => d.Destination,
  getSourcePosition: d => d.START,
  getTargetPosition: d => d.END,
  getColor: [255, 0, 0]
});
// console.log(myDeckLayer);

class App extends React.Component {
  mapRef = React.createRef();

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  render() {
    const { viewport } = this.state;

    return (
      <div style={{ height: "100vh" }}>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          width="100%"
          height="100%"
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <Geocoder
            mapRef={this.mapRef}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
          />
        </MapGL>
      </div>
    );
  }

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
      viewport: {
        latitude: 17.44212,
        longitude: 78.391384,
        zoom: 15,
        bearing: 0,
        pitch: 0,
        width: "100%",
        height: 500
      },
      popupInfo: null
    };
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
      center: [12, 26],
      // center: [-122.396511,37.793089],
      zoom: 1.5,
      // zoom: 9
    });

    this.map.on('load', () => {
      new MapboxGeocoder({
        accessToken: 'pk.eyJ1IjoiZ2NtaWxsYXIiLCJhIjoiY2pvcDhrbGl4MDFvaTNrczR0d2hxcjdnNSJ9.JYgBw6y2pEq_AEAOCaoQpw',
        mapboxgl: mapboxgl
        })
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
    const { name, description, stops, property } = this.state.active;
    const renderLegendKeys = (stop, i) => {
      return (
        <div key={i} className='txt-s '>
          <span className=' round-full w12 h12 inline-block ' style={{ backgroundColor: stop[1] }} />
          <span className='px12' >{`${stop[0].toLocaleString()}`}</span>
        </div>
      );
    }

   
    const renderOptions = (option, i) => {
      return (
        <label key={i} className="toggle-container w60 py0 px0 ">
          <input  onChange={() => this.setState({ active: options[i] })} checked={option.property === property} name="toggle" type="radio" />
          <div  className="toggle txt-s color-white toggle--active-white ">{option.name}</div>
        </label>
      );
    }
    const {viewport} = this.state

    return (
      
      <div>
        <div ref={this.mapRef} className="absolute top right left bottom align-middle grid" />
        <label className="ctxt-bold color-white absolute mt6 ml12 " ><b>Select Year:</b></label>
        <div  className="toggle-group grid mt36 ml12 top left  ctxt-bold color-white absolute  border border--2 border--white bg-transparent shadow-darken10  ">
          {options.map(renderOptions)}
        </div>
        <div  className=" bg-transparent color-white absolute bottom right mr12 mb40 py12 px12 border--white round border border--2 round shadow-darken10 z1 ">
          <div className='mb6 color-white '>
            <h2 className="txt-bold txt-s block color-white ">{name}</h2>
            <p className='txt-s color-white '>{description}</p>
          </div>
          {stops.map(renderLegendKeys)}
        </div>
      </div>
    );//absolute top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1
  }
}

export default App;
