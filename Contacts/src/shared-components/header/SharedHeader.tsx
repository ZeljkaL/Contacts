import React from 'react';
import {StyleSheet, View} from 'react-native';

interface SharedHeaderProps {
  element: JSX.Element;
}

const SharedHeader: React.FC<SharedHeaderProps> = props => {
  const {element} = props;

  return <View style={styles.main}>{element}</View>;
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: 10,
    height: 90,
    paddingHorizontal: 20,
  },
});

export default SharedHeader;
