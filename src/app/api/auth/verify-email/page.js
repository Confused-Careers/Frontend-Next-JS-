import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    if (token) {
      axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-email`, { token })
        .then(response => {
          if (response.data.success) {
            
            axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, { email: response.data.email, password: response.data.password })
              .then(loginResponse => {
                if (loginResponse.status === 200 && loginResponse.data.success) {
                  
                  localStorage.setItem('authToken', loginResponse.data.token);
                  setStatus('Verification successful! Redirecting to dashboard...');
                  setTimeout(() => {
                    router.push('/'); 
                  }, 3000);
                } else {
                  setStatus('Login failed after verification. Please try logging in manually.');
                }
              })
              .catch(error => {
                setStatus('Login error. Please try again.');
              });
          } else {
            setStatus('Verification failed. Please try again.');
          }
        })
        .catch(error => {
          setStatus('Verification error. Please try again.');
        });
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1>{status}</h1>
    </div>
  );
};

export default VerifyEmail;
