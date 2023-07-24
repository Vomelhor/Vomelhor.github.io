import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useReloadOnNavigate = () => {
  const location = useLocation();
  const [shouldReload, setShouldReload] = useState(true);

  useEffect(() => {
    if (location.pathname === '/' && shouldReload) {
      setShouldReload(false);
      window.location.reload();
    }
  }, [location, shouldReload]);
};

export default useReloadOnNavigate;
