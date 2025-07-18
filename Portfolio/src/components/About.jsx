import React from 'react';
import theme_pattern from '../assets/theme_pattern.svg';
import profile from '../assets/profile.jpg';

const About = () => {
  return (
    <div id='about' className="bg-black text-white px-6 py-16">
      {/* Title */}
      <div className="flex items-center gap-4 mb-12">
        <h1 className="text-4xl font-bold px-4">About Me</h1>
        <img src={theme_pattern} alt="Pattern" className="h-6" />
      </div>

      {/* Section: Image + Text */}
      <div className="flex flex-col lg:flex-row items-start gap-12">
        {/* Left: Profile image */}
        <div className="flex justify-center lg:w-1/2">
          <img src={profile} alt="Profile" className="w-64 h-64 rounded-xl object-cover shadow-lg" />
        </div>

        {/* Right: Paragraph + Skills */}
        <div className="lg:w-1/2 space-y-6">
          {/* Paragraph */}
          <div className="space-y-2 text-gray-300">
            <p>I am an experienced frontend developer with a strong foundation in building responsive and user-friendly web applications.</p>
            <p>My passion for frontend development is not only about creating beautiful designs, but also delivering great user experiences.</p>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            {[
              { name: 'HTML & CSS', width: 'w-3/4' },
              { name: 'React JS', width: 'w-2/3' },
              { name: 'Javascript', width: 'w-3/4' },
              { name: 'Next JS', width: 'w-1/2' },
              { name: 'NodeJS', width: 'w-1/2' }
            ].map((skill, index) => (
              <div key={index} className='transition duration 300 hover:scale-105'>
                <p className="mb-1">{skill.name}</p>
                <div className="bg-gray-700 h-2 rounded">
                  <div className={`bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded ${skill.width}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
        <div className="bg-gray-900 p-6 rounded-xl shadow-md transition duration 300 hover:scale-105">
          <h1 className="text-4xl font-bold text-purple-400">1+</h1>
          <p className="mt-2 text-gray-300">Year of EXPERIENCE</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl shadow-md transition duration 300 hover:scale-105">
          <h1 className="text-4xl font-bold text-pink-400">5+</h1>
          <p className="mt-2 text-gray-300">PROJECTS COMPLETED</p>
        </div>
      </div>
    </div>
  );
};

export default About;
