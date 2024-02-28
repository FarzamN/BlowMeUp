/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {name as appName} from './app.json';
import store from './src/redux/reducer/store';
import TrackPlayer from 'react-native-track-player';
import { playbackService } from './src/screens/common/HomeFolder/PlayBackService';

const Root = () => (
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);

TrackPlayer.registerPlaybackService(() => playbackService);
AppRegistry.registerComponent(appName, () => Root);
