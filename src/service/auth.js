import axiosContext from "./axiosContext";
const SignIn= (data) =>{
  return axiosContext.post('/auth/signin' , data)
}

const Forgot= (email) =>{
  return axiosContext.post('/auth/forgetPassword' , email)
}

const Reset= (password , token) =>{
  return axiosContext.post(`/auth/resetPassword/${token}` , password)
}
const logOut=(token)=>{
  return axiosContext.get('/auth/logout',{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  })
}
const UpdatePass= (id , Data) =>{
  return axiosContext.put(`/user/${id}` , Data)
}

export default {SignIn , Forgot,Reset,logOut, UpdatePass};