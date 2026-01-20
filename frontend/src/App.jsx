import './App.css';
import { Outlet } from 'react-router-dom';
import { Header } from './components';
import { Footer } from './components';
import ClickSpark from './components/effects/ClickSpark.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';


function App() {
  return (
    <ClickSpark sparkColor="#FFA500" sparkSize={12}>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </ClickSpark>
  )
}

export default App
