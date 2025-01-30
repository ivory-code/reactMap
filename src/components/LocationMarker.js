import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import useCurrentLocation from "../hooks/useCurrentLocation";

const LocationMarker = () => {
  const position = useCurrentLocation();
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1.5 }); // 부드럽게 이동
    }
  }, [position, map]);

  return position ? (
    <Marker position={position}>
      <Popup>현재 위치</Popup>
    </Marker>
  ) : null;
};

export default LocationMarker;
