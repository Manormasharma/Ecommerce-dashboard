import './App.css';
import Footer from './Footer/Footer';
import Header from './Header/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import PrivateComponent from './PrivateComponent';
import AddProducts from './Pages/AddProducts';
import ProducList from './Pages/ProducList';
import UpdateProducts from './Pages/UpdateProducts';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <div className='content'>
          <Routes>
            <Route element={<PrivateComponent/>}>
              <Route path='/' element={<ProducList/>}></Route>
              <Route path='/add' element={<AddProducts/>}></Route>
              <Route path='/update/:id' element={<UpdateProducts/>}></Route>
              <Route path='/logout' element={<h1>Logout</h1>}></Route>
            </Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
