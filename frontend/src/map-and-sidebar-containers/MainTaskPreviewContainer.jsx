import MainMapComponent from '../components/MainMapComponent';
import TaskSidebar from '../components/sidebar-containers/TaskSidebar';
import { useState } from 'react';

function MainTaskPreviewContainer() {
  const [taskData, setTaskData] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: -3.745, lng: -38.523 });

  const handleTaskSubmit = (data) => {
    setTaskData(data);
  };

  const[marker,setMarker]=useState([])
  
  return (
    <div className="relative flex flex-row max-h-[100vh] shadow-none ">
      <TaskSidebar setMapCenter={setMapCenter} />
      <MainMapComponent taskData={taskData} mapCenter={mapCenter} setMapCenter={setMapCenter} />
    </div>
  );
}

export default MainTaskPreviewContainer;