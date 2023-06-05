import { useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

export default function Map() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);

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

  return (
    <div>
      <div>
        <label htmlFor="latitude">Latitude:</label>
        <input
          type="text"
          id="latitude"
          value={latitude}
          onChange={handleLatitudeChange}
        />
      </div>
      <div>
        <label htmlFor="longitude">Longitude:</label>
        <input
          type="text"
          id="longitude"
          value={longitude}
          onChange={handleLongitudeChange}
        />
      </div>
      <button onClick={handleMarkerClick}>Add Marker</button>
      <LoadScript googleMapsApiKey="AIzaSyBo8JkbyffU2Dbv8_MDEsvcOzymPyEL0xQ">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition}
          zoom={10}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
