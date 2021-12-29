import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
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
      </Routes>
      <Footer />
    </>
  );
};

export default App;
