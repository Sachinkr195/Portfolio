import React from 'react';

const Footer = () => {
  return (
    <div className="bg-black text-white px-6 py-12">
     

      {/* Divider */}
      <hr className="border-gray-700 my-8" />

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <p>@ 2025 Sachin Kumar. All rights reserved.</p>
        <div className="flex gap-6">
          <p className="hover:text-white cursor-pointer">Terms of Service</p>
          <p className="hover:text-white cursor-pointer">Privacy Policy</p>
          <p className="hover:text-white cursor-pointer">Connect with me</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
