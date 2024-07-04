import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import RegisterHotel from "./Pages/RegisterHotel";
import RegisterUser from "./Pages/RegisterUser";
import MainPage from "./Pages/MainPage";
import Profile from "./Pages/Profile";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<RegisterUser/>} />
      <Route path="registerhotel" element={<RegisterHotel/>}/>
      <Route path='/' element={<MainPage/>} />
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
