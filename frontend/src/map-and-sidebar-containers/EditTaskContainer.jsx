import { useState } from 'react';
import MainMapComponent from '../components/MainMapComponent';
import TaskEditForm from '../components/sidebar-containers/TaskEditForm';
import { useParams } from 'react-router-dom';
function EditTaskContainer() {
  const { id } = useParams();
  const [taskData, setTaskData] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: -3.745, lng: -38.523 });

  const handleTaskSubmit = (data) => {
    setTaskData(data);
  };

  const[marker,setMarker]=useState([])
  
  return (
    <div className="relative flex flex-row max-h-[100vh] shadow-none ">
      <TaskEditForm taskId={id} setMapCenter={setMapCenter} />
      <MainMapComponent taskData={taskData} mapCenter={mapCenter} setMapCenter={setMapCenter} />
    </div>
  );
}

export default EditTaskContainer;