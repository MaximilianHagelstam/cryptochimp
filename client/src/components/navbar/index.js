import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const currentUser = await UserService.getCurrentUser();

      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/james');
      }
    })();
  }, [navigate]);

  return (
    <>
      <p>james</p>
    </>
  );
};

export default Navbar;
