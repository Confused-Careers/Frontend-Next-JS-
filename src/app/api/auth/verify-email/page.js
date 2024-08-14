
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    if (token) {
      axios.post(`${NEXT_PUBLIC_process.env.API_BASE_URL}/api/auth/verify-email`, { token })
        .then(response => {
          setStatus('Verification successful! Redirecting to login...');
          console.log(token);
          setTimeout(() => {
            router.push('/');
          }, 3000);
        })
        .catch(error => {
          setStatus('Verification failed. Please try again.');
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
