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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 10,
    height: 60,
    paddingHorizontal: 20,
  },
});

export default SharedHeader;
