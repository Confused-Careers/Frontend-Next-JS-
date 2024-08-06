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

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedFormData = {
        ...formData,
        image: formData.image ? reader.result : null,
      };

      if (formData.resume) {
        const resumeReader = new FileReader();
        resumeReader.onloadend = () => {
          updatedFormData.resume = resumeReader.result;
          onSubmit(updatedFormData);
        };
        resumeReader.readAsDataURL(formData.resume);
      } else {
        onSubmit(updatedFormData);
      }
    };

    if (formData.image) {
      reader.readAsDataURL(formData.image);
    } else {
      reader.onloadend();
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
          <label htmlFor="contact" className="block mb-1">Contact Number</label>
          <input type="text" id="contact" name="contact" className="w-full bg-gray-700 rounded px-3 py-2" value={formData.contact} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="resume" className="block mb-1">Resume</label>
          <input type="file" id="resume" name="resume" className="w-full bg-gray-700 rounded px-3 py-2" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="image" className="block mb-1">Profile Image</label>
          <input type="file" id="image" name="image" className="w-full bg-gray-700 rounded px-3 py-2" onChange={handleChange} />
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2">Save</button>
      </form>
    </div>
  );
};

export default Add;
