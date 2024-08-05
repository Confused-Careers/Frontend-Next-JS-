import React, { useState } from 'react';

const Add = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    field: '',
    email: '',
    about: '',
    contact: '',
    resume: null,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSubmit({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(formData.image);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg max-w-md mx-auto">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input type="text" id="name" name="name" className="w-full bg-gray-700 rounded px-3 py-2" value={formData.name} onChange={handleChange} />
        </div>
        
        <div>
          <label htmlFor="field" className="block mb-1">Field</label>
          <input type="text" id="field" name="field" className="w-full bg-gray-700 rounded px-3 py-2" value={formData.field} onChange={handleChange} />
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input type="email" id="email" name="email" className="w-full bg-gray-700 rounded px-3 py-2" value={formData.email} onChange={handleChange} />
        </div>
        
        <div>
          <label htmlFor="about" className="block mb-1">About</label>
          <textarea id="about" name="about" className="w-full bg-gray-700 rounded px-3 py-2" rows="3" value={formData.about} onChange={handleChange}></textarea>
          <p className="text-sm text-gray-400 mt-1">Briefly describe yourself and your professional background.</p>
        </div>
        
        <div>
          <label htmlFor="contact" className="block mb-1">Contact</label>
          <input type="text" id="contact" name="contact" className="w-full bg-gray-700 rounded px-3 py-2" value={formData.contact} onChange={handleChange} />
          <p className="text-sm text-gray-400 mt-1">Enter your preferred contact method (e.g., phone number, social media handle).</p>
        </div>
        
        <div>
          <label htmlFor="resume" className="block mb-1">Resume</label>
          <input type="file" id="resume" name="resume" className="w-full bg-gray-700 rounded px-3 py-2" onChange={handleChange} />
          <p className="text-sm text-gray-400 mt-1">Upload your resume in PDF format (max 5MB).</p>
        </div>

        <div>
          <label htmlFor="image" className="block mb-1">Profile Image</label>
          <input type="file" id="image" name="image" className="w-full bg-gray-700 rounded px-3 py-2" onChange={handleChange} />
          <p className="text-sm text-gray-400 mt-1">Upload your profile image (max 5MB).</p>
        </div>
        
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
