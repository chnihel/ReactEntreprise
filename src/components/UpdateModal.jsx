import React, { useEffect, useState } from "react";
import Publication from "../service/Publication";

const UpdateModal = ({ show, handleClose,id}) => {
    const [Data , setData]=useState({});
  const [Gallery , setGallery]=useState([])
useEffect(() => {
  if (id) {
    getPubById();
  }
}, [id]);
    const OnchangeHandler =(e)=>{
    setData({...Data,[e.target.name]:e.target.value}) 
  }
    const OnchangeFileHandler = (e)=>{
    setGallery(e.target.files)
  }
  const getPubById = async ()=>{
  try {

      const response = await Publication.getPublicationById(id);
      setData(response.data.existingPublication);
        console.log("Publication récupérée avec succès :", response.data);
    
  } catch (error) {
      console.error("Erreur lors de la récupération de la publication :", error);
  }
}
const updatePub = async (event) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    formData.append("titre", Data.titre);
    formData.append("description", Data.description);
    formData.append("date", Data.date);
    formData.append("prix", Data.prix);
    formData.append("promotion", Data.promotion);

    // Ajouter les nouvelles images si elles existent
    if (Gallery.length > 0) {
      for (let i = 0; i < Gallery.length; i++) {
        formData.append("files", Gallery[i]);
      }
    } 

    // Ajouter les images existantes si elles existent
    if (Data.image && Data.image.length > 0) {
      Data.image.forEach((img) => {
        formData.append("existingImages", img); // Champ pour images existantes
      });
    }

    // Debugger les données envoyées
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await Publication.updatePublication(id, formData);
    console.log("Publication modifiée avec succès :", response.data);
    alert("Publication modifiée avec succès !");
    handleClose();
  } catch (error) {
    console.error("Erreur lors de la modification de la publication :", error);
    alert("Erreur lors de la modification de la publication.");
  }
};


  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Publication</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
        <form onSubmit={updatePub} >
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Titre</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="titre" value={Data.titre ||""} onChange={OnchangeHandler}/>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Description</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" name="description" value={Data.description||""} onChange={OnchangeHandler}/>
                  </div>

                    <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label">Date</label>
                    <input type="date" class="form-control" id="exampleInputdate1" name="date"value={Data.date ||""} onChange={OnchangeHandler} />
                  </div>
                    <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label">Image</label>
                    <input type="file" class="form-control" id="exampleInputdate1" name="files" multiple onChange={OnchangeFileHandler}  />
                      <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label">Prix</label>
                    <input type="number" class="form-control" id="exampleInputdate1" name="prix" value={Data.prix ||0} onChange={OnchangeHandler} />
                  </div>
                    <div class="mb-3">
                    <label for="exampleInputdate1" class="form-label">Promotion</label>
                    <input type="number" class="form-control" id="exampleInputdate1" name="promotion" value={Data.promotion ||0} onChange={OnchangeHandler} />
                  </div>
                  </div>
                
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
