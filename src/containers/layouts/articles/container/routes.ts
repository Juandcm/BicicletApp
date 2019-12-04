import { ArticlesContainerData } from './type';
import {
  imageArticle1Layout,
  imageArticleList3Layout,
  imageArticleList4Layout,
} from '@src/assets/images';

export const routes: ArticlesContainerData[] = [
  {
    title: 'Article List',
    description: 'Option 3',
    image: imageArticleList3Layout.imageSource,
    route: 'Article List 3',
  },
  {
    title: 'Article List',
    description: 'Option 4',
    image: imageArticleList4Layout.imageSource,
    route: 'Article List 4',
  },
  {
    title: 'Article',
    description: 'Option 1',
    image: imageArticle1Layout.imageSource,
    route: 'Article 1',
  }
];
