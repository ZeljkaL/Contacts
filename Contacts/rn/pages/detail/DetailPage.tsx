import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {PageProps, Page} from '../../stack/StackConfig';
import SharedButton from '../../shared-components/buttons/SharedButton';
import {colors} from '../../utils/Colors';
import SharedHeader from '../../shared-components/header/SharedHeader';
import DetailButtonPanel from './components/DetailButtonPanel';
import DetailInfoPanel from './components/info/DetailInfoPanel';

const contactPath = '../../assets/background.jpg';
const editPath = '../../assets/edit.png';

const DetailPage: React.FC<PageProps<Page.Details>> = props => {
  const {route} = props;

  const contact = route.params.contact;

  const onAction = () => {
    return;
  };

  return (
    <View style={styles.main}>
      <SharedHeader
        jsxElement={
          <SharedButton
            style={styles.editButton}
            imageSource={require(editPath)}
            imageStyle={styles.editIcon}
            onPress={onAction}
          />
        }
      />

      <View style={styles.detailContainer}>
        <Image source={require(contactPath)} style={styles.contactIcon} />
        <View style={styles.panel}>
          <DetailButtonPanel
            onCall={onAction}
            onMessage={onAction}
            onShare={onAction}
          />
          <DetailInfoPanel contact={contact} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  editButton: {
    backgroundColor: '#0066ff',
    width: 30,
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    position: 'absolute',
    right: 20,
  },

  editIcon: {
    width: 20,
    height: 20,
    tintColor: colors.lightGray,
  },

  detailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  contactIcon: {
    width: 180,
    height: 180,
    borderRadius: 10,
    borderColor: colors.lighterGreen,
    borderWidth: 4,
    backgroundColor: 'white',
  },

  panel: {
    width: '100%',
    padding: 20,
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.mediumGray,
  },
});

export default DetailPage;
