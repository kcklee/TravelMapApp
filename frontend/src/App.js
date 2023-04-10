import * as React from 'react';
import Map, {NavigationControl, Marker, Popup} from 'react-map-gl';
import Navbar from './components/navbar.js';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';
import {Star} from "@mui/icons-material";

function App() {
  const [showPopup, setShowPopup] = React.useState(true);
  return (
    <div className="App">
      <Navbar/>
      <Map mapLib={maplibregl} 
        initialViewState={{
          longitude: 2.294694,
          latitude: 48.858093,
          zoom: 14
        }}
        style={{width: "100%", height: " calc(100vh - 77px)"}}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=78hZLzofApxPlD694BeZ"
      >
        <NavigationControl position="top-left" />
        <Marker longitude = {2.294694}
        latitude = {48.858093}/>
    {showPopup && (
      <Popup 
        longitude={2.294694} latitude={48.858093}
        anchor="top"
        onClose={() => setShowPopup(false)}>
        <div className = "card">
          <label>Place</label>
          <h4 className="place">Eiffel Tower</h4>
          <label>Review</label>
          <p className = "desc">Beautiful Place!</p>
          <label>Rating</label>
            <div className="stars">
              <Star className="star"></Star>
              <Star className="star"></Star>
              <Star className="star"></Star>
              <Star className="star"></Star>
              <Star className="star"></Star>
            </div>
          <label>Information</label>
          <span className="username">Created by <b> Kevin</b></span>
          <span className="date">1 hour ago</span>
        </div>
      </Popup>)}
      </Map>
    </div>
  );
}

export default App;
