import React from 'react';
import theme_pattern from '../assets/theme_pattern.svg';
import mywork_data from '../assets/mywork_data';

const MyWork = () => {
  return (
    <div id='my-work' className="bg-black text-white px-6 py-16">
      {/* Title Section */}
      <div className="flex items-center gap-4 mb-12">
        <h1 className="text-4xl font-bold">My Latest Work</h1>
        <img src={theme_pattern} alt="pattern" className="h-6" />
      </div>

      {/* Work Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mywork_data.map((item, index) => (
          <div key={index} className="bg-gray-900 p-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
            <img src={item.w_img} alt="" className="w-full h-48 object-cover rounded-md mb-4" />
            <div>
              <h2 className="text-xl font-semibold mb-2">{item.w_name}</h2>
              <p className="text-gray-400 mb-4">{item.description}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline"
              >
                View Project →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWork;
