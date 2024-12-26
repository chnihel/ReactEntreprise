import React, { useEffect, useState } from 'react'
import Admin from '../../../service/Admin';

const UpdateProfilAdmin = () => {
        const [Data , setData] = useState();

    useEffect(() => {
    getAdminById()
  },[])
  const getAdminById =async ()=>{
    try {
  const localstorageData=JSON.parse(localStorage.getItem('persist:token'));
            const entrerpise=JSON.parse(localstorageData?.user)
      const id=entrerpise?.id
          console.log("iddddd " ,id)
      const response = await Admin.getAdminById(id);
      setData(response.data.existingAdmin);
      console.log("Admin recupérée avec succès :", response.data.existingAdmin);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'admin :", error);
    }
  }
    const OnchangeHandler =(e)=>{
    setData({...Data,[e.target.name]:e.target.value})
  }

    const updateAdmin = async (event) =>{
  event.preventDefault();
  try {

const id = Data._id;
    const response = await Admin.updateAdmin(id , Data);
      console.log("Admin modifée avec succès :", response.data);
    alert("Admin modifée avec succès !");
    //mettre a jour local storage
    const updateAdmin  = response.data.existingAdmin;
    const localStorageData= JSON.parse(localStorage.getItem('persist:token'));

    if (localStorageData) {
    let userData = JSON.parse(localStorageData.user);

  
    userData = { ...userData, ...updateAdmin };

    localStorageData.user = JSON.stringify(userData);
    localStorage.setItem('persist:token', JSON.stringify(localStorageData));
}
    getAdminById(id)
  } catch (error) {
      console.error("Erreur lors de la modification de l'Admin :", error);
    alert("Erreur lors de la modification de l'Admin.");
  }
}
  return (
    <div class="container-fluid">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title fw-semibold mb-4">Your profil</h5>
            <div class="card">
              <div class="card-body">
              
                <form onSubmit={updateAdmin} >
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
                    value={Data?.email} onChange={OnchangeHandler}
                    />
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

export default UpdateProfilAdmin
