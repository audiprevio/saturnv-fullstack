import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { GoogleMap, Marker, OverlayView } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { MapCenterContext } from "../contexts/MapCenterContext";
import markerIcon from "../assets/marker.svg";

function MainMapComponent() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();
  const { mapCenter, setMapCenter } = useContext(MapCenterContext);

  const [mapActive, setMapActive] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [zoom, setZoom] = useState(10);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
      return;
    }

    const activateMap = setTimeout(() => setMapActive(true), 100);
    return () => clearTimeout(activateMap);
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    fetch(`${apiUrl}/tasks/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => setTasks(data.map(task => ({ ...task, visible: true }))))
      .catch(error => console.error("An error occurred:", error));
  }, );

  const containerStyle = useMemo(() => ({
    width: "100vw",
    height: "100vh",
  }), []);

  const onLoad = useCallback(map => setMap(map), []);
  const onUnmount = useCallback(() => setMap(null), []);

  useEffect(() => {
    if (map) map.panTo(mapCenter);
  }, [map, mapCenter]);

  const handleMarkerClick = useCallback((taskLocation) => {
    setMapCenter(taskLocation);
    setZoom(17);
  }, [setMapCenter]);

  const filteredTasks = useMemo(() => 
    tasks.filter(task => !task.isDeleted), [tasks]
  );

  
  const renderMarkers = useCallback(() => {
    return filteredTasks.map((task, index) => (
      <Marker
        key={index}
        position={task.taskLocation}
        icon={markerIcon}
        onClick={() => handleMarkerClick(task.taskLocation)}
      >
        <OverlayView
          position={task.taskLocation}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="inline-block whitespace-nowrap 
              overflow-auto min-w-[6rem] max-w-[24rem] px-[1rem] 
              py-[0.75rem] bg-white font-medium shadow-lg 
              overflow-ellipsis">
            <p
              className="text-black text-[16px]"
              onClick={() => handleMarkerClick(task.taskLocation)}
            >
              {task.taskName}
            </p>
          </div>
        </OverlayView>
      </Marker>
    ));
  }, [filteredTasks, handleMarkerClick]);

  return mapActive ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {renderMarkers()}
    </GoogleMap>
  ) : null;
}

export default MainMapComponent;
