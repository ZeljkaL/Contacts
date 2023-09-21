import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import uuid from 'react-native-uuid';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {assets} from '../../../resources/Assets';
import {colors} from '../../../resources/Colors';
import {IContact} from '../../../types/IContact';
import {Contact} from '../../../local-database/entities/Contact';
import SharedButton from '../../buttons/SharedButton';
import TextField from '../../text-input-fields/text-input/TextField';
import PhoneNumberField from '../../text-input-fields/phone-input/PhoneNumberField';

const Constants = {
  TITLE: 'Create New Contact',
  EDIT_TITLE: 'Edit Contact',
  NAME_LABEL: 'Name*',
  NAME_PLACEHOLDER: 'Enter name',

  NUMBER_LABEL: 'Number*',
  NUMBER_PLACEHOLDER: 'Enter number',
};

interface ContactEntryViewProps {
  savedContact?: Contact;

  onSave: (contact: Contact) => void;
  onCancel: () => void;
}

const ContactEntryView: React.FC<ContactEntryViewProps> = props => {
  const {savedContact, onSave, onCancel} = props;

  const [contact, setContact] = useState<IContact>(null);
  const [isNameInvalidOnSave, setIsNameInvalidOnSave] =
    useState<boolean>(false);
  const [isPhoneInvalidOnSave, setIsPhoneInvalidOnSave] =
    useState<boolean>(false);

  useEffect(() => {
    if (!savedContact) {
      return;
    }

    const iContact: IContact = {
      name: savedContact.name,
      number: savedContact.phoneNumber,
      imagePath: savedContact.imagePath,
    };

    setContact(iContact);
  }, [savedContact]);

  const onUploadImage = useCallback(async () => {
    const image = await ImagePicker.openPicker({
      multiple: false,
      mediaType: 'photo',
    });

    setContact(prevState => ({
      ...prevState,
      imagePath: image.sourceURL,
    }));
  }, []);

  const onSaveContact = useCallback(() => {
    if (!contact || !contact.name) {
      setIsNameInvalidOnSave(true);
      return;
    }

    if (!contact.number) {
      setIsPhoneInvalidOnSave(true);
      return;
    }

    onSave({
      id: savedContact ? savedContact.id : uuid.v4().toString(),
      name: contact.name,
      phoneNumber: contact.number,
      imagePath: contact.imagePath,
    });

    onCancel();
  }, [contact, savedContact, onSave, onCancel]);

  const onNameInputChange = useCallback((updatedName: string) => {
    setIsNameInvalidOnSave(false);
    setContact(prevState => ({
      ...prevState,
      name: updatedName,
    }));
  }, []);

  const onPhoneInputChange = useCallback((value: string) => {
    setIsPhoneInvalidOnSave(false);
    setContact(prevState => ({
      ...prevState,
      number: value,
    }));
  }, []);

  return (
    <KeyboardAwareScrollView enableOnAndroid style={styles.keyboard}>
      <View style={styles.main}>
        <Text style={styles.title}>
          {savedContact ? Constants.EDIT_TITLE : Constants.TITLE}
        </Text>
        <SharedButton
          iconPath={
            contact && contact.imagePath
              ? contact.imagePath
              : assets.uploadImage
          }
          iconStyle={
            contact && contact.imagePath ? styles.contactImage : styles.icon
          }
          style={styles.iconButton}
          onPress={onUploadImage}
        />
        <TextField
          value={contact?.name}
          numeric={false}
          label={Constants.NAME_LABEL}
          placeholder={Constants.NAME_PLACEHOLDER}
          invalid={isNameInvalidOnSave}
          onChange={onNameInputChange}
        />
        <PhoneNumberField
          label={Constants.NUMBER_LABEL}
          placeholder={Constants.NUMBER_PLACEHOLDER}
          invalid={isPhoneInvalidOnSave}
          value={savedContact?.phoneNumber ?? ''}
          onChange={onPhoneInputChange}
        />
        <View style={styles.buttons}>
          <SharedButton
            title={'Cancel'}
            style={[styles.button, styles.cancelButton]}
            textStyle={[styles.buttonText, styles.cancelTitle]}
            onPress={onCancel}
          />
          <SharedButton
            title={'Save'}
            style={[styles.button, styles.saveButton]}
            textStyle={styles.buttonText}
            onPress={onSaveContact}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '95%',
    height: 450,
    backgroundColor: colors.lightBlue,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 120,
  },

  keyboard: {
    width: '100%',
    height: '100%',
  },

  title: {
    color: colors.sandBlue,
    fontSize: 24,
  },

  iconButton: {
    alignSelf: 'center',
    borderColor: colors.sandBlue,
    borderRadius: 10,
    borderWidth: 2,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: '50%',
    height: '50%',
    tintColor: colors.sandBlue,
    opacity: 0.6,
  },

  contactImage: {
    width: '100%',
    height: '100%',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: 50,
  },

  button: {
    width: 140,
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButton: {
    backgroundColor: colors.sandBlue,
  },

  cancelButton: {
    borderColor: colors.sandBlue,
    borderWidth: 2,
    height: 54,
  },

  buttonText: {
    color: colors.white,
    fontWeight: '600',
  },

  cancelTitle: {
    color: colors.sandBlue,
  },

  inputContainer: {
    borderWidth: 2,
    borderColor: colors.sandBlue,
    borderRadius: 10,
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactEntryView;
