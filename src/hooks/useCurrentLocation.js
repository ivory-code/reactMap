import { useEffect, useState } from "react";

const useCurrentLocation = () => {
  const [position, setPosition] = useState([37.5665, 126.978]); // 초기값: 서울 중심부

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (err) => {
        console.error("Error getting location", err);
      },
      {
        enableHighAccuracy: true, // GPS 정확도 최적화
        timeout: 10000, // 10초 안에 위치 요청
        maximumAge: 1000, // 1초 내 캐시 사용
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return position;
};

export default useCurrentLocation;
