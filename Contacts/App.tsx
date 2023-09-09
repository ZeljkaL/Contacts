import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Page, ScreenOptions, Stack, StackTheme} from './rn/stack/StackConfig';
import {colors} from './rn/utils/Colors';
import HomePage from './rn/pages/home/HomePage';
import DetailPage from './rn/pages/detail/DetailPage';

const App = () => {
  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);

  return (
    <NavigationContainer theme={StackTheme}>
      <SafeAreaView style={styles.main}>
        <LinearGradient
          colors={[colors.lightGray, colors.lightGray, colors.darkGray]}
          style={styles.linearGradient}>
          <Stack.Navigator
            initialRouteName={Page.Home}
            screenOptions={ScreenOptions}>
            <Stack.Screen name={Page.Home} component={HomePage} />
            <Stack.Screen name={Page.Details} component={DetailPage} />
          </Stack.Navigator>
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
