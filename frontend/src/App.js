import * as React from 'react';
import { useEffect, useState } from 'react';
import Map, {NavigationControl, Marker, Popup} from 'react-map-gl';
import Navbar from './components/navbar.js';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';
import {Star} from "@mui/icons-material";
import axios from 'axios';

function App() {
  const [pins, setPins] = useState([]);
  const [showPopup, setShowPopup] = React.useState(true);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch(err) {
        console.log(err);
      }
    };
    getPins();
  }, [])
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
        {pins.map( p => (
          <>
        <Marker longitude = {p.long}
        latitude = {p.lat}/>
    {showPopup && (
      <Popup 
        longitude={p.long} latitude={p.lat}
        anchor="top"
        onClose={() => setShowPopup(false)}>
        <div className = "card">
          <label>Place</label>
          <h4 className="place">{p.title}</h4>
          <label>Review</label>
          <p className = "desc">{p.desc}</p>
          <label>Rating</label>
            <div className="stars">
              <Star className="star"></Star>
              <Star className="star"></Star>
              <Star className="star"></Star>
              <Star className="star"></Star>
              <Star className="star"></Star>
            </div>
          <label>Information</label>
          <span className="username">Created by <b> {p.username}</b></span>
          <span className="date">1 hour ago</span>
        </div>
      </Popup>)}</>
        ))}

      </Map>
    </div>
  );
}

export default App;
