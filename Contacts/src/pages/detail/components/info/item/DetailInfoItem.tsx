import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors} from '../../../../../resources/Colors';

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
    height: 70,
    textAlignVertical: 'center',
    borderBottomColor: colors.lighterGreen,
    borderBottomWidth: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  label: {
    color: colors.lighterGreen,
    fontSize: 16,
    fontWeight: '500',
  },

  value: {
    marginLeft: 10,
    fontSize: 20,
    color: colors.white,
  },
});

export default DetailInfoItem;
