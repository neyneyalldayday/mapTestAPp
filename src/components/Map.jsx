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

  
  const [showShareLink, setShowShareLink] = useState(false);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude.toString());
          setLongitude(longitude.toString());
          setMarkerPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log("Error getting user location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleMarkerClick = () => {
    if (latitude && longitude) {
      const position = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      };

      setMarkerPosition(position);
    }
  };

  const generateShareLink = () => {
    const baseUrl = window.location.href.split("?")[0];
    const shareUrl = `${baseUrl}?lat=${latitude}&lon${longitude}`;

    return shareUrl;
  }

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

      <LoadScript googleMapsApiKey="AIzaSyBo8JkbyffU2Dbv8_MDEsvcOzymPyEL0xQ">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition}
          zoom={10}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </LoadScript>     
      <button onClick={handleShareButtonClick}>Share</button>
      {showShareLink && (
        <div>
          <p>Share this location</p>
          <input type="text" value={generateShareLink()} readOnly />
        </div>
      )}
    </div>
  );
}

export default Map;
