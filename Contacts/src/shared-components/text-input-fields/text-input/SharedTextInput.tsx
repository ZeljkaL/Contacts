import React from 'react';
import {StyleProp, TextInput, ViewStyle} from 'react-native';
import {colors} from '../../../resources/Colors';

interface SharedTextInputProps {
  value?: string;
  placeholder: string;
  numeric: boolean;
  secureTextEntry?: boolean;

  style: StyleProp<ViewStyle>;
  placeholderTextColor?: string;

  onChange: (value: string) => void;
  onFocus?: (focused: boolean) => void;
}

const Constants = {
  REGEX: /^[0-9]*$/,
};

const SharedTextInput: React.FC<SharedTextInputProps> = props => {
  const {
    value,
    placeholder,
    placeholderTextColor,
    style,
    numeric,
    secureTextEntry,
    onChange,
    onFocus,
  } = props;

  const onChangeInput = (inputText: string) => {
    if (!numeric) {
      onChange(inputText);
      return;
    }

    // Regular expression allows only digits (0-9)
    if (!Constants.REGEX.test(inputText)) {
      return;
    }

    onChange(inputText);
  };

  const onTextFocus = (focus: boolean) => {
    if (!onFocus) {
      return;
    }

    onFocus(focus);
  };

  return (
    <TextInput
      style={style}
      value={!value ? '' : value.toString()}
      onChangeText={onChangeInput}
      placeholder={placeholder}
      autoCapitalize="none"
      secureTextEntry={secureTextEntry}
      placeholderTextColor={placeholderTextColor ?? colors.mediumBlue}
      onFocus={() => onTextFocus(true)}
      onBlur={() => onTextFocus(false)}
    />
  );
};

export default SharedTextInput;
