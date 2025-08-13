import React, { useRef, useState } from "react"; // React hooks for state and ref
import axios from "axios"; // For making HTTP requests

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State to store selected file
  const [dragActive, setDragActive] = useState(false); // State for drag UI
  const [notification, setNotification] = useState({ message: "", type: "" }); // State for notification
  const inputRef = useRef(null); // Ref for file input

  // Handle file selection from input or drop
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Set the selected file
    setNotification({ message: "", type: "" }); // Clear notification
  };

  // Handle drag events for drag-and-drop UI
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true); // Highlight drop area
    } else if (e.type === "dragleave") {
      setDragActive(false); // Remove highlight
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false); // Remove highlight
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]); // Set dropped file
      setNotification({ message: "", type: "" }); // Clear notification
    }
  };

  // Trigger file input on click
  const handleClick = () => {
    inputRef.current.click(); // Open file dialog
  };

  // Handle file upload
  const uploadFile = async (e) => {
    e.preventDefault(); // Prevent form default
    console.log(selectedFile);

    if (!selectedFile) {
      setNotification({
        message: "Please select a file to upload.",
        type: "error",
      }); // Show error if no file
      return;
    }
    const formData = new FormData(); // Create form data
    formData.append("audio", selectedFile); // Append file with key 'audio'
    try {
      // Send POST request to /songs
      await axios.post("http://localhost:3000/songs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTimeout(() => {
        setNotification({ message: "Upload successful!", type: "success" }); // Show success notification
      }, 3000);
      setSelectedFile(null); // Reset file
    } catch (error) {
      setNotification({
        message: "Upload failed. Please try again.",
        type: "error",
      }); // Show error notification
    }
  };

  return (
    <div className="h-screen bg-gray-800 flex flex-col justify-center items-center">
      {/* Notification bar */}
      {notification.message && (
        <div
          className={`mb-4 px-4 py-2 rounded text-white ${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {notification.message}
        </div>
      )}
      {/* Upload form */}
      <form
        className="flex flex-col items-center"
        onSubmit={uploadFile} // Handle form submit
        onDragEnter={handleDrag} // Drag enter event
        onDragOver={handleDrag} // Drag over event
        onDragLeave={handleDrag} // Drag leave event
        onDrop={handleDrop} // Drop event
      >
        <h1 className="text-white text-xl font-bold mb-4">Upload Song</h1>
        {/* Drag and drop area */}
        <div
          className={`border-2 border-dashed rounded-2xl px-8 py-12 flex flex-col items-center justify-center transition-colors duration-200 ${
            dragActive
              ? "border-blue-400 bg-blue-50 bg-opacity-10"
              : "border-white"
          }`}
          onClick={handleClick} // Click to open file dialog
          style={{ cursor: "pointer" }}
        >
          <h2 className="text-lg font-bold text-white mb-2">
            Drag & drop your song here
          </h2>
          <p className="text-gray-300 mb-3">or click to select a file</p>
          {/* Hidden file input */}
          <input
            type="file"
            accept="audio/*"
            ref={inputRef}
            className="hidden"
            onChange={handleFileChange} // Handle file select
          />
          {/* Show selected file name */}
          {selectedFile && (
            <div className="mt-2 text-blue-300 text-sm">
              Selected: {selectedFile.name}
            </div>
          )}
        </div>
        {/* Upload button */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 mt-6 text-white hover:bg-blue-700 transition-all rounded-lg font-semibold"
        >
          Upload File
        </button>
      </form>
    </div>
  );
};

export default Upload;
