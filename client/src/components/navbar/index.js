import React, { useEffect } from 'react';
import UserService from '../../services/UserService';

const Navbar = () => {
  useEffect(() => {
    (async () => {
      const { data } = await UserService.getCurrentUser();

      console.log(data);
    })();
  });

  return <p>james</p>;
};

export default Navbar;
