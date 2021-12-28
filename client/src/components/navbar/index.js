import React, { useEffect } from 'react';
import UserService from '../../services/UserService';

const Navbar = () => {
  useEffect(() => {
    (async () => {
      const res = await UserService.isUserAuthenticated();
      console.log(res);
    })();
  });

  return <p>james</p>;
};

export default Navbar;
