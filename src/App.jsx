import { ThemeProvider, createTheme } from '@mui/material';

import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/header/Header';
import Router from './Router';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ABA5F3',
      },
      secondary: {
        main: '#1cc7d0',
        light: '#F5EBFF',
        contrastText: '#47008F',
      },
    },
  });

  return (
    <div className="App font-pre">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Router />
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
