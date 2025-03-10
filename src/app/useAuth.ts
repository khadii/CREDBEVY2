// // useAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state:any) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, router]);

  return isAuthenticated;
};

export default useAuth;




// // pages/dashboard.js
// import useAuth from '../hooks/useAuth';

// const Dashboard = () => {
//   useAuth(); // Redirects to login if not authenticated

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>Welcome to your dashboard!</p>
//     </div>
//   );
// };

// export default Dashboard;