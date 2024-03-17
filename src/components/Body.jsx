import { useEffect, useState } from "react";
import bulkEmail from "../../public/bulkemail1.png";
import Modal from "./Modal";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { useUserState} from "../context/Context";

function Body() {
  let [bulk, setBulk] = useState([]);
  let [percentages, setPercentages] = useState([]);
  let [modalToggle, setModalToggle] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(-1);

  let navigate = useNavigate();
  let { setUserDetails } = useUserState();

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

  function HandleModalToggle() {
    setModalToggle(!modalToggle);
  }
  const handleCloseModal = () => {
    setModalToggle(false);
  };

  const fileUpload = (file) => {
    setBulk((prevBulk) => [...prevBulk, file]);
    setPercentages((prevPercentage) => [...prevPercentage, 0]);
    setUploadingIndex(percentages.length);
  };

  useEffect(() => {
    if (uploadingIndex !== -1) {
      const interval = setInterval(() => {
        setPercentages((prevPercentages) => {
          const updatedPercentages = [...prevPercentages];
          if (updatedPercentages[uploadingIndex] < 100) {
            updatedPercentages[uploadingIndex] += 10;
          } else {
            clearInterval(interval);
          }
          return updatedPercentages;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [uploadingIndex]);
  return (
    <div className="flex justify-center items-center py-6 text-slate-700">
      {modalToggle && (
        <div>
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-40 "></div>
          <Modal onClose={handleCloseModal} setfiles={fileUpload} />
        </div>
      )}
      <div className=" w-4/5">
        {bulk.length < 1 && (
          <div className="bg-white shadow-lg rounded-xl flex flex-col justify-center items-center p-14">
            <img src={bulkEmail} alt="" className="w-16" />
            <h2 className="text-4xl font-semibold my-3">
              Import a list to verify
            </h2>
            <p>
              Upload a list or connect an integration to start verifying your
              emails.
            </p>
            <button
              className="bg-indigo-500 py-2 px-4 rounded-lg font-semibold text-white my-4 "
              onClick={HandleModalToggle}
            >
              GET STARTED
            </button>
          </div>
        )}
        {bulk.length > 0 && (
          <div className="">
            <button
              className="bg-violet-600 p-2 text-white rounded-lg"
              onClick={HandleModalToggle}
            >
              Add New
            </button>
            <div className="my-3 flex flex-wrap">
              {bulk.map((data, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg mx-4 p-4 shadow-lg w-52 h-64 flex flex-col justify-center items-center"
                >
                  <h2>{data[0].name}</h2>
                  <CircularProgressbar
                    value={percentages[index]}
                    text={`${percentages[index]}%`}
                    className="my-3"
                  />
                  <button className="bg-violet-600 text-white p-2 rounded-lg my-3">
                    IMPORTING
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Body;
