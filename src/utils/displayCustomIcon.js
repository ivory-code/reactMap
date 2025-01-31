import L from "leaflet";

export const displayCustomIcon = (url) => {
  return L.icon({
    iconUrl: url, // 마커 이미지
    iconSize: [40, 40], // 아이콘 크기 (width, height)
    iconAnchor: [20, 40], // 아이콘 기준점 (가운데 아래)
    popupAnchor: [0, -40], // 팝업 위치 조정
  });
};
