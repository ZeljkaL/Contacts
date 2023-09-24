import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {assets} from '../../../resources/Assets';
import {colors} from '../../../resources/Colors';
import {Contact} from '../../../local-database/entities/Contact';
import SharedButton from '../../buttons/SharedButton';
import TextField from '../../text-input-fields/text-input/TextField';
import PhoneNumberField from '../../text-input-fields/phone-input/PhoneNumberField';
import {ResponsivenessManager} from '../../../resources/ResponsivenessManager';

const Constants = {
  TITLE: 'Create New Contact',
  EDIT_TITLE: 'Edit Contact',

  NAME_LABEL: 'Name*',
  NAME_PLACEHOLDER: 'Enter name',

  NUMBER_LABEL: 'Number*',
  NUMBER_PLACEHOLDER: 'Enter number',

  ADDRESS_LABEL: 'Address',
  ADDRESS_PLACEHOLDER: 'Enter address',

  EMAIL_LABEL: 'Email',
  EMAIL_PLACEHOLDER: 'Enter email',

  NAME_FIELD: 'name',
  PHONE_FIELD: 'phone',
  EMAIL_FIELD: 'email',
  ADDRESS_FIELD: 'address',
};

interface ContactEntryViewProps {
  savedContact?: Contact;

  onSave: (contact: Contact) => void;
  onCancel: () => void;
}

const ContactEntryView: React.FC<ContactEntryViewProps> = props => {
  const {savedContact, onSave, onCancel} = props;

  const [contact, setContact] = useState<Contact>(savedContact);

  const [nameInvalid, setNameInvalid] = useState<boolean>(false);
  const [phoneInvalid, setPhoneInvalid] = useState<boolean>(false);

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
      setNameInvalid(true);
      return;
    }

    if (!contact.phone) {
      setPhoneInvalid(true);
      return;
    }

    onSave(contact);
    onCancel();
  }, [contact, onSave, onCancel]);

  const handleInputChange = useCallback((value: string, fieldName: string) => {
    setContact(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));

    if (fieldName === Constants.NAME_FIELD) {
      setNameInvalid(false);
      return;
    }

    if (fieldName === Constants.PHONE_FIELD) {
      setPhoneInvalid(false);
    }
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
          invalid={nameInvalid}
          onChange={value => handleInputChange(value, Constants.NAME_FIELD)}
        />
        <PhoneNumberField
          label={Constants.NUMBER_LABEL}
          placeholder={Constants.NUMBER_PLACEHOLDER}
          invalid={phoneInvalid}
          value={savedContact?.phone ?? ''}
          onChange={value => handleInputChange(value, Constants.PHONE_FIELD)}
        />
        <TextField
          value={contact?.email}
          numeric={false}
          label={Constants.EMAIL_LABEL}
          placeholder={Constants.EMAIL_LABEL}
          onChange={value => handleInputChange(value, Constants.EMAIL_FIELD)}
        />
        <TextField
          value={contact?.address}
          numeric={false}
          label={Constants.ADDRESS_LABEL}
          placeholder={Constants.ADDRESS_LABEL}
          onChange={value => handleInputChange(value, Constants.ADDRESS_FIELD)}
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
    width: ResponsivenessManager.calculateWidth('95%'),
    height: ResponsivenessManager.calculateHeight('80%'),
    borderRadius: ResponsivenessManager.calculateWidth('2%'),
    padding: ResponsivenessManager.calculateWidth('5%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.lightBlue,
    marginTop: ResponsivenessManager.calculateHeight('3%'),
  },

  keyboard: {
    width: '100%',
    height: '100%',
  },

  iconButton: {
    alignSelf: 'center',
    borderColor: colors.sandBlue,
    borderRadius: 10,
    borderWidth: 2,
    width: ResponsivenessManager.calculateWidth('30%'),
    height: ResponsivenessManager.calculateHeight('13%'),
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
    width: '90%',
    height: ResponsivenessManager.calculateHeight('7%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    width: '45%',
    height: '100%',
    borderRadius: ResponsivenessManager.calculateWidth('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButton: {
    backgroundColor: colors.sandBlue,
  },

  title: {
    color: colors.sandBlue,
    fontSize: 24,
  },

  cancelButton: {
    borderColor: colors.sandBlue,
    borderWidth: 2,
  },

  buttonText: {
    color: colors.white,
    fontWeight: '600',
  },

  cancelTitle: {
    color: colors.sandBlue,
  },
});

export default ContactEntryView;
