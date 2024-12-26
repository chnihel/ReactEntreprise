import React, { useState } from 'react'
import auth from '../../service/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginError, loginRequest, loginSuccess } from '../../redux/userSlice';

const Login = () => {
  const dispatch = useDispatch();

    const [Data , setData]= useState({email:'',password:''})
    const navigate=useNavigate()
  const OnchangeHandler = (e)=>{
    setData({...Data,[e.target.name]:e.target.value})
  } 

const SignIn = async (event) => {
  event.preventDefault();
  try {
    dispatch(loginRequest());

    const response = await auth.SignIn(Data);
    console.log("Authentifiée avec succès :", response.data);

    const { user, tokens } = response.data;

    const itemType = user.item?.trim().toLowerCase();
    const UserStatus = user.status?.trim();
    const UserVerify = user.verify;

    console.log("Valeur normalisée de user.item :", itemType);
    console.log("Valeur normalisée de user.status :", UserStatus);
    console.log("Valeur de user.verify :", UserVerify);

    if (itemType === "entreprise" && UserVerify === true && UserStatus === "Acceptable") {
      alert("Authentifiée avec succès !");
      const userData = {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          username: user.username,
          password: user.password,
          code: user.code,
          verify: user.verify,
          item: user.item,
          logo: user.logo,
          numero: user.numero,
          siteweb: user.siteweb,
          responsable: user.responsable,
          description: user.description,
          archive: user.archive,
          status: user.status,
        },
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      };

      dispatch(loginSuccess(userData));
      navigate('/');
    } else if (itemType === "admin") {
      alert("Authentifiée avec succès !");
      const userData = {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          username: user.username,
          password: user.password,
          code: user.code,
          verify: user.verify,
          item: user.item,
          logo: user.logo,
        },
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      };

      dispatch(loginSuccess(userData));
      navigate('/homeAdmin');
    } else {
      alert("Accès refusé : Vérifiez vos informations !");
    }
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error);
    dispatch(loginError(error));
    alert("Erreur lors de l'authentification.");
  }
};

  return (
    <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <div
      class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div class="d-flex align-items-center justify-content-center w-100">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-6 col-xxl-3">
            <div class="card mb-0">
              <div class="card-body">
                <a href="./index.html" class="text-nowrap logo-img text-center d-block py-3 w-100">
                  <img src="../assets/images/logos/logo-light.svg" alt=""/>
                </a>
                <p class="text-center">Your Social Campaigns</p>
                <form onSubmit={SignIn}>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={OnchangeHandler}/>
                  </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="password" onChange={OnchangeHandler}/>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mb-4">
                    <div class="form-check">
                      <input class="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" checked/>
                      <label class="form-check-label text-dark" for="flexCheckChecked">
                        Remeber this Device
                      </label>
                    </div>
                    <Link to="/forgot" class="text-primary fw-bold" >Forgot Password ?</Link>
                  </div>
                  <button type='submit'  class="btn btn-primary w-100 py-8 fs-4 mb-4">Sign In</button>
                  <div class="d-flex align-items-center justify-content-center">
                    <p class="fs-4 mb-0 fw-bold">New to SeoDash?</p>
                    <Link class="text-primary fw-bold ms-2" to="/register">Create an account</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
