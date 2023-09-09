import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SharedTextInput, {
  TextInputType,
} from '../../../../../shared-components/text-input-fields/SharedTextInput';
import {colors} from '../../../../../utils/Colors';

interface TextFieldProps {
  label: string;
  value: TextInputType;
  placeholder: string;
  numeric: boolean;

  onChange: (value: TextInputType) => void;
}

const TextField: React.FC<TextFieldProps> = props => {
  return (
    <View style={styles.main}>
      <Text style={styles.label}>{props.label}</Text>
      <SharedTextInput
        value={props.value}
        placeholder={props.placeholder}
        style={styles.inputContainer}
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
});

export default TextField;
