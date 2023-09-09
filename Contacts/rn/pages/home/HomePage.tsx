import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DetailProps, Page, PageProps} from '../../stack/StackConfig';
import ContactList, {Contact} from './components/contact-list/ContactList';
import {CONTACTS_DATA} from './components/MockedData';
import CreateContactModal from './components/create-contact/CreateContactModal';
import SharedHeader from '../../shared-components/header/SharedHeader';
import HomeHeader from './components/header/HomeHeader';
import {TextInputType} from '../../shared-components/text-input-fields/SharedTextInput';

const HomePage: React.FC<PageProps<Page.Home>> = props => {
  const {navigation} = props;

  const [contacts, setContacts] = useState<Contact[]>(CONTACTS_DATA);
  const [nameFilter, setNameFilter] = useState('');

  const [createContactVisible, setCreateContactVisible] =
    useState<boolean>(false);

  const onContactPress = useCallback(
    (contact: Contact) => {
      const detailProps: DetailProps = {
        contact: contact,
      };

      navigation.navigate(Page.Details, detailProps);
    },
    [navigation],
  );

  const onSaveContact = useCallback((contact: Contact) => {
    setContacts(prev => [...prev, contact]);
  }, []);

  const onSearch = useCallback(
    (value: TextInputType) => {
      const filteredContacts = contacts.filter(contact =>
        contact.name.includes(value as string),
      );
      setContacts(filteredContacts);
      setNameFilter(value as string);
    },
    [contacts],
  );

  const onClear = useCallback(() => {
    setContacts(CONTACTS_DATA);
    setNameFilter('');
  }, []);

  return (
    <View style={styles.main}>
      <SharedHeader
        jsxElement={
          <HomeHeader
            nameFilter={nameFilter}
            onSearch={onSearch}
            onAdd={() => setCreateContactVisible(true)}
            onClear={onClear}
          />
        }
      />

      <ContactList contacts={contacts} onContactPress={onContactPress} />

      <CreateContactModal
        visibility={createContactVisible}
        onSave={onSaveContact}
        onCancel={() => setCreateContactVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default HomePage;
