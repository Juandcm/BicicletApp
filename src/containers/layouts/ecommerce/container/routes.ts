import {
  imageMovieDetailsLayout,
  imageRentApartmentLayout,
} from '@src/assets/images';
import { EcommerceContainerData } from './type';

export const routes: EcommerceContainerData[] = [
  {
    title: 'Rent Apartment',
    description: 'Option 1',
    image: imageRentApartmentLayout.imageSource,
    route: 'Rent Apartment',
  },
  {
    title: 'Movie Details',
    description: 'Option 1',
    image: imageMovieDetailsLayout.imageSource,
    route: 'Movie Details',
  },
];
