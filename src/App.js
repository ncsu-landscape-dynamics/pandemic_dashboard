import React from 'react';
import logo from './logo.svg';
import './App.css';
import mapboxgl from 'mapbox-gl'
import data from './pandemic_output.json'


  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );



    

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NtaWxsYXIiLCJhIjoiY2pvcDhrbGl4MDFvaTNrczR0d2hxcjdnNSJ9.JYgBw6y2pEq_AEAOCaoQpw';


var stops =  [
  [0, 'rgba(45,69,132, 0.4)'],	
  // [0.1, 'rgba(45,19,13, 0.4)'], 
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
  description: 'Invasion Probability',
  property: 'Probability of introduction T0',
  stops: stops
}, {
  name: '1994',
  description: 'Invasion Probability',
  property: 'Probability of introduction T1',
  stops: stops
}, {
  name: '1995',
  description: 'Invasion Probability',
  property: 'Probability of introduction T2',
  stops: stops
}, {
  name: '1996',
  description: 'Invasion Probability',
  property: 'Probability of introduction T3',
  stops: stops
}, {
  name: '1997',
  description: 'Invasion Probability',
  property: 'Probability of introduction T4',
  stops: stops
}, {
  name: '1998',
  description: 'Invasion Probability',
  property: 'Probability of introduction T5',
  stops: stops
}, {
  name: '1999',
  description: 'Invasion Probability',
  property: 'Probability of introduction T6',
  stops: stops
}, {
  name: '2000',
  description: 'Invasion Probability',
  property: 'Probability of introduction T7',
  stops: stops
}, {
  name: '2001',
  description: 'Invasion Probability',
  property: 'Probability of introduction T8',
  stops: stops
}, {
  name: '2002',
  description: 'Invasion Probability',
  property: 'Probability of introduction T9',
  stops: stops
}, {
  name: '2003',
  description: 'Invasion Probability',
  property: 'Probability of introduction T10',
  stops: stops
}, {
  name: '2004',
  description: 'Invasion Probability',
  property: 'Probability of introduction T11',
  stops: stops
}, {
  name: '2005',
  description: 'Invasion Probability',
  property: 'Probability of introduction T12',
  stops: stops
}, {
  name: '2006',
  description: 'Invasion Probability',
  property: 'Probability of introduction T13',
  stops: stops
}, {
  name: '2007',
  description: 'Invasion Probability',
  property: 'Probability of introduction T14',
  stops: stops
}, {
  name: '2008',
  description: 'Invasion Probability',
  property: 'Probability of introduction T15',
  stops: stops
}, {
  name: '2009',
  description: 'Invasion Probability',
  property: 'Probability of introduction T16',
  stops: stops
}, {
  name: '2010',
  description: 'Invasion Probability',
  property: 'Probability of introduction T17',
  stops: stops
}, {
  name: '2011',
  description: 'Invasion Probability',
  property: 'Probability of introduction T18',
  stops: stops
}, {
  name: '2012',
  description: 'Invasion Probability',
  property: 'Probability of introduction T19',
  stops: stops
}, {
  name: '2013',
  description: 'Invasion Probability',
  property: 'Probability of introduction T20',
  stops: stops
}, {
  name: '2014',
  description: 'Invasion Probability',
  property: 'Probability of introduction T21',
  stops: stops
}, {
  name: '2015',
  description: 'Invasion Probability',
  property: 'Probability of introduction T22',
  stops: stops
}, {
  name: '2016',
  description: 'Invasion Probability',
  property: 'Probability of introduction T23',
  stops: stops
}, {
  name: '2017',
  description: 'Invasion Probability',
  property: 'Probability of introduction T24',
  stops: stops
}, {
  name: '2018',
  description: 'Invasion Probability',
  property: 'Probability of introduction T25',
  stops: stops
}
]

class App extends React.Component {
  mapRef = React.createRef();
  map;

  constructor(props: Props) {
    super(props);
    this.state = {
      active: options[0]
    };
  }

  componentDidUpdate() {
    this.setFill();
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/gcmillar/ckc13n1qe3rgx1ilchl8u3xax',
      // style: 'mapbox://styles/mapbox/dark-v10',
      center: [12, 26],
      zoom: 1.5,
    });

    this.map.on('load', () => {
      this.map.addSource('countries', {
        type: 'geojson',
        data
      });

      this.map.addLayer({
        id: 'countries',
        type: 'fill',
        source: 'countries'
      },'country-label'); // ID metches `mapbox/streets-v9`

      this.setFill();
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
    );    
  }

  render() {
    const { name, description, stops, property } = this.state.active;
    const renderLegendKeys = (stop, i) => {
      return (
        <div key={i} className='txt-s'>
          <span className='mr6 round-full w12 h12 inline-block align-middle' style={{ backgroundColor: stop[1] }} />
          <span>{`${stop[0].toLocaleString()}`}</span>
        </div>
      );
    }

   
    const renderOptions = (option, i) => {
      return (
        <label key={i} className="toggle-container">
          <input onChange={() => this.setState({ active: options[i] })} checked={option.property === property} name="toggle" type="radio" />
          <div className="toggle txt-s color-white py3 toggle--active-white">{option.name}</div>
        </label>
      );
    }

    return (
      <div>
        <div ref={this.mapRef} className="absolute top right left bottom" />
        <div  className="toggle-group ctxt-bold color-white absolute top left ml12 mt12 border border--2 border--white bg-transparent  shadow-darken10 z1 ">
          {options.map(renderOptions)}
        </div>
        <div  className=" bg-transparent color-white absolute bottom right mr12 mb24 py12 px12 border--white round border border--2 shadow-darken10 z1 wmax180">
          <div className='mb6 color-white'>
            <h2 className="txt-bold txt-s block color-white">{name}</h2>
            <p className='txt-s color-white'>{description}</p>
          </div>
          {stops.map(renderLegendKeys)}
        </div>
      </div>
    );
  }
}

export default App;

