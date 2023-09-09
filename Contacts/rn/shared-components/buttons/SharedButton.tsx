import React from 'react';
import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  Image,
} from 'react-native';

interface SharedButtonProps {
  title?: string;

  style: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;

  imageSource?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;

  onPress: () => void;
}

const SharedButton: React.FC<SharedButtonProps> = props => {
  const {title, style, textStyle, imageSource, imageStyle, onPress} = props;

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {imageSource && (
        <Image resizeMode="contain" source={imageSource} style={imageStyle}/>
      )}
      {title && <Text style={textStyle}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default SharedButton;
