import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export class ResponsivenessManager {
  static calculateWidth = (widthPercentage: string) => {
    return wp(widthPercentage);
  };

  static calculateHeight = (heightPercentage: string) => {
    return hp(heightPercentage);
  };
}
