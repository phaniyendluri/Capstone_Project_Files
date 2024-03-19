import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/Navbar';
import IntroPage from './components/IntroPage';
import LoginPage from './components/LoginPage';
import ManagerDashboard from './components/ManagerDashBoard';

function App() {
  return (
    <div className="App">
      <NavBar/>
      {/* <IntroPage/> */}
      <LoginPage/>
      {/* <ManagerDashboard/> */}
    </div>
  );
}

export default App;
