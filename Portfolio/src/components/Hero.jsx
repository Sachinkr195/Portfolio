import React from 'react';
import profile1img from '../assets/profile1img.jpg';

const Hero = () => {
  return (
    <div id='home' className=" flex flex-col items-center justify-center min-h-screen px-4 text-center">
     <img src={profile1img} alt="Profile" className="w-64 h-64 object-cover object-center rounded-full mb-10" />


      <h1 className="text-2xl md:text-5xl font-bold mb-4">
        <span>I'm Sachin Kumar</span>, Fullstack Developer based in India
      </h1>

      <p className="text-gray-300 mb-8 max-w-xl">
        I am a Mechanical Engineer but currently working as a passionate Web Developer.
      </p>

      <div className="flex gap-4">
        <button  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold px-6 py-2 rounded-full transition duration-300">
          
          <a >Review my Portfolio</a>
        </button>

        <button  className="border border-white text-white hover:bg-white hover:text-black font-semibold px-6 py-2 rounded-full transition duration-300">
          <a href="https://drive.google.com/file/d/1I3lnP4CvkmKoQtGVj-3P2SlK9aPBoJT6/view?usp=drive_link" target='_blank'>My Resume</a>
        </button>
      </div>
    </div>
  );
};

export default Hero;
