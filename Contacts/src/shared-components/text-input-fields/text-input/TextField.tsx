import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SharedTextInput from './SharedTextInput';
import {colors} from '../../../resources/Colors';
import {ResponsivenessManager} from '../../../resources/ResponsivenessManager';

interface TextFieldProps {
  label: string;
  value?: string;
  placeholder: string;
  numeric: boolean;
  invalid?: boolean;
  secureTextEntry?: boolean;

  onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = props => {
  return (
    <View style={styles.main}>
      <Text style={styles.label}>{props.label}</Text>
      <SharedTextInput
        value={props.value}
        placeholder={props.placeholder}
        numeric={props.numeric}
        secureTextEntry={props.secureTextEntry}
        style={[styles.inputContainer, props.invalid && styles.invalidInput]}
        onChange={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
  },

  label: {
    color: colors.sandBlue,
    fontWeight: '600',
  },

  inputContainer: {
    height: ResponsivenessManager.calculateHeight('5%'),
    borderRadius: ResponsivenessManager.calculateWidth('2%'),
    paddingHorizontal: ResponsivenessManager.calculateWidth('2%'),
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.sandBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },

  invalidInput: {
    borderColor: colors.error,
    borderWidth: 2,
  },
});

export default TextField;
