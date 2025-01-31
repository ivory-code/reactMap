import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationMarker from "../../components/LocationMarker";
import { getRandomColor } from "../../utils/getRandomColor";
import { displayCustomIcon } from "../../utils/displayCustomIcon";

// 로컬 저장소에서 마커 데이터 불러오기
const loadMarkers = () => {
  const storedMarkers = localStorage.getItem("markers");
  return storedMarkers ? JSON.parse(storedMarkers) : [];
};

const ClickableMap = ({ markers, setMarkers }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const newMarker = { id: Date.now(), lat, lng, color: getRandomColor() };
      const updatedMarkers = [...markers, newMarker];

      setMarkers(updatedMarkers);
      localStorage.setItem("markers", JSON.stringify(updatedMarkers)); // 로컬 저장
    },
  });

  return null;
};

const MainPage = () => {
  const [markers, setMarkers] = useState(loadMarkers());

  return (
    <MapContainer
      center={[37.5665, 126.978]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
      <ClickableMap markers={markers} setMarkers={setMarkers} />

      {markers.map((marker) => (
        <React.Fragment key={marker.id}>
          <Marker
            position={[marker.lat, marker.lng]}
            icon={displayCustomIcon("../../assets/smileHeart.png")}
          />
          <Circle
            center={[marker.lat, marker.lng]}
            radius={300}
            color={marker.color}
          />
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default MainPage;
