import React from 'react';
import { Mail, User, FileText } from 'lucide-react';

function About({ user }) {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-700 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
      <div className="flex flex-col gap-6">
        <div className="bg-gray-600 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <Mail className="text-blue-500 mr-2" size={24} />
            <h3 className="text-xl font-semibold">Email</h3>
          </div>
          <p>{user.email}</p>
        </div>
        <div className="bg-gray-600 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <User className="text-green-500 mr-2" size={24} />
            <h3 className="text-xl font-semibold">About</h3>
          </div>
          <p>{user.about}</p>
        </div>
        <div className="bg-gray-600 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <FileText className="text-purple-500 mr-2" size={24} />
            <h3 className="text-xl font-semibold">Resume</h3>
          </div>
          <a
            href={user.resume}
            download
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <FileText className="mr-2" size={18} />
            Download resume
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;

    


