import { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

function Map() {
  const [latitude, setLatitude] = useState("29.7255333");
  const [longitude, setLongitude] = useState("-98.4946");
  const [markerPosition, setMarkerPosition] = useState(null);

  const [userLocation, setUserLocation] = useState(null);
  const [showShareLink, setShowShareLink] = useState(false);
  const [apiKey, setApiKey] = useState("");

  //fetch from the server
  const getUserLocation = () => {
    fetch("/api/location")
      .then((response) => response.json())
      .then((data) => {
        const { latitude, longitude, apiKey } = data;
        console.log(latitude, longitude, apiKey);
        setLatitude(parseFloat(latitude));
        setLongitude(parseFloat(longitude));
        setUserLocation({
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        });
        console.log(apiKey, "biiitch");
        setApiKey(apiKey);
      })
      .catch((error) => {
        console.log("Error getting user location", error);
      });
  };

  //creating share link
  const generateShareLink = () => {
    const searchParams = new URLSearchParams();

    if (markerPosition) {
      searchParams.set("lat", markerPosition.lat);
      searchParams.set("lon", markerPosition.lng);
    } else {
      searchParams.set("lat", latitude);
      searchParams.set("lon", longitude);
    }

    const baseUrl = window.location.href.split("?")[0];
    const shareUrl = `${baseUrl}?${searchParams.toString()}`;

    return shareUrl;
  };

  //use effect code for share link, the idea is to make the app show the map and pin on page load
  useEffect(() => {
    getUserLocation();

    const urlParams = new URLSearchParams(window.location.search);
    const latParam = urlParams.get("lat");
    const lonParam = urlParams.get("lon");

    if (latParam && lonParam) {
      setLatitude(latParam);
      setLongitude(lonParam);
      setMarkerPosition({
        lat: parseFloat(latParam),
        lng: parseFloat(lonParam),
      });
    }
  }, []);

  //handles the latitude value and longitude value
  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  //the function that runs when a user clicks add marker
  const handleMarkerClick = () => {
    if (userLocation) {
      console.log(userLocation, "wooooof");
      setMarkerPosition(userLocation);
    } else if (latitude && longitude) {
      console.log(latitude, longitude, "whats thiiis");
      const position = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      };
      console.log(position);
      setMarkerPosition(position);
    }
  };

  const handleShareButtonClick = () => {
    setShowShareLink(true);
  };

  return (
    <div className="map-container">
      <div>
        <label htmlFor="latitude">Latitude: </label>
        <input
          type="text"
          id="latitude"
          value={latitude}
          onChange={handleLatitudeChange}
        />
      </div>
      <div>
        <label htmlFor="longitude">Longitude: </label>
        <input
          type="text"
          id="longitude"
          value={longitude}
          onChange={handleLongitudeChange}
        />
      </div>
      <button onClick={handleMarkerClick}>Add Marker</button>
      <button onClick={getUserLocation}>Get Current Location</button>

      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition}
          zoom={10}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </LoadScript>
      {markerPosition && <Marker position={markerPosition} />}
      <button onClick={handleShareButtonClick}>Share</button>
      {showShareLink && (
        <div className="share-box">
          <p>Share this location</p>
          <input type="text" value={generateShareLink()} readOnly />
        </div>
      )}
    </div>
  );
}

export default Map;
