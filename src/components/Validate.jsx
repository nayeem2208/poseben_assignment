import React, { useEffect, useState } from 'react'
import { useUserState } from '../context/Context';
import axiosInstance from "../axiosInstance";
function Validate() {
    let {setUserDetails}=useUserState()
    let [email,setEmail]=useState('')
    let [isValid,setIsValid]=useState('')
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          let parsedToken;
          try {
            parsedToken = JSON.parse(storedToken);
          } catch (error) {
            parsedToken = storedToken;
          }
          setUserDetails(parsedToken);
        } else {
          navigate("/");
        }
      }, []);

      async function ValidateEmail(e){
        e.preventDefault()
        let validate=await axiosInstance.get(`/validateEmail?email=${email}`)
        console.log(validate.data.is_valid,'val')
        setIsValid(validate.data.is_valid)
      }

  return (
    <div className="flex justify-center items-center py-6 text-slate-700">
    <div className=" w-4/5">
      
        <div className="bg-white shadow-lg rounded-xl flex flex-col justify-center items-center p-14">
          {/* <img src={bulkEmail} alt="" className="w-16" /> */}
          <h2 className="text-4xl font-semibold my-3">
            Import a Email to validate
          </h2>
          <form onSubmit={ValidateEmail} >
          <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Enter you email here ' className='border border-gray-300 text-center rounded-lg p-2 text-sm' />
          <button
            type='submit'
            className="bg-indigo-500 py-2 px-4 rounded-lg font-semibold text-white my-4 mx-2"
            // onClick={HandleModalToggle}
          >
            Validate
          </button>
          {isValid === true ? (
                    <div className="text-4xl ">It's a valid email</div>
                ) : isValid === false ? (
                    <div className="text-4xl text-red-600">It's not a valid email</div>
                ) : null}
          </form>
        </div>
            </div>
  </div>
  )
}

export default Validate
