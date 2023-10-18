import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Card, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch("https://dall-e-8cr4.onrender.com/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        await response.json();
        navigate("/");
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an Image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSupriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
    // console.log(randomPrompt);
  };
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        // alert(form.prompt);
        const response = await fetch("https://dall-e-8cr4.onrender.com/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        // alert(data);

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
        
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt!");
    }
  };

  return (
    <section className="max-w-7xl mx-auto flex">
      <div >
      <div>
        <h1 className="  font-bold text-[#000000] text-[32px] ">CREATE YOUR DRESS</h1>
        
      </div>
      <form className="mt-5 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          
          <FormField
            labelName="Descreption of your dress"
            type="text"
            name="prompt"
            placeholder="a stained glass window depicting a hamburger and french fries"
            value={form.prompt}
            handleChange={handleChange}
            isSupriseMe
            handleSupriseMe={handleSupriseMe}
          />
          
        </div>
        <div className="mt-4 flex-col h-30  content-center grid grid-cols-3 gap-3 ...">
          <button
            type="button"
            onClick={generateImage}
            className="text-black bg-white font-medium-mono text-lg p-1 w-30 h-20 text-center tracking-widest"
          >
        <div className=" gap-4 mx-80 flex flex-col">
          
        </div>
            {generatingImg ? "Generating Image..." : "Generate"}
          </button>

        
        </div>
        

       
      </form>
      </div>
      <div className=" overflow-hidden justify-center items-center w-2/5 ml-12 flex-col ">
      <div className="mb-2">
        <h1 className="  font-semibold text-[#000000] text-[20px] ">YOUR IMAGINATION: </h1>
        
      </div>
      <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm w-96  focus:ring-white focus:border-grey  p-3   h-full flex justify-center items-center">
      
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />  
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
          </div>
    </section>
  );
};

export default CreatePost;
