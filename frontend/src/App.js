import * as React from 'react';
import { useEffect, useState } from 'react';
import Map, {NavigationControl, Marker, Popup} from 'react-map-gl';
import Navbar from './components/navbar.js';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';
import {Star} from "@mui/icons-material";
import axios from 'axios';
import {format} from 'timeago.js';

function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);;
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat.toArray();
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: "Kevin",
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };


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
  }, []);
  return (
    <div className="App">
      <Navbar/>
      <Map mapLib={maplibregl} 
        initialViewState={{
          longitude: 2.294694,
          latitude: 48.858093,
          zoom: 4,
        }}
        style={{width: "100%", height: " calc(100vh - 77px)"}}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=78hZLzofApxPlD694BeZ"
        onDblClick={handleAddClick}
      >
        <NavigationControl position="top-left" />
      {pins.map( p => (
          <>
          <Marker 
            longitude = {p.long}
            latitude = {p.lat}
            onClick={() => handleMarkerClick(p._id)}/>

      {p._id === currentPlaceId && (
        <Popup 
          longitude={p.long} latitude={p.lat}
          anchor="top"
          closeButton = {true}
          closeOnClick = {false}
          onClose={() => setCurrentPlaceId(null)}>
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
          <span className="date">{format(p.createdAt)}</span>
        </div>
      </Popup>)}</>
        ))}
      {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
            >
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}
      </Map>
    </div>
  );
}

export default App;
