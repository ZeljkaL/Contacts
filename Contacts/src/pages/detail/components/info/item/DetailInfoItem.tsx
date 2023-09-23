import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors} from '../../../../../resources/Colors';
import {ResponsivenessManager} from '../../../../../resources/ResponsivenessManager';

interface DetailInfoItemProps {
  label: string;
  value: string;
}

const DetailInfoItem: React.FC<DetailInfoItemProps> = props => {
  const {label, value} = props;

  return (
    <View style={styles.main}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: ResponsivenessManager.calculateHeight('7%'),
    textAlignVertical: 'center',
    borderBottomColor: colors.lightBlue,
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  label: {
    color: colors.lightBlue,
    fontSize: 16,
    fontWeight: '500',
  },

  value: {
    marginLeft: ResponsivenessManager.calculateWidth('2%'),
    fontSize: 20,
    color: colors.white,
  },
});

export default DetailInfoItem;
