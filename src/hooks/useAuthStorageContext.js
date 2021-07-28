import { useContext } from 'react';

import AuthStorageContext from '../contexts/AuthStorageContext';

// useAuthStorageContext custom hook for accessing authStorage context
const useAuthStorageContext = () => {
  const context = useContext(AuthStorageContext);
  if (context === undefined) {
    throw new Error(
      'useAuthStorageContext must be within a AuthStorageProvider'
    );
  }

  return context;
};

export default useAuthStorageContext;
