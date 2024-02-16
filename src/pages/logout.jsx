
// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
// export function Logout() {

//   const navigate = useNavigate();
   
//   useEffect(() => {
//     const handleLogout = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.post(
//           "/api/logout",
          
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.status === 200) {
//           console.log('Logout successful');
//           toast.success("Logout...")
//           localStorage.removeItem('token');
//           console.log('Token after removal:', localStorage.getItem('token'));
//           navigate('/');
//           location.reload();
//         } else {
//           console.error('Logout failed:', response.data.message);
//         }
//       } catch (error) {
//         console.error('Error during logout:', error.message);
//       }
//     };

//     handleLogout();
//   }, [navigate]); 
//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       history.replaceState(null, document.title, window.location.href);
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, []);

//   return <div>
//     <Toaster position="top-right"  hideProgressBar={false} />
//     Logging out...</div>; 
    
// }



// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export function Logout() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
  
//     localStorage.removeItem('token');

//     navigate('/');
//   };

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// }

// export default Logout;
