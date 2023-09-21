import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from './src/resources/Colors';
import HomePage from './src/pages/home/HomePage';
import DetailPage from './src/pages/detail/DetailPage';
import {DatabaseConnection} from './src/local-database/DatabaseConnection';
import {Page, ScreenOptions, Stack, StackTheme} from './src/stack/StackConfig';

const App = () => {
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);

  useEffect(() => {
    DatabaseConnection.instance.setup().then(() => {
      setInitialized(true);
    });
  }, []);

  return (
    <NavigationContainer theme={StackTheme}>
      <SafeAreaView style={styles.main}>
        <LinearGradient
          colors={[colors.lightBlue, colors.sandBlue]}
          style={styles.linearGradient}>
          {initialized && (
            <Stack.Navigator
              initialRouteName={Page.Home}
              screenOptions={ScreenOptions}>
              <Stack.Screen name={Page.Home} component={HomePage} />
              <Stack.Screen name={Page.Details} component={DetailPage} />
            </Stack.Navigator>
          )}
        </LinearGradient>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },

  linearGradient: {
    flex: 1,
  },
});

export default App;
