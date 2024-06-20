import { ThemeProvider, createTheme } from '@mui/material';

import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/header/Header';
import Router from './Router';
import { createContext, useState } from 'react';

export const DeliveryContext = createContext(null);

const DeliveryProvider = ({ children }) => {
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    label: '',
    zipcode: '',
    address: '',
    realAddress: '',
    phoneNumber: '',
    landlinePhoneNumber: '',
  });

  return (
    <DeliveryContext.Provider value={{ deliveryInfo, setDeliveryInfo }}>
      {children}
    </DeliveryContext.Provider>
  );
};
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#8BC34A',
      },
      secondary: {
        main: '#FF9800',
        light: '#FFEB3B',
        contrastText: '#364D1C',
      },
    },
  });

  return (
    <div className="tw-App tw-font-pre">
      <ThemeProvider theme={theme}>
        <DeliveryProvider>
        <BrowserRouter>
          <Header />
          <Router />
          <Footer />
        </BrowserRouter>
        </DeliveryProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
