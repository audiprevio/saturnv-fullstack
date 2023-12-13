import './App.css'
import MainPage from './pages/MainPage'
import { MapCenterProvider } from './providers/MapCenterProvider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTaskPage from './pages/AddTaskPage'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import EditPage from './pages/EditPage';
import LoginPage from './pages/LoginPage'
import { useMediaQuery } from 'react-responsive';
import RegistPage from './pages/RegistPage';
import PreviewPage from './pages/PreviewPage'

function App() {
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 768 });

  if (isMobileDevice) {
    return (
      <div className="flex flex-col p-2 m-10 items-center justify-center h-screen font-bold text-center" style={{ font: 'Helvetica Neue' }}>
        <img src='./src/assets/icon.svg' /> 
        <hr className="my-4 w-[25rem]" />
        Orbit is currently only optimized for tabs and desktop. Please try those devices and sorry!
      </div>
    );    
  } else {
    return (
      <MapCenterProvider>
        <Router>
          <div>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/home" element={<PreviewPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistPage />} />
              <Route path="/add-task" element={<AddTaskPage />} />
              <Route path="/edit-task/:_id" element={<EditPage />} />
            </Routes>
          </div>
        </Router>
      </MapCenterProvider>
    )
  }
}

export default App;
