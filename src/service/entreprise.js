/* eslint-disable import/no-anonymous-default-export */
import axiosContext from "./axiosContext";
const createEntreprise= (data) =>{
  return axiosContext.post('/entreprise' , data)
}
const updateEntreprise= (id , data) =>{
  return axiosContext.put(`/entreprise/${id}` , data)
}
const getEntreprises= () =>{
  return axiosContext.get(`/entreprise`)
}

const getEntrepriseById= (id) =>{
  return axiosContext.get(`/entreprise/${id}`)
}

const deleteEntreprise= (id) =>{
  return axiosContext.delete(`/entreprise/${id}`)
}

const UpdateStatus= (id) =>{
  return axiosContext.put(`/entreprise/updateStatus/${id}`)
}

export default {createEntreprise , updateEntreprise, getEntreprises, getEntrepriseById , deleteEntreprise, UpdateStatus };