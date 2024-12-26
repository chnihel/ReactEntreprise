import React, { useEffect, useState } from 'react'
import entreprise from '../../../service/entreprise';

const EntrepriseList = () => {
  const [Data , setData] = useState([]);
  const getEntreprise = async ()=>{
    try {
      const res = await entreprise.getEntreprises();
      setData(res.data.entrepriseData)
      console.log("Entreprise récupérée avec succés:", res.data)
      
    } catch (error) {
        console.error("Erreur lors de la récupération de l'entreprise :", error);
    }
  }
  const updateStatus = async (id )=>{
try {

  const res = await entreprise.UpdateStatus(id);
  console.log("Status mis à jour avec succés:", res.data)
  getEntreprise()
} catch (error) {
  console.error("Erreur lors de la mis à jour de status :", error);

}
  }
  useEffect(()=>{
    getEntreprise();
  },[])
  return (
    <div className="container-fluid">
  <table className="table table-striped table-bordered table-hover">
    <thead className="thead-dark">
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Username</th>
        <th scope="col">Email</th>
        <th scope="col">Logo</th>
        <th scope="col">Numero</th>
        <th scope="col">Site web</th>
        <th scope="col">Responsable</th>
        <th scope="col">Description</th>
        <th scope="col">Archive</th>
        <th scope="col">Status</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    {Data?.length > 0 ? (
      <tbody>
        {Data.map((entr, index) => (
          <tr key={index}>
            <th scope="row">{entr?.name}</th>
            <td>{entr?.username}</td>
            <td>{entr?.email}</td>
            <td>
              <img
                width={40}
                height={40}
                src={`http://localhost:3000/file/${entr.logo}`}
                alt="logo"
                className="rounded-circle border"
              />
            </td>
            <td>{entr?.numero}</td>
            <td>{entr?.siteweb}</td>
            <td>{entr?.responsable}</td>
            <td>{entr?.description}</td>
            <td>{entr?.archive}</td>
            <td>
              <span
                className={`badge ${
                  entr?.status === 'Acceptable' ? 'bg-success' : 'bg-warning'
                } text-white`}
              >
                {entr?.status}
              </span>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => updateStatus(entr._id)}
              >
                Accept
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    ) : (
      <div className="d-flex justify-content-center align-items-center py-10">
        Loading...
      </div>
    )}
  </table>
</div>

  )
}

export default EntrepriseList
