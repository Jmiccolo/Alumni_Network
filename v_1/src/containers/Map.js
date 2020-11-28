import React, {Component} from "react";
import mapboxgl from 'mapbox-gl';
import turf from 'turf';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam1pY2NvbG84OSIsImEiOiJja2QzY2l4b3cwcjZmMndueTVjZXEzdG1tIn0.HnxIV4yzLFQqE5RyLWwlsw'; 
class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      lng:-95,
      lat:37,
      zoom:2.5,
    }
  }
  componentDidMount() {
    const bounds = [
      [-180, -90], 
      [180, 90]
    ];
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/jmiccolo89/ckd3cncct3t3x1ioa0d2b8uot',
      zoom: this.state.zoom,
      center:[this.state.lng, this.state.lat],
      maxBounds: bounds
    });
    var draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
      polygon: true,
      trash: true
      }
      });
    
    map.addControl(draw);
 
      map.on('draw.create', updateArea);
      map.on('draw.delete', updateArea);
      map.on('draw.update', updateArea);

    map.on("load", function(){
      map.addLayer({
        id:"Brothers",
        type:"circle",
        source: {
          "type":"geojson",
          "data": {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-73.949997, 40.650002]
            },
        }},
        paint:{
          'circle-radius': 20,
          'circle-color': "blue",
        }
      })
    })
    function updateArea(e) {
      var data = draw.getAll();
      var answer = document.getElementById('calculated-area');
      var maxX = data.features[0].geometry.coordinates[0].reduce((a,b) => Math.max(a, b[0]), -90);
      var maxY = data.features[0].geometry.coordinates[0].reduce((a,b) => Math.max(a, b[1]), -180);
      var minX = data.features[0].geometry.coordinates[0].reduce((a,b) => Math.min(a, b[0]), 90);
      var minY = data.features[0].geometry.coordinates[0].reduce((a,b) => Math.min(a, b[1]), 180);

      if (data.features.length > 0) {
      // restrict to area to 2 decimal points
      var numBrothers = 0;

      

      answer.innerHTML =
      '<p><strong>' +
      numBrothers +
      ' Brothers are in the area</strong></p><p>square meters</p>';
      } else {
      answer.innerHTML = '';
      if (e.type !== 'draw.delete')
      alert('Use the draw tools to draw a polygon!');
      }
      }
  }
  render(){ 
  return (
    <div className="App">
      <div className="sidebarStyle">
        <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
      </div>
        <div ref={el => this.mapContainer = el} className="mapContainer"/>
        <div className="calculation-box">
<p>Draw a polygon using the draw tools.</p>
<div id="calculated-area"></div>
</div>
    </div>
  );
  }
}

export default Map;