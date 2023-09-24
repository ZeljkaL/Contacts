import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {PageProps, Page} from '../../stack/StackConfig';
import TextField from '../../shared-components/text-input-fields/text-input/TextField';
import {ResponsivenessManager} from '../../resources/ResponsivenessManager';
import SharedButton from '../../shared-components/buttons/SharedButton';
import {colors} from '../../resources/Colors';
import {assets} from '../../resources/Assets';
import SharedImage from '../../shared-components/images/SharedImage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Snackbar, {
  SnackbarType,
} from '../../shared-components/snackbar/Snackbar';
import {User} from '../../networking/User';

const Constants = {
  TITLE: 'Create New Contact',

  NAME_LABEL: 'Name*',
  NAME_PLACEHOLDER: 'Enter name',

  PASSWORD_LABEL: 'Password*',
  PASSWORD_PLACEHOLDER: 'Enter password',
};

const LoginPage: React.FC<PageProps<Page.Login>> = props => {
  const {navigation} = props;

  const [username, setUsername] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);

  const [snackbar, setSnackbar] = useState<boolean>(false);

  const onShowSnackbar = useCallback(() => {
    setSnackbar(true);

    setTimeout(() => {
      setSnackbar(false);
    }, 1000);
  }, []);

  const onLogin = useCallback(() => {
    User._instance
      .login(username, password)
      .then(() => {
        navigation.navigate(Page.Home);
      })
      .catch(_ => {
        onShowSnackbar();
      });
  }, [username, password, navigation, onShowSnackbar]);

  return (
    <KeyboardAwareScrollView enableOnAndroid>
      <View style={styles.main}>
        <SharedImage path={assets.logo} style={styles.logo} />

        <View style={styles.loginForm}>
          <TextField
            value={username}
            numeric={false}
            label={Constants.NAME_LABEL}
            placeholder={Constants.NAME_LABEL}
            onChange={setUsername}
          />
          <TextField
            value={password}
            numeric={false}
            secureTextEntry={true}
            label={Constants.PASSWORD_LABEL}
            placeholder={Constants.PASSWORD_PLACEHOLDER}
            onChange={setPassword}
          />

          <SharedButton
            disabled={!username || !password}
            title="Login"
            style={[
              styles.loginButton,
              (!username || !password) && styles.disabled,
            ]}
            textStyle={[
              styles.loginTitle,
              (!username || !password) && styles.disabled,
            ]}
            onPress={onLogin}
          />
        </View>

        {snackbar && <Snackbar snackbarType={SnackbarType.Failure} />}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: ResponsivenessManager.calculateHeight('100%'),
    paddingHorizontal: ResponsivenessManager.calculateWidth('5%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  logo: {
    width: '100%',
    height: ResponsivenessManager.calculateHeight('25%'),
    marginBottom: ResponsivenessManager.calculateHeight('4%'),
    marginTop: ResponsivenessManager.calculateHeight('10%'),
    tintColor: colors.sandBlue,
  },

  loginForm: {
    width: '100%',
    height: ResponsivenessManager.calculateHeight('27%'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  loginButton: {
    width: '80%',
    height: ResponsivenessManager.calculateHeight('6%'),
    borderRadius: ResponsivenessManager.calculateWidth('2%'),
    backgroundColor: colors.sandBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ResponsivenessManager.calculateHeight('4%'),
  },

  disabled: {
    opacity: 0.5,
  },

  loginTitle: {
    color: colors.white,
    fontSize: 21,
    fontWeight: '500',
  },
});

export default LoginPage;
