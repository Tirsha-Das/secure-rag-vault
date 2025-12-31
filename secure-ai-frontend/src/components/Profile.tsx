// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { http } from '../api/http'
// import { getProfile } from '../api/auth.api'

// const Profile = () => {
//   const [profile, setProfile] = useState<any>(null)
//   const [data, setData] = useState<any>(null)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await (
//           getProfile(`${localStorage.getItem('token')}`)
//         )
//         console.log(data.user);
//         // setProfile(data)
//         setData(data.user.email)
//       } catch {
//         navigate('/')
//       }
//     }
//     fetchData()
//   }, [navigate])

// //   if (!profile) return <p>Loading...</p>

//   return <div>Welcome {data}</div>
// }

// export default Profile

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../api/auth.api';

const Profile = () => {
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        console.log(data);
        setEmail(data.user.email);
      } catch {
        navigate('/');
      }
    };

    loadProfile();
  }, [navigate]);

  if (!email) return <p>Loading...</p>;

  return <div>Welcome {email}</div>;
};

export default Profile;
