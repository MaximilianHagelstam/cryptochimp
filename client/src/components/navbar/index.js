import React, { useEffect } from 'react';
import UserService from '../../services/UserService';

const Navbar = () => {
  useEffect(() => {
    (async () => {
      const currentUser = await UserService.getCurrentUser();
      console.log(currentUser);
    })();
  });

  return <p>james</p>;
};

export default Navbar;
