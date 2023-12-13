import { useState, useEffect } from 'react';
import TaskForm from '../components/sidebar-containers/TaskForm';
import MainMapComponent from '../components/MainMapComponent';
import { useNavigate } from 'react-router-dom';

function AddTaskContainer() {
  const [taskData, setTaskData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Checking token...');
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.log('No token found, navigating to /login');
      navigate('/login');
    }
  }, [navigate]);

  const handleTaskSubmit = (data) => {
    setTaskData(data);
  };

  const[marker,setMarker]=useState([])
  
  return (
    <div className="relative flex flex-row max-h-[100vh] shadow-none ">
      <TaskForm className="z-50 w-1/2" onSubmit={handleTaskSubmit} />
      <MainMapComponent className="w-1/2" taskData={taskData} />
    </div>
  );
}

export default AddTaskContainer;
