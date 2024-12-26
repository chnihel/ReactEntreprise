import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import entrepriseService from "../../service/entreprise";


const Register = () => {
  const [Data , setData]= useState({item:"entreprise"})
  const OnchangeHandler = (e)=>{
    setData({...Data,[e.target.name]:e.target.value})
  }
  const OnchangeFileHandler = (e)=>{
    setData({...Data,[e.target.name]:e.target.files[0]})
  }
const SignUp = async (event) => {
  event.preventDefault(); 
  
  try {
    
  const formData = new FormData();
  formData.append('name', Data.name);
  formData.append('item', 'entreprise');
  formData.append('username', Data.username);
  formData.append('email', Data.email);
    formData.append('file', Data.file);
  formData.append('numero', Data.numero);
formData.append('responsable', Data.responsable);
  formData.append('siteweb', Data.siteweb);
    formData.append('description', Data.description);
    formData.append('archive', Data.archive);
    formData.append('password', Data.password);
  
    const response = await entrepriseService.createEntreprise(formData);
    console.log("Entreprise créée avec succès :", response.data);
    alert("Entreprise créée avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création de l'entreprise :", error);
    alert("Erreur lors de la création de l'entreprise.");
  }
};
  return (
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <div
      className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xxl-3">
            <div className="card mb-0">
              <div className="card-body">
                <Link to="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                  <img src="../assets/images/logos/logo-light.svg" alt=""/>
                </Link>
                <p className="text-center">Your Social Campaigns</p>
              <form onSubmit={SignUp}  encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="exampleInputtext1" className="form-label">Name</label>
                  <input type="text" className="form-control" id="exampleInputtext1" name="name" required onChange={OnchangeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtextUsername" className="form-label">Username</label>
                  <input type="text" className="form-control" id="exampleInputtextUsername" name="username" required  onChange={OnchangeHandler}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" name="email" required onChange={OnchangeHandler}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputlogo1" className="form-label">Logo</label>
                  <input type="file" className="form-control" id="exampleInputlogo1" name="file" onChange={OnchangeFileHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputnmr1" className="form-label">Numéro</label>
                  <input type="text" className="form-control" id="exampleInputnmr1" name="numero" onChange={OnchangeHandler}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputsite1" className="form-label">Site web</label>
                  <input type="text" className="form-control" id="exampleInputsite1" name="siteweb"onChange={OnchangeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputres1" className="form-label">Responsable</label>
                  <input type="text" className="form-control" id="exampleInputres1" name="responsable"onChange={OnchangeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputdesc1" className="form-label">Description</label>
                  <input type="text" className="form-control" id="exampleInputdesc1" name="description" onChange={OnchangeHandler}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputarchive1" className="form-label">Archive</label>
                  <input type="text" className="form-control" id="exampleInputarchive1" name="archive" onChange={OnchangeHandler}/>
                </div>
                <div className="mb-4">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" name="password" required onChange={OnchangeHandler}/>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4">Sign Up</button>
                <div className="d-flex align-items-center justify-content-center">
                  <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                  <Link className="text-primary fw-bold ms-2" to="/login">Sign In</Link>
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

export default Register
