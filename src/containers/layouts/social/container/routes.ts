import {
  imageProfileSettings1Layout,
  imageSettingsLayout,
} from '@src/assets/images';
import { SocialContainerData } from './type';

export const routes: SocialContainerData[] = [
  
  {
    title: 'Configuración del Perfil',
    description: 'Option 1',
    image: imageProfileSettings1Layout.imageSource,
    route: 'Configuración del Perfil',
  },
  {
    title: 'Configuración',
    description: 'Option 1',
    image: imageSettingsLayout.imageSource,
    route: 'Configuración',
  },
];
