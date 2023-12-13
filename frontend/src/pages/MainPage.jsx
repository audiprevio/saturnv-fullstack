import { useJsApiLoader } from '@react-google-maps/api';
import { googleAPIKey } from '../config';
import MainTaskPreviewContainer from '../map-and-sidebar-containers/MainTaskPreviewContainer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const libraries = ['places'];

function MainPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleAPIKey,
    libraries,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return isLoaded ? <MainTaskPreviewContainer /> : null;
}

export default MainPage;