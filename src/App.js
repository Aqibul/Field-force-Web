import './App.css';
import SignUp from './Component/SignUp';
import Home from './Component/Sales/Home';
import { Route, Router, BrowserRouter, Routes } from 'react-router-dom';
import Profile from './Component/Sales/Profile';
import Pjb from './Component/Sales/Pjb';
import Architect from './Component/Sales/Clients/Architect';
import AdminHome from './Component/Admin/Screens/AdminHome';
import AddCategory from './Component/Admin/Screens/Category/AddCategory';
import AddRoles from './Component/Admin/Screens/Role/AddRoles';
import AddDealer from './Component/Admin/Screens/Dealer/AddDealer';
import SubDealer from './Component/Admin/Screens/Dealer/SubDealer';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path='admin'>
          <Route path='home' element={<AdminHome/>}/>
          <Route path='addcategory' element={<AddCategory/>}/>
          <Route path='add-roles' element={<AddRoles/>}/>
          <Route path='add-dealer' element={<AddDealer/>}/>
          <Route path='sub-dealer' element={<SubDealer/>}/>
        </Route> 


        <Route path="/" element={<Home />} />
        <Route path='login' element={<SignUp />} />
        <Route path='profile' element={<Profile />} />
        <Route path='pjb' element={<Pjb />} />
        <Route path='architect' element={<Architect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;