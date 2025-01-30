import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MainPage = () => {
  return (
    <MapContainer
      center={[37.5665, 126.978]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[37.5665, 126.978]}>
        <Popup>여기가 서울입니다!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MainPage;
