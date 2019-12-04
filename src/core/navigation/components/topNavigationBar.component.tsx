import React from 'react';
import {
  StyleType,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { ImageProps } from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionProps,
  TopNavigationProps,
} from '@kitten/ui';
import { textStyle } from '@src/components/common';
import { SafeAreaView } from './safeAreaView.component';
import {
  CartIconFill,
  MenuOutline,
} from '@src/assets/icons';
import {
  Icon,
  Layout,
  OverflowMenu,
} from 'react-native-ui-kitten';

export interface ComponentProps {
  backIcon?: BackIconProp;
  onBackPress?: () => void;
  onShoppingCart: () => void;
  onSearch: () => void;
}

export type TopNavigationBarProps = TopNavigationProps & ComponentProps;

type BackIconProp = (style: StyleType) => React.ReactElement<ImageProps>;
type BackButtonElement = React.ReactElement<TopNavigationActionProps>;


const MenuIcon = (style) => (
  <Icon {...style} name='more-vertical' />
);

const InfoIcon = (style) => (
  <Icon {...style} name='info' />
);

const PersonOutline = (style) => (
  <Icon {...style} name='person-outline' />
);

const LogoutIcon = (style) => (
  <Icon {...style} name='log-out' />
);

class TopNavigationBarComponent extends React.Component<TopNavigationBarProps> {

  private onBackButtonPress = () => {
    if (this.props.onBackPress) {
      this.props.onBackPress();
    }
  };
  state = {
    menuVisible: false,
  };

  menuData = [
    { title: 'Información', icon: InfoIcon },
    { title: 'Editar Perfil', icon: PersonOutline },
    { title: 'Salir', icon: LogoutIcon },
  ];

  onMenuActionPress = () => {
    const menuVisible = !this.state.menuVisible;
    this.setState({ menuVisible });
  };

  onMenuItemSelect = (index) => {
    // Handle Item Select
    this.setState({ menuVisible: false });
    // console.log(index)
    switch (index) {
      case 0:
      // this.props.navigationprops.navigate('')
      console.log('informacion de la aplicacion')
        break;
      case 1:
      this.props.navigationprops.navigate('Profile Settings 1')
      break;
      case 2:
      this.props.navigationprops.navigate('Sign In 3')
        break;

      default:
        break;
    }
  };

  private onSearch = (): void => {
    this.props.onSearch();
  };


  private renderBackButton = (source: BackIconProp): BackButtonElement => {
    return (
      <TopNavigationAction
        icon={source}
        onPress={this.onBackButtonPress}
      />
    );
  };

  private renderShoppingCartIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    const { themedStyle } = this.props;

    return CartIconFill({ ...style, ...themedStyle.cartIcon });
  };

  private renderRightControls = (): React.ReactElement<TopNavigationActionProps>[] => {
    return ([
      <OverflowMenu
        visible={this.state.menuVisible}
        data={this.menuData}
        style={{ marginTop: 40, borderWidth: .7, borderColor: 'black', }}
        placement='bottom end'
        onSelect={this.onMenuItemSelect}
        onBackdropPress={this.onMenuActionPress}>
        <TopNavigationAction
          icon={MenuIcon}
          onPress={this.onMenuActionPress}
        />
      </OverflowMenu>
    ]);
  };


  public render(): React.ReactNode {
    const { themedStyle, title, backIcon } = this.props;

    const leftControlElement: BackButtonElement | null = backIcon ? this.renderBackButton(backIcon) : null;

    return (
      <SafeAreaView style={themedStyle.safeArea}>
        <TopNavigation
          alignment='center'
          title={title}
          titleStyle={textStyle.subtitle}
          subtitleStyle={textStyle.caption1}
          leftControl={leftControlElement}
          rightControls={this.renderRightControls()}
        />
      </SafeAreaView>
    );
  }
}

export const TopNavigationBar = withStyles(TopNavigationBarComponent, (theme: ThemeType) => ({
  safeArea: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));
