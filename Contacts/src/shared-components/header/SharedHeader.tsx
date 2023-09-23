import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ResponsivenessManager} from '../../resources/ResponsivenessManager';

interface SharedHeaderProps {
  element: JSX.Element;
}

const SharedHeader: React.FC<SharedHeaderProps> = props => {
  const {element} = props;

  return <View style={styles.main}>{element}</View>;
};

const styles = StyleSheet.create({
  main: {
    width: ResponsivenessManager.calculateWidth('90%'),
    height: ResponsivenessManager.calculateHeight('10%'),
    marginVertical: ResponsivenessManager.calculateHeight('2%'),
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export default SharedHeader;
