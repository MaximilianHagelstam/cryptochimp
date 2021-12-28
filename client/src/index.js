import { ChakraProvider } from '@chakra-ui/react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';

render(
  <BrowserRouter>
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Navbar />} />
      </Routes>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
