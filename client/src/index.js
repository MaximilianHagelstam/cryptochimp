import { ChakraProvider } from '@chakra-ui/react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import NotFound from './components/notFound';

render(
  <BrowserRouter>
    <ChakraProvider>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Navbar />} />
      </Routes>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
