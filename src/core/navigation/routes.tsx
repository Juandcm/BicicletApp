import React from 'react';
import { useScreens } from 'react-native-screens';
import {
  createAppContainer,
  NavigationContainer,
  NavigationRouteConfigMap,
} from 'react-navigation';
import {
  createStackNavigator,
  NavigationStackProp,
} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  ComponentsContainer,
  LayoutsContainer,
  MenuContainer,
  ThemesContainer,
} from '@src/containers/menu';
import {
  Article1Container,
  ArticleList3Container,
  ArticleList4Container,
  ArticlesContainer,
} from '@src/containers/layouts/articles';
import {
  AuthContainer,
  ForgotPasswordContainer,
  SignIn3Container,
  SignUp3Container,
} from '@src/containers/layouts/auth';
import {
  DashboardsContainer,
  Trainings1Container,
} from '@src/containers/layouts/dashboards';
import {
  EcommerceContainer,
  MovieDetailsContainer,
  RentApartmentContainer,
} from '@src/containers/layouts/ecommerce';
import {
  Chat3Container,
  ConversationsListContainer,
  MessagingContainer,
} from '@src/containers/layouts/messaging';
import {
  ProfileSettings1Container,
  SettingsContainer,
  SocialContainer,
} from '@src/containers/layouts/social';
import {
  AvatarContainer,
  BottomNavigationContainer,
  ButtonContainer,
  ButtonGroupContainer,
  CheckBoxContainer,
  InputContainer,
  ListContainer,
  ModalContainer,
  OverflowMenuContainer,
  PopoverContainer,
  RadioContainer,
  TabViewContainer,
  TextContainer,
  ToggleContainer,
  TooltipContainer,
  TopNavigationContainer,
} from '@src/containers/components';
import {
  ArticlesNavigationOptions,
  DashboardNavigationOptions,
  EcommerceNavigationOptions,
  MenuNavigationOptions,
  SocialNavigationOptions,
} from './options';

const EcommerceNavigationMap: NavigationRouteConfigMap<any, NavigationStackProp> = {
  ['Rent Apartment']: {
    screen: RentApartmentContainer,
    navigationOptions: EcommerceNavigationOptions,
  },
  ['Movie Details']: {
    screen: MovieDetailsContainer,
    navigationOptions: EcommerceNavigationOptions,
  }
};

const DashboardsNavigationMap: NavigationRouteConfigMap<any, NavigationStackProp> = {
  ['Trainings 1']: {
    screen: Trainings1Container,
    navigationOptions: DashboardNavigationOptions,
  },
};

const MessagingNavigationMap: NavigationRouteConfigMap<any, NavigationStackProp> = {
  ['Lista de conversación']: ConversationsListContainer,
  ['Chat']: Chat3Container,
  ['Test Profile']: {
    screen: ProfileSettings1Container,
    navigationOptions: SocialNavigationOptions,
  },
};

const ArticlesNavigationMap: NavigationRouteConfigMap<any, NavigationStackProp> = {
  ['Article List 3']: {
    screen: ArticleList3Container,
    navigationOptions: ArticlesNavigationOptions,
  },
  ['Article List 4']: {
    screen: ArticleList4Container,
    navigationOptions: ArticlesNavigationOptions,
  },
  ['Article 1']: {
    screen: Article1Container,
    navigationOptions: ArticlesNavigationOptions,
  }
};

const SocialNavigationMap: NavigationRouteConfigMap<any, NavigationStackProp> = {
  ['Configuración del Perfil']: {
    screen: ProfileSettings1Container,
    navigationOptions: SocialNavigationOptions,
  },
  ['Configuración']: {
    screen: SettingsContainer,
    navigationOptions: SocialNavigationOptions,
  },
};

const AuthNavigationMap: NavigationRouteConfigMap<any, NavigationStackProp> = {
  ['Sign In 3']: SignIn3Container,
  ['Sign Up 3']: SignUp3Container,
  ['Forgot Password']: ForgotPasswordContainer,
};

const ThemesNavigator: NavigationContainer = createStackNavigator(
  {
    ['Configuración']: SettingsContainer,
    ['Themes']: ThemesContainer,
    ['Configuración del Perfil']: ProfileSettings1Container,
  }, {
    defaultNavigationOptions: MenuNavigationOptions,
  },
);

const ComponentsNavigator: NavigationContainer = createStackNavigator(
  {
    ['Components']: ComponentsContainer,
    ['Button']: ButtonContainer,
    ['Button Group']: ButtonGroupContainer,
    ['CheckBox']: CheckBoxContainer,
    ['Toggle']: ToggleContainer,
    ['Radio']: RadioContainer,
    ['Input']: InputContainer,
    ['Text']: TextContainer,
    ['Avatar']: AvatarContainer,
    ['Tab View']: TabViewContainer,
    ['Popover']: PopoverContainer,
    ['Tooltip']: TooltipContainer,
    ['Overflow Menu']: OverflowMenuContainer,
    ['List']: ListContainer,
    ['Top Navigation']: TopNavigationContainer,
    ['Bottom Navigation']: BottomNavigationContainer,
    ['Modal']: ModalContainer,
  },
  {
    defaultNavigationOptions: MenuNavigationOptions,
  },
);

const LayoutsNavigator: NavigationContainer = createStackNavigator(
  {
    ['Inicio']: LayoutsContainer,
    ['Social']: SocialContainer,
    ['Artículos']: ArticlesContainer,

    ['Mensajeria']: ConversationsListContainer,
    // ['Lista de conversación']: ConversationsListContainer,
    ['Escritorio']: Trainings1Container,
    ['Compras']: EcommerceContainer,
  },
  {
    defaultNavigationOptions: MenuNavigationOptions,
  },
);


const MenuNavigator = createBottomTabNavigator({
  ['Inicio']: LayoutsNavigator,
  ['Componentes']: ComponentsNavigator,
  ['Configuración']: ThemesNavigator,
}, {
    tabBarComponent: MenuContainer,
  });

const AppNavigator: NavigationContainer = createStackNavigator({
  ...AuthNavigationMap,
  ['Home']: MenuNavigator,
  ...SocialNavigationMap,
  ...ArticlesNavigationMap,
  ...MessagingNavigationMap,
  // ...DashboardsNavigationMap,
  ...EcommerceNavigationMap,
}, {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
  });

const createAppRouter = (container: NavigationContainer): NavigationContainer => {
  useScreens();
  return createAppContainer(container);
};


export const Router: NavigationContainer = createAppRouter(AppNavigator);
