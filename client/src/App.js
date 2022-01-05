import { Route, Routes } from 'react-router-dom';
import Buy from './components/buy';
import Home from './components/home';
import Navbar from './components/navbar';
import NotFound from './components/notFound';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
