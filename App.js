import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigation';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useContext, useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        authCtx.authenticate(storedToken)
      }
      setIsTryingLogin(false);
    }
    fetchToken();
  }, [])

  const onLayoutRootView = (async () => {
    if (isTryingLogin) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onLayout={onLayoutRootView}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('./assets/images/smartImage.png')} />
          </View>
        </View>
      );
    }
  }, [isTryingLogin]);

  if (!isTryingLogin) {
    return <Navigation />
  }

}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}


