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

  const resetMarkers = () => {
    setMarkers([]); // 상태 초기화
    localStorage.removeItem("markers"); // 로컬 스토리지 초기화
  };

  return (
    <div>
      <button
        onClick={resetMarkers}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "10px 15px",
          background: "#FF5C5C",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1000, // 지도가 버튼을 덮지 않도록 설정
        }}
      >
        초기화
      </button>

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
    </div>
  );
};

export default MainPage;
