import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import NotFound from './components/notFound';

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Navbar />} />
    </Routes>
  );
};

export default App;
