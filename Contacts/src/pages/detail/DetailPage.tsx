import React from 'react';
import {StyleSheet, View} from 'react-native';
import DetailButtonPanel from './components/DetailButtonPanel';
import DetailInfoPanel from './components/info/DetailInfoPanel';
import {colors} from '../../resources/Colors';
import {assets} from '../../resources/Assets';
import {PageProps, Page} from '../../stack/StackConfig';
import SharedImage from '../../shared-components/images/SharedImage';
import SharedHeader from '../../shared-components/header/SharedHeader';
import SharedButton from '../../shared-components/buttons/SharedButton';

const DetailPage: React.FC<PageProps<Page.Details>> = props => {
  const {route} = props;
  const contact = route.params.contact;

  const onAction = () => {
    return;
  };

  return (
    <View style={styles.main}>
      <SharedHeader
        element={
          <SharedButton
            style={styles.editButton}
            iconPath={assets.edit}
            iconStyle={styles.editIcon}
            onPress={onAction}
          />
        }
      />

      <View style={styles.detailContainer}>
        <SharedImage
          path={contact.imagePath ?? assets.contact}
          style={styles.contactIcon}
        />
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