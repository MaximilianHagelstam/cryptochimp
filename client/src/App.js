import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Buy from './components/buy';
import Home from './components/home';
import Login from './components/login';
import Navbar from './components/navbar';
import NotFound from './components/notFound';
import Sell from './components/sell';
import Wallet from './components/wallet';
import UserService from './services/UserService';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    (async () => {
      const currentUser = await UserService.getCurrentUser();

      if (currentUser) {
        setIsAuth(true);
      }
    })();
  }, []);

  return (
    <>
      {isAuth ? (
        <>
          <Navbar />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/wallet" element={<Wallet />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
