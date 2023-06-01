import React from 'react';
import AuthNavigator from './src/navigation/AuthNavigator';
import {useSelector} from 'react-redux';
import UserNavigator from './src/navigation/UserNavigator';
import ArtistNavigator from './src/navigation/ArtistNavigator';
const App = () => {
  const userData = useSelector(state => state.userDetails);
  console.log(userData);
  return (
    <>
      {userData == null && <AuthNavigator />}
      {userData == 'user@gmail.com' && <UserNavigator />}
      {userData == 'artist@gmail.com' && <ArtistNavigator />}
    </>
  );
};

export default App;
