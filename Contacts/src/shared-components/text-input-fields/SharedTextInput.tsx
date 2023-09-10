import React from 'react';
import {StyleProp, TextInput, ViewStyle} from 'react-native';
import {colors} from '../../utils/Colors';

interface SharedTextInputProps {
  value?: string;
  placeholder: string;
  numeric: boolean;

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
    onChange,
    onFocus,
  } = props;

  const onChangeInput = (inputText: string) => {
    if (!numeric) {
      onChange(inputText);
      return;
    }

    if (!Constants.REGEX.test(inputText)) {
      return;
    }

    // Regular expression allows only digits (0-9)
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
      placeholderTextColor={placeholderTextColor ?? colors.lightGray}
      onFocus={() => onTextFocus(true)}
      onBlur={() => onTextFocus(false)}
    />
  );
};

export default SharedTextInput;
