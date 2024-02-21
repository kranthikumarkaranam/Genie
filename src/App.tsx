import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './store/store';
import RootNavigation from './routes/RootNavigation';
import {PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
