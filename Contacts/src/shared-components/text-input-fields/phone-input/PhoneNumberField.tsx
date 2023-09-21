import React, {useCallback, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import ReactNativePhoneInput from 'react-native-phone-input';
import {colors} from '../../../resources/Colors';

interface PhoneNumberFieldProps {
  label: string;
  placeholder: string;
  invalid: boolean;
  value: string;

  onChange: (value: string) => void;
}

const PhoneNumberField: React.FC<PhoneNumberFieldProps> = props => {
  const {onChange} = props;

  const phoneInputRef = useRef<ReactNativePhoneInput>(null);

  const onChangePhoneNumber = useCallback(
    (value: string) => {
      onChange(phoneInputRef.current.isValidNumber() ? value : undefined);
    },
    [onChange],
  );

  return (
    <View style={styles.main}>
      <Text style={styles.label}>{props.label}</Text>
      <PhoneInput
        ref={ref => (phoneInputRef.current = ref)}
        autoFormat
        style={[styles.inputContainer, props.invalid && styles.invalidInput]}
        initialValue={props.value}
        textProps={{
          placeholder: props.placeholder,
          placeholderTextColor: colors.mediumBlue,
        }}
        flagStyle={styles.flagStyle}
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
    color: colors.sandBlue,
    fontWeight: '600',
  },

  inputContainer: {
    borderWidth: 2,
    borderColor: colors.sandBlue,
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

  flagStyle: {
    backgroundColor: colors.lightBlue,
  },
});

export default PhoneNumberField;
