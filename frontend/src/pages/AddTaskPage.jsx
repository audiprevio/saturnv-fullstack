import { useJsApiLoader } from '@react-google-maps/api';
import { googleAPIKey } from '../config';
import AddTaskContainer from '../map-and-sidebar-containers/AddTaskContainer';

const libraries = ['places'];

function GoogleMapsLoader() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleAPIKey,
    libraries, 
  });

  return isLoaded ? <AddTaskContainer /> : null;
}

export default GoogleMapsLoader;

