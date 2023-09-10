import React from 'react';
import {
  ImageStyle,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import SharedImage, {IconPath} from '../images/SharedImage';

interface SharedButtonProps {
  title?: string;

  style: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;

  iconPath?: IconPath;
  iconStyle?: StyleProp<ImageStyle>;

  onPress: () => void;
}

const SharedButton: React.FC<SharedButtonProps> = props => {
  const {title, style, textStyle, iconPath, iconStyle, onPress} = props;

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {iconPath && <SharedImage path={iconPath} style={iconStyle} />}
      {title && <Text style={textStyle}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default SharedButton;
