import React, { useEffect, useState } from 'react';
import Publication from '../../../service/Publication';
import Slider from '../../../components/Slider';
import { Modal, Button, Form } from 'react-bootstrap';
import entreprise from '../../../service/entreprise';


const PublicationList = () => {
  const [Data, setData] = useState([]);
  const [openModel, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Pour stocker l'élément sélectionné
  const [dataEdit, setDataEdit] = useState({});
  const [Gallery, setGallery] = useState([]);
  const [Entrep,setEntrep]=useState(null)
  const [idEntreprise,setIdEntreprise]=useState(null)
  const [existingImages, setExistingImages] = useState(selectedItem?.image || []);

  


    const getPub = async () => {
    try {
      const response = await Publication.getPublications();
      setData(response.data.publicationData);
      console.log("Publication récupérée avec succès :", response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de la publication :", error);
    }
  };
  useEffect(() => {
    getPub();
  }, []);  


  const Delete = async (id) => {
    try {
      const response = await Publication.deletePublication(id);
      getPubForEntreprise(idEntreprise);
      alert("Publication supprimée avec succès ");
      console.log("Publication supprimée avec succès :", response.data.deletedPublication);
    } catch (error) {
      console.error("Erreur lors de la suppression de la publication :", error);
    }
  };

  const openModalEdit = (item) => {
    setSelectedItem(item); // Sélectionne l'élément
    setDataEdit({ ...item }); // Initialise les données d'édition
    setOpenModal(true); // Ouvre le modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  const OnchangeFileHandler = (e) => {
   // const files=Array.from(e.target.files)
    setGallery(e.target.files);
  };

  const OnchangeHandler = (e) => {
    setDataEdit({ ...dataEdit, [e.target.name]: e.target.value });
  };
   // Fonction pour gérer la suppression d'une image existante
   const handleRemoveExistingImage = (index) => {
    const updatedImages = [...existingImages];
    updatedImages.splice(index, 1);
    setExistingImages(updatedImages);
  };

const updateData = async (event) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    formData.append('titre', dataEdit.titre);
    formData.append('description', dataEdit.description);
    formData.append('date', dataEdit.date);

  
    if (Gallery.length > 0) {
      for (let i = 0; i < Gallery.length; i++) {
        formData.append('files', Gallery[i]);
      }
    } else {
  
      if (selectedItem.image && selectedItem.image.length > 0) {
        selectedItem.image.forEach((img) => {
          formData.append('image', img);
        });
      }
    }

    formData.append('prix', dataEdit.prix);
    formData.append('promotion', dataEdit.promotion);

    // Envoyer la requête au backend
    const response = await Publication.updatePublication(selectedItem._id, formData);
    console.log("Publication mise à jour avec succès :", response.data);
    alert("Publication mise à jour avec succès !");
    handleCloseModal();
    getPubForEntreprise(idEntreprise);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la publication :", error);
    alert("Erreur lors de la mise à jour de la publication.");
  }
};


  ///getPublication pour chaque entreprise
  const getPubForEntreprise=(id)=>{
    entreprise.getEntrepriseById(id).then((res)=>{
      console.log("pub to entreprise",res.data.existingEntreprise)
      setEntrep(res.data.existingEntreprise)
    }).catch((err)=>{
      console.log('erreur lors de la recuperation de donnee de l entreprise',err)
    })
  }
  useEffect(()=>{
    const localstorageData=JSON.parse(localStorage.getItem('persist:token'))
    console.log("data de l'entreprise",localstorageData)
    let entrepriseId ;
    if (localstorageData &&  localstorageData.user){
    const entrerpise=JSON.parse(localstorageData?.user)
        console.log("user",entrerpise)

     entrepriseId = entrerpise?.id
    console.log("l'id de l'entreprise",entrepriseId)

    }else {
      console.log("aucune donnée n'est stockée")
    }
    console.log("l'id de l'entreprise",entrepriseId)

    if(entrepriseId){
      setIdEntreprise(entrepriseId)
      getPubForEntreprise(entrepriseId)
    }
    

  },[])
  
  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          {Data?.length> 0 ? (
            <div className="row">
              {Entrep && Entrep?.publication?.map((item, index) => (
                <div className="col-md-4" key={index}>
                  <h5 className="card-title fw-semibold mb-4">{item.titre}</h5>
                  <div className="card">
                    <Slider img={item.image} />
                    <div className="card-body">
                      <h5 className="card-title">{item.titre}</h5>
                      <p className="card-text">Description : {item.description}</p>
                      <p className="card-text">Date : {item.date}</p>
                      <p className="card-text">Prix : {item.prix}</p>
                      <p className="card-text">Promotion : {item.promotion}</p>
                      <div className="d-flex justify-content-between">
                        <button onClick={() => openModalEdit(item)} className="btn btn-primary">
                          Update
                        </button>
                        <button onClick={() => Delete(item._id)} className="btn btn-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-10">
              Loading...
            </div>
          )}
        </div>
      </div>

      <Modal show={openModel} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la Publication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                name="titre"
                value={dataEdit.titre || ''}
                onChange={OnchangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={dataEdit.description || ''}
                onChange={OnchangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={dataEdit.date || ''}
                onChange={OnchangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                name="prix"
                value={dataEdit.prix || ''}
                onChange={OnchangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Promotion</Form.Label>
              <Form.Control
                type="text"
                name="promotion"
                value={dataEdit.promotion || ''}
                onChange={OnchangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3">
  <Form.Label>Images existantes</Form.Label>
  <div className="d-flex flex-wrap">
    {selectedItem?.image?.length > 0 ? (
      selectedItem.image.map((img, index) => (
        <div key={index} className="m-2 position-relative">
          <img
            src={`http://localhost:3000/file/${img}`} // Remplacez par l'URL complète si nécessaire
            alt={`img-${index}`}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <button
            type="button"
            className="btn btn-danger btn-sm position-absolute top-0 end-0"
            onClick={()=>handleRemoveExistingImage(index)}
          
          >
            &times;
          </button>
        </div>
      ))
    ) : (
      <p>Aucune image existante</p>
    )}
  </div>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Ajouter des nouvelles images</Form.Label>
  <Form.Control
    type="file"
    name="files"
    onChange={OnchangeFileHandler}
    multiple
  />
</Form.Group>

            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={updateData}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PublicationList;
