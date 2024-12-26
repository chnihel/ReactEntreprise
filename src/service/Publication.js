/* eslint-disable import/no-anonymous-default-export */
import axiosContext from "./axiosContext";
const createPublication= (data) =>{
  return axiosContext.post('/publication' , data)
}
const updatePublication= (id , data) =>{
  return axiosContext.put(`/publication/${id}` , data)
}
const getPublications= () =>{
  return axiosContext.get(`/publication`)
}

const getPublicationById= (id) =>{
  return axiosContext.get(`/publication/${id}`)
}

const deletePublication= (id) =>{
  return axiosContext.delete(`/publication/${id}`)
}

export default {createPublication , updatePublication, getPublications, getPublicationById , deletePublication };