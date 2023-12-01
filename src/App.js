import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import UserLogin from './components/UserLogin';
import BankLogin from './components/BankLogin';
import Loader from './components/Loader';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Logout from './modal/Logout';
import RequireAuth from './components/RequireAuth';
import Homepage from './components/Homepage';

function App() {
  return (
    <>
      {/* <Logout /> */}
      <Router>
        <Routes>
          <Route exact path='/' element={<Layout />} >

            <Route exact path='login' element={<Login />} >
              <Route index element={<UserLogin />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path='/' element={<Homepage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      {/* <Homepage /> */}
    </>
  );
}

export default App;
