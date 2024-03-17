import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserState } from '../context/Context';
import {GoogleOAuthProvider } from "@react-oauth/google";

function Authentication() {
    let navigate = useNavigate();
    let { setUserDetails} = useUserState();
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
            navigate('/home')
          }
      }, []);
      const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
    <div className='flex justify-center items-center h-5/6'>
      <Outlet/>
    </div>
    </GoogleOAuthProvider>
  )
}

export default Authentication
