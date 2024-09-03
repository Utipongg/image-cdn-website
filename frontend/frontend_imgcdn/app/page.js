"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      console.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        "https://cdn.utipong.info/api/uploadimg/",
        formData
      );
      console.log("Enhanced image:", response.data);
      setUploadedImageUrl(response.data.image);
      setSelectedImage(null);
      // Update state or display the enhanced image
    } catch (error) {
      console.error("Error enhancing image:", error);
      toast.error('Something went wrong!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  const handleCopy = async () => {
    try {

      await navigator.clipboard.writeText(uploadedImageUrl); 
      toast.success('📋Copied!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (err) {
      console.error("Failed to copy text:", err);
      toast.error('Failed to copy text!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };
  return (
    <>
    <ToastContainer />
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-teal-950 to-gray-300">
    <div className="p-5 shadow-lg flex justify-center max-w-md bg-black rounded-lg bg-opacity-10">
      
      <form
        onSubmit={handleImageUpload}
        className="flex flex-col items-center"
      >
        <h1 className="font-bold text-white mb-5 text-xl">🖼️Image Hosting</h1>
        
        <input
          type="file"
          className="file:bg-blue-500 file:rounded-lg file:p-3 file:text-white file:border-0 mb-4 text-white file:mx-10 hover:file:bg-blue-600 font-semibold transition duration-150"
          onChange={handleImageChange}
          required
        />
        <button
          type="submit"
          className="p-3 bg-green-500 rounded-lg text-white w-full hover:bg-green-600 transition duration-150 font-semibold"
        >
          Upload
        </button>
      </form>
    </div>

    {uploadedImageUrl && (
      
      <div className="mt-5 p-6 w-max-96 bg-white rounded-lg shadow-lg bg-opacity-10">
        <h2 className="font-bold text-center text-white ">Uploaded Image</h2>
        <hr className="m-3"/>
        <div className="mt-3 bg-gray-200 p-6 rounded-lg bg-opacity-30">
        <Image
          src={uploadedImageUrl}
          alt="Uploaded"
          width={300}
          height={300}
        />
        </div>
        <input id="Url" name="Img Url" type="text" className="bg-opacity-20 text-slate-100 focus:outline-none w-full bg-slate-100 p-2 rounded-lg mt-3 font-semibold" value={uploadedImageUrl} readonly />

        <button className="w-full bg-green-500 p-2 mt-3 rounded-lg text-white font-semibold hover:bg-green-600 duration-150" onClick={handleCopy}>Copy</button>

      </div>
    )}
  </div>
    </>
  );
}
