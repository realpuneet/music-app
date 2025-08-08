import axios from "axios";
import React from "react";

const Upload = () => {
  

  return (
    <form
      action="/songs"
      method="post"
      encType="multipart/form-data"
      className="h-screen bg-gray-800 flex p-3 flex-col justify-center items-center"
    >
      <h1 className="text-white text-xl font-bold mb-2">Upload</h1>
      <div className="border-2 border-white text-white rounded-2xl px-5 py-13 border-dashed flex flex-col items-center justify-center">
        <h1 className="text-lg font-bold">Drag and drop to upload</h1>
        <p>Or select a file from your computer</p>
        <div className="relative inline-block mt-3 ">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={(e) => console.log(e.target.files)}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition"
          >
            Select File
          </label>
        </div>
      </div>
      <button
      onClick={()=> uploadFile()}
      className="px-5 py-1 bg-blue-500 m-3 text-white hover:bg-blue-700 transition-all ease-in-out hover:duration-300 rounded-lg">
        Upload File
      </button>
    </form>
  );
};

export default Upload;
