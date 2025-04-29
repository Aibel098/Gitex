import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
});

const MapComponent = () => {
  const position = [24.8607, 67.0011]; // Karachi Coordinates

  return (
    <div className="h-[65vh] w-full rounded-lg overflow-hidden shadow-md mt-4 -z-10 relative">
      <MapContainer center={position} zoom={13} className="h-full w-full">
        {/* Custom Tile Layer */}
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        
        {/* Marker for Position */}
        <Marker position={position} icon={customIcon}>
          <Popup>Current Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
