import React from 'react';
import theme_pattern from '../assets/theme_pattern.svg';
import mail_icon from '../assets/mail_icon.svg';
import location_icon from '../assets/location_icon.svg';
import call_icon from '../assets/call_icon.svg';

const Contact = () => {
  return (
    <div id='contact' className="bg-black text-white px-6 py-16">
      {/* Centered Title */}
      <div className="flex gap-3  mb-12">
        <h1 className="text-4xl font-bold text-center">Get in touch</h1>
        <img src={theme_pattern} alt="Pattern" className="h-6 mt-2" />
      </div>

      {/* Contact Section */}
      <div className="flex flex-col lg:flex-row gap-12 ">
        {/* Left Side */}
        <div className="lg:w-1/2 space-y-6">
          {/* Colorful Heading */}
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Let’s talk
          </h2>

          <p className="text-gray-300">
            I'm currently available to take on new projects, so feel free to contact me anytime.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img src={mail_icon} alt="Mail" className="w-6" />
              <p className="text-gray-300">sachinddsx@gmail.com</p>
            </div>
            <div className="flex items-center gap-4">
              <img src={call_icon} alt="Call" className="w-6" />
              <p className="text-gray-300">+91 97803442</p>
            </div>
            <div className="flex items-center gap-4">
              <img src={location_icon} alt="Location" className="w-6" />
              <p className="text-gray-300">Pune, Maharashtra</p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <form action="https://api.web3forms.com/submit" method="POST" className="lg:w-1/2 space-y-4">
  <input type="hidden" name="access_key" value="3cd9fc1d-52fa-4eba-9558-601269265bd9" />

  <div>
    <label className="block mb-1 text-sm">Your Name</label>
    <input
      type="text"
      name="name"
      placeholder="Enter your name"
      className="w-full bg-gray-800 border border-gray-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
      required
    />
  </div>

  <div>
    <label className="block mb-1 text-sm">Your Email</label>
    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      className="w-full bg-gray-800 border border-gray-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
      required
    />
  </div>

  <div>
    <label className="block mb-1 text-sm">Write your message here</label>
    <textarea
      name="message"
      rows="6"
      placeholder="Enter your message"
      className="w-full bg-gray-800 border border-gray-600 p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
      required
    ></textarea>
  </div>

  <button
    type="submit"
    className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded text-white font-medium hover:from-pink-500 hover:to-purple-500 transition"
  >
    Submit Now
  </button>
</form>

      </div>
    </div>
  );
};

export default Contact;
