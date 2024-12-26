import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home/home';
import Register from './views/Register/register';
import Login from './views/Login/login';
import ForgotPassword from './views/forgotPassword/forgotPassword';
import ResetPassword from './views/ResetPassword/resetPassword';
import CreatePublication from './views/Home/Publication/CreatePublication';
import Layout from './views/Home/layout';
import PublicationList from './views/Home/Publication/PublicationList';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import UpdatePassword from './views/Home/Entreprise/updatePassword';
import HomeAdmin from './views/HomeAdmin/HomeAdmin';
import EntrepriseList from './views/HomeAdmin/Entreprise/EntrepriseList';
import UpdateProfilAdmin from './views/HomeAdmin/Admin/UpdateProfilAdmin';
import Profile from './views/Home/Entreprise/profil';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}>
          <Route path="/" element={<Layout />} />

          <Route path="/addPublication" element={<CreatePublication />} />
          <Route path="/publicationList" element={<PublicationList />} />
          <Route path='/profile' element={<Profile/>}/>
            <Route path='/updatePassword' element={<UpdatePassword/>}/>


        </Route>
        <Route path="/homeAdmin" element={<PrivateRoute><HomeAdmin /></PrivateRoute>}>
              <Route path="/homeAdmin" element={<Layout />} />
              <Route path="/homeAdmin/entrepriseList" element={<EntrepriseList />} />
                <Route path="/homeAdmin/profile" element={<UpdateProfilAdmin />} />
                  <Route path='/homeAdmin/updatePassword' element={<UpdatePassword/>}/>

        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />

      </Routes>

    </Router>

  );
}

export default App;
