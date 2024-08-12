import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RegisterForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photo: '',
    role: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    // Validation fields
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    else if(formData.email.length < 15) newErrors.email = "Email must be at least 15 characters";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      setIsOpen(false);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)} className="bg-gray-600 transition-shadow duration-300 hover:shadow-inner hover:shadow-gray-500 text-white">
        Register
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out z-50 backdrop-blur-sm">
          <div className="bg-gray-700 p-6 rounded-lg shadow-xl w-96 transition-all duration-300 ease-in-out transform scale-100 opacity-100" 
               style={{animation: 'modalFadeIn 0.3s ease-out'}}>
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-600 border-none"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-600 border-none"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="photo">Photo URL</Label>
                  <Input
                    id="photo"
                    name="photo"
                    value={formData.photo}
                    onChange={handleInputChange}
                    className="w-full bg-gray-600 border-none"
                  />
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select name="role" onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700">
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-gray-600 border-none"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-gray-600 border-none"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" onClick={() => setIsOpen(false)} variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Register
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterForm;