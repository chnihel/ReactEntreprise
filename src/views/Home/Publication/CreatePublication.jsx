import React, { useEffect, useState } from 'react'

import Publication from '../../../service/Publication'

const CreatePublication = () => {
  const [Data , setData]=useState({});
  const [Gallery , setGallery]=useState([])
  const [Entreprise , setEntreprise] = useState({});

  useEffect(()=>{
const localstorageData =JSON.parse(localStorage.getItem("persist:token"));  
  const entrerpise=JSON.parse(localstorageData?.user)
      const entrerpiseId = entrerpise?.id

console.log("id",entrerpiseId)
setEntreprise(entrerpiseId)
  },[Entreprise])

const OnchangeHandler =(e)=>{
    setData({...Data,[e.target.name]:e.target.value}) 
  }
    const OnchangeFileHandler = (e)=>{
    setGallery(e.target.files)
  }
  const addPub = async (event) =>{
    event.preventDefault();
      try {
    
  const formData = new FormData();
  formData.append('titre', Data.titre);
  formData.append('entreprise' , Entreprise)

  formData.append('description', Data.description);
  formData.append('date', Data.date);
  for (let i=0 ; i<=Gallery.length ;i++ ){
    formData.append('files', Gallery[i]);

  }
  formData.append('prix', Data.prix);
formData.append('promotion', Data.promotion);

  
    const response = await Publication.createPublication(formData);
    console.log("Publication créée avec succès :", response.data);
    alert("Publication créée avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création de la publication :", error);
    alert("Erreur lors de la création de le publication.");
  }
  }


  //update avec modal



  return (

      <div class="container-fluid">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title fw-semibold mb-4">Add new publication</h5>
            <div class="card">
              <div class="card-body">
                <form onSubmit={addPub}>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Titre</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="titre" onChange={OnchangeHandler}/>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Description</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" name="description" onChange={OnchangeHandler}/>
                  </div>

                    <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label">Date</label>
                    <input type="date" class="form-control" id="exampleInputdate1" name="date" onChange={OnchangeHandler}/>
                  </div>
                    <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label">Image</label>
                    <input type="file" class="form-control" id="exampleInputdate1" name="files" multiple onChange={OnchangeFileHandler} />
                      <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label">Prix</label>
                    <input type="number" class="form-control" id="exampleInputdate1" name="prix" onChange={OnchangeHandler}/>
                  </div>
                    <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label">Promotion</label>
                    <input type="number" class="form-control" id="exampleInputdate1" name="promotion" onChange={OnchangeHandler}/>
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

export default CreatePublication
