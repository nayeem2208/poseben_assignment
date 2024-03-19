import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import { useUserState } from "../context/Context";
import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "../axiosInstance";

function Signup() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");


  const navigate = useNavigate();
  let {setUserDetails}=useUserState()

  
  const authenticateData = async (credentialResponse) => {
    console.log(credentialResponse,'credentiall         llll')
    try {

      // let res = await axios.post('https://poseben-backend.onrender.com/api/GoogleSignup',{credentialResponse})
      let res=await axiosInstance.post('/GoogleSignup',{credentialResponse})
      let token=res.data.token
      localStorage.setItem('token',token)
      navigate("/home")
    } catch (err) {
        console.log(err,'errrrrrrrrrrrrrrrrrrrrrrrr')
      toast.error(err.response?.data.error);
    }
  };



  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?!\s).{6,}$/;

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      if ((email,password)) {
            if (passwordPattern.test(password)) {
                try {
                  // let res = await axios.post('https://poseben-backend.onrender.com/api/signup',{
                  //   email,
                  //   password,
                  // })
                  let res = await axiosInstance.post('/signup',{
                    email,
                    password,
                  })
                  console.log(res,'res')
                  toast(res.data,5000)
                  // let token=res.data
                  // console.log(token,'token')
                  // setUserDetails(token)
                  // localStorage.setItem('token',JSON.stringify(token))
                  navigate('/')
        
                } catch (err) {
                  console.log(err,'err')
                  toast.error(err.response?.data.error);
                }
            } else {
              toast.error("Please put a strong password(Minimum 6 including number and string)");
            }
      } else {
        toast.error("Please fill the fields");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (

      <div className="">
        <div className="login-form">
          <div className="w-96 bg-white rounded-lg shadow-lg p-6 text-sm">
            <h1 className="text-3xl font-semibold mb-2 text-center text-slate-800">User Signup</h1>
            <form onSubmit={signupHandler}>
              <div className="mb-1">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="mt-5  w-full bg-indigo-400 hover:bg-indigo-900 text-white  font-semibold py-2 rounded-lg hover:bg-mainColorDark transition duration-300 "
              >
                Signup
              </button>
              <div className="flex justify-center items-center ">
            </div>
            </form>
            <div className="my-2 w-full flex justify-center">
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse)
                authenticateData(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              text='Sign Up with Google'
              themeConfig={{
                primaryColor: '#4285F4', 
                text: 'Sign Up with Google', 
                textAlign: 'center',
              }}
              className='googlebutton'
            />
            </div>
            <Link
              to="/"
              className="block text-gray-500 text-center mb-3 mt-3 text-sm "
            >
              Already have account? <span className="font-semibold text-gray-800">Login</span> 
            </Link>
          </div>
        </div>
      </div>
  );
}

export default Signup;