import React, { useEffect, useState } from 'react'
import auth from '../../../service/auth'

const UpdatePassword = () => {
    const [Data , setData]= useState({})

    const [Id , setId] = useState();
  useEffect(()=>{
  const localstorageData=JSON.parse(localStorage.getItem('persist:token')) 
    const entrerpise=JSON.parse(localstorageData?.user)
        const entrerpiseId = entrerpise?.id

console.log(entrerpiseId)
setId(entrerpiseId)
  },[])
    const OnchangeHandler =(e)=>{
    setData({...Data,[e.target.name]:e.target.value}) 
  }

        const  UpdatePass = async (event)=>{
    event.preventDefault();
      try {
      
  
    const response = await auth.UpdatePass(Id , Data);
    console.log("mot de passe changé avec succés :", response.data);
    alert("mot de passe changé avec succés");
  } catch (error) {
    console.error("Erreur lors de changement de mot de passe :", error);
    alert("Erreur lors de changement de mot de passe .");
  }
  }
  return (
        <div class="container-fluid">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title fw-semibold mb-4">Update Your Password</h5>
            <div class="card">
              <div class="card-body">
              

                <form onSubmit={UpdatePass} >
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Old password</label>
                    <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="oldPassword"  onChange={OnchangeHandler} />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">New password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name="newPassword"  onChange={OnchangeHandler}/>
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

export default UpdatePassword
