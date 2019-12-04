import {
  imageForgotPasswordLayout,
  imageSignIn3Layout,
  imageSignUp3Layout,
} from '@src/assets/images';
import { AuthContainerData } from './type';

export const routes: AuthContainerData[] = [
  {
    title: 'Sign In',
    description: 'Option 3',
    image: imageSignIn3Layout.imageSource,
    route: 'Sign In 3',
  },
  {
    title: 'Sign Up',
    description: 'Option 3',
    image: imageSignUp3Layout.imageSource,
    route: 'Sign Up 3',
  },
  {
    title: 'Forgot Password',
    description: 'Option 1',
    image: imageForgotPasswordLayout.imageSource,
    route: 'Forgot Password',
  },
];
