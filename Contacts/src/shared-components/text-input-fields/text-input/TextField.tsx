import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SharedTextInput from './SharedTextInput';
import {colors} from '../../../resources/Colors';

interface TextFieldProps {
  label: string;
  value?: string;
  placeholder: string;
  numeric: boolean;
  invalid?: boolean;

  onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = props => {
  return (
    <View style={styles.main}>
      <Text style={styles.label}>{props.label}</Text>
      <SharedTextInput
        value={props.value}
        placeholder={props.placeholder}
        style={[styles.inputContainer, props.invalid && styles.invalidInput]}
        onChange={props.onChange}
        numeric={props.numeric}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
  },

  label: {
    color: colors.white,
    fontWeight: '600',
    opacity: 0.5,
  },

  inputContainer: {
    borderWidth: 2,
    borderColor: colors.lightGray,
    borderRadius: 10,
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  invalidInput: {
    borderColor: 'red',
    borderWidth: 2,
  },
});

export default TextField;
