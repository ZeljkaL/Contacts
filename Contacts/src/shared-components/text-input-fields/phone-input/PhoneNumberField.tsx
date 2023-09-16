import React, {useCallback, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import ReactNativePhoneInput from 'react-native-phone-input';
import {colors} from '../../../resources/Colors';

interface PhoneNumberFieldProps {
  label: string;
  placeholder: string;
  invalid: boolean;

  onChange: (value: string, valid: boolean) => void;
}

const PhoneNumberField: React.FC<PhoneNumberFieldProps> = props => {
  const {invalid, onChange} = props;

  const phoneInputRef = useRef<ReactNativePhoneInput>(null);

  const onChangePhoneNumber = useCallback(
    (value: string) => {
      onChange(value, phoneInputRef.current.isValidNumber());
    },
    [onChange],
  );

  return (
    <View style={styles.main}>
      <Text style={styles.label}>{props.label}</Text>
      <PhoneInput
        ref={ref => (phoneInputRef.current = ref)}
        autoFormat
        style={[styles.inputContainer, invalid && styles.invalidInput]}
        initialValue=""
        textProps={{
          placeholder: props.placeholder,
        }}
        onPressFlag={() => {
          return;
        }}
        onChangePhoneNumber={onChangePhoneNumber}
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

export default PhoneNumberField;
