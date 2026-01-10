import './App.css';
import { Outlet } from 'react-router-dom';
import { Header } from './components';
import ClickSpark from './components/effects/ClickSpark.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
    </>
  )
}

export default App
