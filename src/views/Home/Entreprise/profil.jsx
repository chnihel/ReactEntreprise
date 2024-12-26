import React, { useEffect, useState } from 'react'
import Entreprise from '../../../service/entreprise'
const Profile = () => {
  const [Data , setData] = useState();
 // const [Logo , setLogo] = useState();
/*   useEffect(()=>{
      const entreprise =JSON.parse(localStorage.getItem("token"));
      console.log("data entreprise",entreprise.user)
      setData(entreprise.user)
      setLogo(entreprise.user.logo)
  },[]) */
const localstorageData=JSON.parse(localStorage.getItem('persist:token'));
            const entrerpise=JSON.parse(localstorageData?.user)
      const id=entrerpise?.id
          console.log("iddddd " ,id)
  useEffect(() => {
    getEntrepriseById(id)
  },[])
  const getEntrepriseById =async ()=>{
      try {
            const localstorageData=JSON.parse(localStorage.getItem('persist:token'));
            const entrerpise=JSON.parse(localstorageData?.user)
      const id=entrerpise?.id
      console.log("id entreprise" , id)
;
        const response = await Entreprise.getEntrepriseById(id);
        setData(response.data.existingEntreprise);
        console.log("Entreprise recupérée avec succès :", response.data.existingEntreprise);
    } catch (error) {
      console.error("Erreur lors de la récupération d'entreprise :", error);
    }
  }
    const OnchangeHandler =(e)=>{
    setData({...Data,[e.target.name]:e.target.value})
  }
    const OnchangeFileHandler = (e)=>{
    setData({...Data,[e.target.name]:e.target.files[0]})
  }
  const updateEntreprise = async (event) =>{
  event.preventDefault();
  try {
    const formData = new FormData();
formData.append('name', Data.name);
  formData.append('username', Data.username);
  formData.append('email', Data.email);
  formData.append('numero', Data.numero);
formData.append('responsable', Data.responsable);
  formData.append('siteweb', Data.siteweb);
    formData.append('description', Data.description);
    formData.append('archive', Data.archive);
    if(Data?.file){
      formData.append('file', Data?.file);
    }else{
      formData.append('logo', Data.logo);
    }
const id = Data._id;
    const response = await Entreprise.updateEntreprise(id , formData);
      console.log("Entreprise modifée avec succès :", response.data);
    alert("Entreprise modifée avec succès !");
    //mettre a jour local storage
    const updateEntreprise  = response.data.existingEntreprise;
    const localStorageData= JSON.parse(localStorage.getItem('persist:token'));
      if (localStorageData) {
    let userData = JSON.parse(localStorageData.user);

  
    userData = { ...userData, ...updateEntreprise };

    localStorageData.user = JSON.stringify(userData);
    localStorage.setItem('persist:token', JSON.stringify(localStorageData));
}
    getEntrepriseById(id)
  } catch (error) {
      console.error("Erreur lors de la modification de l'Entreprise :", error);
    alert("Erreur lors de la modification de l'Entreprise.");
  }
}
  return (
        <div class="container-fluid">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title fw-semibold mb-4">Your profil</h5>
            <div class="card">
              <div class="card-body">
                 <div className="text-center mb-4">
                    <img src={`http://localhost:3000/file/${Data?.logo}`} alt="Profile Photo" className="rounded-circle" style={{width: 150, height: 150, objectFit: 'cover'}} />
                </div>
                <form  onSubmit={updateEntreprise} encType="multipart/form-data">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" value={Data?.name} onChange={OnchangeHandler} />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Username</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" name="username" value={Data?.username} onChange={OnchangeHandler}/>
                  </div>
                    <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label">Email</label>
                    <input type="email" class="form-control" id="exampleInputdate1" name="email"
                    value={Data?.email} onChange={OnchangeHandler}/>
                  </div>
                    <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label">Logo</label>
                    <input type="file" class="form-control" id="exampleInputdate1" name="file" onChange={OnchangeFileHandler}    />
                      <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label">Numero</label>
                    <input type="text" class="form-control" id="exampleInputdate1" name="numero" value={Data?.numero}  onChange={OnchangeHandler}/>
                  </div>
                    <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label">Site web</label>
                    <input type="text" class="form-control" id="exampleInputdate1" name="siteweb" value={Data?.siteweb}  onChange={OnchangeHandler}/>
                  </div>
                                <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label"> Responsable</label>
                    <input type="text" class="form-control" id="exampleInputdate1" name="responsable" value={Data?.responsable}   onChange={OnchangeHandler}/>
                  </div>
                                <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label">Description</label>
                    <input type="text" class="form-control" id="exampleInputdate1" name="description" value={Data?.description}  onChange={OnchangeHandler} />
                  </div>
                                <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label">Archive</label>
                    <input type="text" class="form-control" id="exampleInputdate1" name="archive" value={Data?.archive}  onChange={OnchangeHandler}/>
                  </div>
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
</div>
  )
}
export default Profile