import {Linking} from 'react-native';
import {IDropdownItem} from '../shared-components/dropdowns/SharedDropdown';
import {assets} from './Assets';

export class Utils {
  static async sleep(delay: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  static async fetchMedia(number: string): Promise<IDropdownItem[]> {
    const viberLink = `viber://contact?number=${number}`;
    const whatsappLink = `whatsapp://send?phone=${number}`;
    const skypeLink = `skype:${number}?call`;

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
  }
}
