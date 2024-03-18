import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserState } from "../context/Context";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  let [email, setemail] = useState("");
  let [password, setPassword] = useState("");
  let { setUserDetails } = useUserState();

  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    async function verifyEmail(){
      const queryParams = new URLSearchParams(location.search);
      if (queryParams) {
        const email = queryParams.get("email");
        if (email) {
          console.log(email,'emaileyyyy')
          // let res=await axios.get(`http://localhost:3000/api/verifyEmail?email=${email}`);
          let res=await axios.get(`https://poseben-backend.onrender.com/api/verifyEmail?email=${email}`);
          console.log(res,'res')
          // toast(res.data?.message)
          let token = res.data;
          setUserDetails(token);
          localStorage.setItem("token", JSON.stringify(token));
          navigate("/home");
        }
      }
    }
  verifyEmail()
  }, [location.search]);

  const submitHander = async (e) => {
    e.preventDefault();
    try {
      if ((email, password)) {
        // const res = await axios.post("http://localhost:3000/api/login", {
        //   email,
        //   password,
        // });
           const res = await axios.post("https://poseben-backend.onrender.com/api/login", {
          email,
          password,
        });
        toast("Authentication success", 2000);
        let token = res.data;
        setUserDetails(token);
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/home");
      } else {
        toast.error("Please give a valid input");
      }
    } catch (err) {
      toast.error(err.response?.data.error);
    }
  };

  const authenticateData = async (credentialResponse) => {
    try {
      let res = await axios.post('https://poseben-backend.onrender.com/api/GoogleLogin',{credentialResponse})
      // let res = await axios.post("http://localhost:3000/api/GoogleLogin", {
      //   credentialResponse,
      // });
      let token = res.token;
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.error);
    }
  };

  return (
    <div className="">
      <div>
        <div className="w-96 bg-white rounded-lg shadow-lg p-6  text-sm">
          <h1 className="text-3xl font-semibold mb-4 text-center text-slate-800">
            User Login
          </h1>

          <form onSubmit={submitHander}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                onChange={(e) => setemail(e.target.value)}
                value={email}
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-violet-500 text-white font-semibold hover:bg-violet-900 py-2 rounded-lg hover:bg-mainColorDark transition duration-300 "
            >
              Login
            </button>
            <div className="my-2 w-full  flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  authenticateData(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
            <Link
              className="block text-gray-500 text-center mb-3 mt-3 text-sm"
              to="/signup"
            >
              Dont have Account?
              <span className="font-semibold text-gray-800">SignUp</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
