import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import DetailButtonPanel from './components/DetailButtonPanel';
import DetailInfoPanel from './components/info/DetailInfoPanel';
import {colors} from '../../resources/Colors';
import {assets} from '../../resources/Assets';
import {PageProps, Page} from '../../stack/StackConfig';
import {Contact} from '../../local-database/entities/Contact';
import SharedModal from '../../shared-components/modals/SharedModal';
import SharedImage from '../../shared-components/images/SharedImage';
import SharedHeader from '../../shared-components/header/SharedHeader';
import SharedButton from '../../shared-components/buttons/SharedButton';
import {IDropdownItem} from '../../shared-components/dropdowns/SharedDropdown';
import ContactEntryView from '../../shared-components/modals/contact-entry/ContactEntryView';
import {ResponsivenessManager} from '../../resources/ResponsivenessManager';

const DetailPage: React.FC<PageProps<Page.Details>> = props => {
  const {route} = props;

  const [contact, setContact] = useState<Contact>(route.params.contact);
  const [dropdownList, setDropdownList] = useState<IDropdownItem[]>([]);
  const [editContactVisible, setEditContactVisible] = useState<boolean>(false);

  const formattedPhoneNumber = useMemo(() => {
    return contact.phone.replace(/[\s-]/g, '');
  }, [contact]);

  const fetchDropdownList = useCallback(async (): Promise<IDropdownItem[]> => {
    const viberLink = `viber://contact?number=${formattedPhoneNumber}`;
    const whatsappLink = `whatsapp://send?phone=${formattedPhoneNumber}`;
    const skypeLink = `skype:${formattedPhoneNumber}?call`;

    return [
      {
        name: 'Viber',
        icon: assets.viber,
        link: viberLink,
        disabled: !(await Linking.canOpenURL(viberLink)),
      },
      {
        name: 'WhatsApp',
        icon: assets.whatsapp,
        link: whatsappLink,
        disabled: !(await Linking.canOpenURL(whatsappLink)),
      },
      {
        name: 'Skype',
        icon: assets.skype,
        link: skypeLink,
        disabled: !(await Linking.canOpenURL(skypeLink)),
      },
    ];
  }, [formattedPhoneNumber]);

  useEffect(() => {
    fetchDropdownList().then(response => {
      setDropdownList(response);
    });
  }, [fetchDropdownList]);

  const onSaveContact = useCallback(async (modifiedContact: Contact) => {
    setContact(modifiedContact);
    await Contact.save([{...modifiedContact}]);
  }, []);

  const onCall = useCallback(() => {
    Linking.openURL(`tel:${formattedPhoneNumber}`);
  }, [formattedPhoneNumber]);

  const onMessage = useCallback(() => {
    Linking.openURL(`sms:${formattedPhoneNumber}`);
  }, [formattedPhoneNumber]);

  const onSelectApp = useCallback((item: IDropdownItem) => {
    Linking.openURL(item.link);
  }, []);

  return (
    <View style={styles.main}>
      <SharedHeader
        element={
          <SharedButton
            style={styles.editButton}
            iconPath={assets.edit}
            iconStyle={styles.editIcon}
            onPress={() => setEditContactVisible(true)}
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
            data={dropdownList}
            onCall={onCall}
            onMessage={onMessage}
            onSelectApp={onSelectApp}
          />
          <DetailInfoPanel contact={contact} />
        </View>
      </View>

      {editContactVisible && (
        <SharedModal
          element={
            <ContactEntryView
              savedContact={contact}
              onSave={onSaveContact}
              onCancel={() => setEditContactVisible(false)}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-between',
  },

  editButton: {
    width: ResponsivenessManager.calculateWidth('11%'),
    height: ResponsivenessManager.calculateHeight('5%'),
    borderRadius: ResponsivenessManager.calculateWidth('2%'),
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editIcon: {
    width: ResponsivenessManager.calculateWidth('8%'),
    height: ResponsivenessManager.calculateHeight('3%'),
    tintColor: colors.lightBlue,
  },

  detailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  contactIcon: {
    width: ResponsivenessManager.calculateWidth('50%'),
    height: ResponsivenessManager.calculateHeight('23%'),
    borderRadius: ResponsivenessManager.calculateWidth('2%'),
    backgroundColor: colors.lightBlue,
    borderColor: colors.sandBlue,
    borderWidth: 4,
    opacity: 0.8,
  },

  panel: {
    width: '100%',
    height: ResponsivenessManager.calculateHeight('50%'),
    padding: ResponsivenessManager.calculateWidth('7%'),
    marginTop: ResponsivenessManager.calculateHeight('3%'),
    borderTopLeftRadius: ResponsivenessManager.calculateHeight('3%'),
    borderTopRightRadius: ResponsivenessManager.calculateHeight('3%'),
    backgroundColor: colors.blackShade,
  },
});

export default DetailPage;
