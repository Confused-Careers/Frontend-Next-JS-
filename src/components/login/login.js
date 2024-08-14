import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdLogin } from "react-icons/md";
import axios from 'axios';

const LoginForm = ({ onLoginSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    // Form validation
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, formData);

        
        if (response.status === 200 && response.data.success) {
          console.log('Login successful:', response.data);
         
          localStorage.setItem('authToken', response.data.token);
          onLoginSuccess();
          setIsOpen(false);
        } else {
          
          console.error('Login failed:', response.data.message);
          setErrors({ form: 'Invalid email or password' });
        }
      } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        setErrors({ form: 'An error occurred during login. Please try again.' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)} className="bg-gray-600 flex items-center gap-1 transition-shadow duration-300 hover:shadow-inner hover:shadow-gray-500 text-white">
        Login
        <MdLogin />
      </Button>

      {isOpen && (
        <div className="z-50 fixed inset-0 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out backdrop-blur-sm">
          <div className="bg-gray-700 p-6 rounded-lg shadow-xl w-96 transition-all duration-300 ease-in-out transform scale-100 opacity-100" 
               style={{animation: 'modalFadeIn 0.3s ease-out'}}>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
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

                <div className="flex justify-end space-x-2">
                  <Button type="button" onClick={() => setIsOpen(false)} variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Login
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

export default LoginForm;
