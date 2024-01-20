/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Navigator from './src/screens/navigation/Navigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';


type SectionProps = PropsWithChildren<{
  title: string;
}>;


function InnerApp() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Provider store={store}>
        <InnerApp />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default App;
