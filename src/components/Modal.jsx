import { useRef, useState } from "react";
import PropTypes from 'prop-types';
import img1 from "../../public/Rectangle 34.png";
import img2 from "../../public/Rectangle 35.png";
import data from "../imgData";
import dragAndDrop from "../../public/dragandpaste.png";
function Modal({ onClose,setfiles }) {
  let [files, setFiles] = useState(null);
  const inputRef = useRef();

  Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    setfiles: PropTypes.func.isRequired
  };
  

  const handleClose = () => {
    onClose();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  const handleUpload = () => {
    setfiles(files)
    onClose();
  };

  return (
    <div
      id="defaultModal"
      className="fixed flex items-center justify-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-5xl max-h-full">
        <div className="relative bg-white rounded-lg shadow text-slate-800 my-4  ">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-100">
            <h3 className="text-xl font-bold text-slate-700">
              Select a source
            </h3>
            <button
              type="button"
              onClick={handleClose}
              className=" bg-transparent hover:bg-gray-200  rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
              data-modal-hide="defaultModal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="h-96 rounded-b-lg flex border-t border-slate-300">
            <div className=" w-3/6 border-r border-slate-300 flex flex-col justify-center items-center">
              <div className="flex">
                <ul className="flex">
                  <li className="flex hover:bg-gray-200 rounded-lg ">
                    <label htmlFor="fileInput" className="flex items-center">
                      <img src={img2} alt="file icon" className="w-8 mx-2" />
                      <span className="mr-2 text-violet-400 cursor-pointer">
                        My computer
                      </span>
                    </label>
                    <input id="fileInput" type="file" className="hidden" />
                  </li>
                  <li className="flex hover:bg-gray-200 rounded-lg p-1">
                    <img
                      src={img1}
                      alt="copy paste icon"
                      className="w-8 mx-2"
                    />
                    <p className="mr-2 text-violet-400">copy & paste</p>
                  </li>
                </ul>
              </div>
              <div
                className=" rounded-xl h-3/5 w-5/6 my-3 p-3  border-dashed border-2 border-violet-400 flex flex-col justify-center items-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {!files ? (
                  <div className=" flex flex-col justify-center items-center">
                    <img
                      src={dragAndDrop}
                      alt="drag and drop icon"
                      className="w-10"
                    />
                    <p className="text-center text-violet-400 my-2">
                      Drag and drop anywhere on the page,or click to upload
                      files.
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={(event) => setFiles(event.target.files)}
                      hidden
                      name=""
                      id=""
                      ref={inputRef}
                    />
                  </div>
                ) : (
                  <div className="uploads  w-full flex flex-col justify-center items-center">
                    <ul>
                      {Array.from(files).map((file, idx) => (
                        <li key={idx}>{file.name}</li>
                      ))}
                    </ul>
                    <div className="actions mt-2">
                      <button
                        onClick={() => setFiles(null)}
                        className="bg-green-700 text-white p-2 rounded-lg mx-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpload}
                        className="bg-red-700 text-white p-2 rounded-lg mx-2"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className=" w-3/6 flex flex-wrap justify-evenly py-6">
              {data &&
                data.map((data, index) => (
                  <div
                    className="w-1/6  border border-gray-200 rounded-lg my-1 mx-1 overflow-hidden flex items-center justify-center"
                    key={index}
                  >
                    <img src={`/${data}`} alt="Image" className="w-14 " />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
