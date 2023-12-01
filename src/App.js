import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import UserLogin from './components/UserLogin';
import BankLogin from './components/BankLogin';
import Loader from './components/Loader';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (

    <Router>
      <Routes>
        <Route exact path='/' element={<Layout />} >
          <Route exact path='/' element={<Login />} >
            <Route index element={<UserLogin />} />
            <Route path='banklogin' element={<BankLogin />} />
            <Route path='userlogin' element={<UserLogin />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
