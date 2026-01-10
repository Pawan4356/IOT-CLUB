import './App.css';
import { Outlet } from 'react-router-dom';
import { Header } from './components';
import ClickSpark from './components/effects/ClickSpark.jsx';

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
