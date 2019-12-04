import {
  imageChat3Layout,
  imageConversationListLayout,
} from '@src/assets/images';
import { MessagingContainerData } from './type';

export const routes: MessagingContainerData[] = [
  {
    title: 'Lista de conversación',
    description: 'Option 1',
    image: imageConversationListLayout.imageSource,
    route: 'Lista de conversación',
  },
  {
    title: 'Chat',
    description: 'Option 3',
    image: imageChat3Layout.imageSource,
    route: 'Chat',
  },
];
