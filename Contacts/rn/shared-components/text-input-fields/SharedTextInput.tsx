import React from 'react';
import {StyleProp, TextInput, ViewStyle} from 'react-native';
import {colors} from '../../utils/Colors';

export type TextInputType = string | number | null;

interface SharedTextInputProps {
  value: TextInputType;
  placeholder: string;
  numeric: boolean;

  style: StyleProp<ViewStyle>;
  placeholderTextColor?: string;

  onChange: (value: TextInputType) => void;

  onFocus?: (focused: boolean) => void;
}

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

  const onChangeNumericInput = (inputText: string) => {
    // Use regular expression to only allow digits (0-9)
    const regex = /^[0-9]*$/;
    if (regex.test(inputText)) {
      onChange(Number(inputText));
    }
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
      value={value === null ? '' : value.toString()}
      onChangeText={numeric ? onChangeNumericInput : onChange}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor ?? colors.lightGray}
      onFocus={() => onTextFocus(true)}
      onBlur={() => onTextFocus(false)}
    />
  );
};

export default SharedTextInput;
