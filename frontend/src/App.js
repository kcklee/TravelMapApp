import * as React from "react";
import { useEffect, useState } from "react";
import Map, { NavigationControl, Marker, Popup } from "react-map-gl";
import Navbar from "./components/navbar.js";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import { Star } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";

function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [year, setYear] = useState(null);
  const [trip, setTrip] = useState(null);
  const [haveVisited, setHaveVisited] = useState(false);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
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
      year,
      trip,
      haveVisited,
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
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: 2.294694,
          latitude: 48.858093,
          zoom: 4,
        }}
        style={{ width: "100%", height: " calc(100vh - 77px)" }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=78hZLzofApxPlD694BeZ"
        onDblClick={handleAddClick}
      >
        <NavigationControl position="top-left" />
        {pins.map((p) => (
          <>
            <Marker
              color={p.haveVisited ? "#006600" : "#0066CC"}
              longitude={p.long}
              latitude={p.lat}
              onClick={() => handleMarkerClick(p._id)}
            />

            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="top"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>City</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Notes</label>
                  <p className="desc">{p.desc}</p>
                  <label>Year</label>
                  <span className="year">{p.year}</span>
                  <label>Trip</label>
                  <span className="trip">{p.trip}</span>
                  <label>Information</label>
                  <span className="username">
                    Created by <b> {p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <>
            <Marker latitude={newPlace.lat} longitude={newPlace.long}></Marker>
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
                  <label>City</label>
                  <input
                    placeholder="Enter a city"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Notes</label>
                  <textarea
                    placeholder="Enter your notes"
                    autoFocus
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Year</label>
                  <input
                    placeholder="Enter the year"
                    autoFocus
                    onChange={(e) => {
                      e.target.value != null
                        ? setYear(e.target.value)
                        : setYear(null);
                    }}
                  />
                  <label>Trip</label>
                  <input
                    placeholder="Enter the trip info"
                    autoFocus
                    onChange={(e) => {
                      e.target.value != null
                        ? setTrip(e.target.value)
                        : setYear(null);
                    }}
                  />
                  <label>Visited</label>
                  <input
                    placeholder="true/false"
                    autoFocus
                    onChange={(e) => setHaveVisited(e.target.value)}
                  />
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
