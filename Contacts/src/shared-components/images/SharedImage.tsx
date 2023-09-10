import React from 'react';
import {ImageSourcePropType, ImageStyle, StyleProp, Image} from 'react-native';

export type IconPath = string | ImageSourcePropType;

interface SharedImageProps {
  path: IconPath;
  style: StyleProp<ImageStyle>;
}

const SharedImage: React.FC<SharedImageProps> = props => {
  const {path, style} = props;

  const iconPath = typeof path === 'string' ? {uri: path} : path;

  return <Image resizeMode="contain" source={iconPath} style={style} />;
};

export default SharedImage;
