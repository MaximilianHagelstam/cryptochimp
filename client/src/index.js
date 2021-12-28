import { ChakraProvider } from '@chakra-ui/react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

render(
  <BrowserRouter>
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
