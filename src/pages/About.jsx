import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-14 px-4 sm:px-6 lg:px-9">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
         
          <div className="h-1 w-32 bg-blue-500 mx-auto"></div>
        </div>

        {/* Profile Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mb-4">
              <img 
                src="https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Sansaboon Ounnart</h2>
            <p className="text-gray-600 mt-2">Full Stack Developer</p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Technical Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <SkillCard title="Frontend" items={["React", "HTML", "CSS", "JavaScript"]} />
            <SkillCard title="Backend" items={["Node.js", "Express"]} />
            <SkillCard title="Tools" items={["Git", "VS Code", "Figma"]} />
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-600">sansaboon@hotmail.com</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-600">+66 90-103-1373</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-600">Bangkok, Thailand</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skill Card Component
function SkillCard({ title, items }) {
  return (
    <div className="border rounded-lg p-4">
      <h4 className="font-medium text-gray-800 mb-2">{title}</h4>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-gray-600 text-sm">• {item}</li>
        ))}
      </ul>
    </div>
  );
}

export default About;