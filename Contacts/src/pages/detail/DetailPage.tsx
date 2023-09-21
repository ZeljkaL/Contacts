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

const DetailPage: React.FC<PageProps<Page.Details>> = props => {
  const {route} = props;

  const [contact, setContact] = useState<Contact>(route.params.contact);
  const [dropdownList, setDropdownList] = useState<IDropdownItem[]>([]);
  const [editContactVisible, setEditContactVisible] = useState<boolean>(false);

  const formattedPhoneNumber = useMemo(() => {
    return contact.phoneNumber.replace(/[\s-]/g, '');
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
    await Contact.save({...modifiedContact});
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
    backgroundColor: colors.darkBlue,
    width: 35,
    borderRadius: 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editIcon: {
    width: 20,
    height: 20,
    tintColor: colors.lightBlue,
  },

  detailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  contactIcon: {
    width: 180,
    height: 180,
    borderRadius: 10,
    borderColor: colors.sandBlue,
    borderWidth: 4,
    opacity: 0.8,
    backgroundColor: colors.lightBlue,
  },

  panel: {
    width: '100%',
    height: 400,
    padding: 20,
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default DetailPage;
