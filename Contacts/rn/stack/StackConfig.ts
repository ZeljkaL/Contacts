import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {Contact} from '../pages/home/components/contact-list/ContactList';
import {DefaultTheme} from '@react-navigation/native';
import {colors} from '../utils/Colors';

// https://stackoverflow.com/questions/76995774/ts2322-type-typeof-login-is-not-assignable-to-type

export const StackTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export const ScreenOptions: NativeStackNavigationOptions = {
  animation: 'none',
  headerStyle: {
    backgroundColor: colors.darkGray,
  },
  headerTitleStyle: {
    color: colors.white,
  },
};

export enum Page {
  Home = 'Contacts',
  Details = 'Details',
}

export type RootStackParamList = {
  [Page.Home]: undefined;
  [Page.Details]: DetailProps;
};

export type DetailProps = {
  contact: Contact;
};

export type PageProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export const Stack = createNativeStackNavigator<RootStackParamList>();
