import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import HomeHeader from './components/header/HomeHeader';
import ContactList from './components/contact-list/ContactList';
import {Page, PageProps} from '../../stack/StackConfig';
import SharedHeader from '../../shared-components/header/SharedHeader';
import SharedModal from '../../shared-components/modals/SharedModal';
import {Contact} from '../../local-database/entities/Contact';
import ContactEntryView from '../../shared-components/modals/contact-entry/ContactEntryView';
import DialogPopup from '../../shared-components/modals/dialog-popup/DialogPopup';

const Constants = {
  DIALOG_TITLE: 'Are you sure you want to delete contact?',
};

const HomePage: React.FC<PageProps<Page.Home>> = props => {
  const {navigation} = props;

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [pendingContact, setPendingContact] = useState<Contact>(null);
  const [searchValue, setSearchValue] = useState('');
  const [createVisible, setCreateVisible] = useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);

  const findContacts = useCallback(async (value?: string) => {
    setSearchValue(value);
    setContacts(await Contact.find(value));
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Note that fetched contact modification won't be applied, since API provides read-only functionality
      Contact.fetch()
        .then(fetchedContacts => {
          Contact.save(fetchedContacts).then(() => {
            findContacts();
          });
        })
        .catch(_ => console.log('Error while fetching API users'));
    }, [findContacts]),
  );

  const onContactPress = useCallback(
    (contact: Contact) => {
      navigation.navigate(Page.Details, {
        contact: contact,
      });
    },
    [navigation],
  );

  const onSaveContact = useCallback(
    async (contact: Contact) => {
      await Contact.save([contact]);

      findContacts();
    },
    [findContacts],
  );

  const onConfirmDeletion = useCallback(async () => {
    await Contact.delete(pendingContact);
    setDeleteVisible(false);

    findContacts();
  }, [pendingContact, findContacts]);

  const onDeleteButtonPress = useCallback((contact: Contact) => {
    setPendingContact(contact);
    setDeleteVisible(true);
  }, []);

  return (
    <View style={styles.main}>
      <SharedHeader
        element={
          <HomeHeader
            searchValue={searchValue}
            onSearch={findContacts}
            onAdd={() => setCreateVisible(true)}
          />
        }
      />

      <ContactList
        contacts={contacts}
        onContactPress={onContactPress}
        onDeleteContact={onDeleteButtonPress}
      />

      {createVisible && (
        <SharedModal
          element={
            <ContactEntryView
              onSave={onSaveContact}
              onCancel={() => setCreateVisible(false)}
            />
          }
        />
      )}

      {deleteVisible && (
        <SharedModal
          element={
            <DialogPopup
              title={Constants.DIALOG_TITLE}
              onConfirm={onConfirmDeletion}
              onCancel={() => setDeleteVisible(false)}
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
  },
});

export default HomePage;
