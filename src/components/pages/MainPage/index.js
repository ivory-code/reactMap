import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useCurrentLocation from "../../../hooks/useCurrentLocation";

// 사용자 위치를 마커로 표시하는 컴포넌트
const LocationMarker = () => {
  const position = useCurrentLocation();
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>현재 위치</Popup>
    </Marker>
  );
};

const MapPage = () => {
  return (
    <MapContainer
      center={[37.5665, 126.978]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapPage;
