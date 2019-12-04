import React from 'react';
import { Alert } from 'react-native';
import { NavigationParams } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { NavigationTabScreenProps } from 'react-navigation-tabs';
import { EcommerceHeader } from '@src/components/ecommerce';
import { MenuContainer } from '@src/containers/menu';
import { ArrowIosBackFill } from '@src/assets/icons';
import { TopNavigationBar } from './components/topNavigationBar.component';
import {
  getCurrentRouteState,
  isRootRoute,
  getCurrentRouteIndex,
  RouteState,
} from './util';
import { KEY_NAVIGATION_BACK } from './constants';

export type TopNavigationElement = React.ReactElement<any>;
export type BottomNavigationElement = React.ReactElement<any>;

export interface TopNavigationParams extends NavigationParams {
  header: (props) => TopNavigationElement | null;
}

export interface BottomNavigationParams extends NavigationParams {
  bottomNavigation: (props: NavigationTabScreenProps) => BottomNavigationElement | null;
}

const MenuTopNavigationParams: TopNavigationParams = {
  header: (props): TopNavigationElement => {
    // @ts-ignore (private API)
    const { routeName } = getCurrentRouteState(props.navigation);
    const index: number = getCurrentRouteIndex(props.navigation);
    const onSearchPress = () => {
      Alert.alert('Abriendo Menu Drawer...');
    };
    return (
      <TopNavigationBar
        {...props}
        title={routeName}
        onSearch={onSearchPress}
        backIcon={isRootRoute(index) && ArrowIosBackFill}
        onBackPress={() => {
          props.navigation.goBack(KEY_NAVIGATION_BACK);
        }}
        navigationprops={props.navigation}
      />
    );
  },
};

const EcommerceMenuTopNavigationParams: TopNavigationParams = {
  header: (props: NavigationStackScreenProps): TopNavigationElement => {
    const state: RouteState = getCurrentRouteState(props.navigation);

    const onBackPress = () => {
      props.navigation.goBack(KEY_NAVIGATION_BACK);
    };

    const onSearchPress = () => {
      Alert.alert('Search...');
    };

    const onShoppingCartPress = () => {
      props.navigation.navigate({
        key: state.routeName,
        routeName: 'Shopping Cart',
      });
    };

    return (
      <EcommerceHeader
        title={state.routeName}
        onBack={onBackPress}
        onSearch={onSearchPress}
        onShoppingCart={onShoppingCartPress}
      />
    );
  },
};

// const MenuBottomNavigationParams: BottomNavigationParams = {
//   bottomNavigation: (props: NavigationTabScreenProps): BottomNavigationElement => {
//     return (
//       <MenuContainer {...props} />
//     );
//   },
// };

export const MenuNavigationOptions: NavigationParams = {
  ...MenuTopNavigationParams,
};

export const SocialNavigationOptions: NavigationParams = EcommerceMenuTopNavigationParams;

export const ArticlesNavigationOptions: NavigationParams = EcommerceMenuTopNavigationParams;

export const DashboardNavigationOptions: NavigationParams = EcommerceMenuTopNavigationParams;

export const EcommerceNavigationOptions: NavigationParams = EcommerceMenuTopNavigationParams;
