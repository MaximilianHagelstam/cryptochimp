import { Route, Routes } from 'react-router-dom';
import Buy from './components/buy';
import Home from './components/home';
import Navbar from './components/navbar';
import NotFound from './components/notFound';
import Sell from './components/sell';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
