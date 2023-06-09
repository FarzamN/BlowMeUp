import React, {useState} from 'react';
import AuthNavigator from './src/navigation/AuthNavigator';
import {useSelector} from 'react-redux';
import UserNavigator from './src/navigation/UserNavigator';
import ArtistNavigator from './src/navigation/ArtistNavigator';
import SpalshScreen from './src/screens/SpalshScreen';
const App = () => {
  const userData = useSelector(state => state.userDetails);
  console.log(userData);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return (
    <>
      {loading ? (
        <SpalshScreen />
      ) : (
        <>
          {userData == null && <AuthNavigator />}
          {userData == 'user@gmail.com' && <UserNavigator />}
          {userData == 'artist@gmail.com' && <ArtistNavigator />}
        </>
      )}
    </>
  );
};

export default App;

// import React, {useState} from 'react';
// import AuthNavigator from './src/navigation/AuthNavigator';
// import {useSelector} from 'react-redux';
// import UserNavigator from './src/navigation/UserNavigator';
// import ArtistNavigator from './src/navigation/ArtistNavigator';
// import SpalshScreen from './src/screens/SpalshScreen';
// const App = () => {
//   const userData = useSelector(state => state.userDetails);
//   console.log(userData);
//   const [loading, setLoading] = useState(true);

//   setTimeout(() => {
//     setLoading(false);
//   }, 3000);

//   const role = 1
//   return (
//     <>
//       {loading ? (
//         <SpalshScreen />
//       ) : (
//         <>
//           {userData == null && <AuthNavigator />}
//           {userData?.user_id && role == 1 !=  null && <UserNavigator />}
//           {userData?.user_id && role == 2 != null && <ArtistNavigator />}
//         </>
//       )}
//     </>
//   );
// };

// export default App;

