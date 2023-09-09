import {StyleSheet, Text} from 'react-native';
import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

interface GradientTextProps {
  value: string;
  colors: string[];
}

const GradientText: React.FC<GradientTextProps> = props => {
  return (
    <MaskedView maskElement={<Text style={styles.text}>{props.value}</Text>}>
      <LinearGradient
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={props.colors}>
        <Text style={styles.hidden}>{props.value}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: 25,
  },

  text: {
    fontSize: 20,
  },

  hidden: {
    opacity: 0,
  },
});

export default GradientText;
