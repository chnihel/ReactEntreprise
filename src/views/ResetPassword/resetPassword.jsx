import React, { useState } from 'react'
import auth from '../../service/auth';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const {token} = useParams();
  const navigate = useNavigate()
  const [Password , setPassword]= useState({password:''})
  const [ConfirmPass , setConfirmPass]= useState()
  const OnchangeHandler = (e)=>{
    setPassword({...Password,[e.target.name]:e.target.value})
  } 
      const  Reset = async (event)=>{
    event.preventDefault();
      try {
        if(Password !== ConfirmPass ){
          alert('Password and Confirm Password should be same')
        }
  
    const response = await auth.Reset(Password, token);
    console.log("mot de passe changé avec succés :", response.data);
    alert("mot de passe changé avec succés");
    navigate('/login')
  } catch (error) {
    console.error("Erreur lors de changement de mot de passe :", error);
    alert("Erreur lors de changement de mot de passe .");
  }
  }
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
                <form onSubmit={Reset}>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="password" onChange={(e)=>setPassword(e.target.value)}/>
                  </div>

                     <div class="mb-4">
                    <label for="exampleInputEmail1" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="password" onChange={(e)=>{setConfirmPass(e.target.value)}}/>
                  </div> 
            
                
                  <button type='submit'  class="btn btn-primary w-100 py-8 fs-4 mb-4">Submit</button>
            
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

export default ResetPassword
