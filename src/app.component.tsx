import React from 'react';
import { ImageRequireSource, YellowBox, BackHandler, Alert, StatusBar } from 'react-native';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from '@kitten/theme';
import { DynamicStatusBar } from '@src/components/common';
import {
  ApplicationLoader,
  Assets,
} from './core/appLoader/applicationLoader.component';
import { Router } from './core/navigation/routes';
import { trackScreenTransition } from './core/utils/analytics';
import {
  getCurrentStateName,
  RouteState,
} from './core/navigation/util';
import {
  ThemeContext,
  ThemeContextType,
  ThemeKey,
  themes,
  ThemeStore,
} from '@src/core/themes';
import { IconRegistry } from '@kitten/ui';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/ConfigureStore.js";

YellowBox.ignoreWarnings(['Remote debugger']);
console.disableYellowBox = true;

const images: ImageRequireSource[] = [
  require('./assets/images/source/image-profile-1.jpg'),
  require('./assets/images/source/image-profile-2.jpg'),
  require('./assets/images/source/image-profile-3.jpg'),
  require('./assets/images/source/image-profile-4.jpg'),
  require('./assets/images/source/image-profile-5.jpg'),
  require('./assets/images/source/image-profile-6.jpg'),
  require('./assets/images/source/image-profile-7.jpg'),
  require('./assets/images/source/image-profile-8.jpg'),
  require('./assets/images/source/image-profile-9.jpg'),
  require('./assets/images/source/image-profile-10.jpg'),
];

const fonts: { [key: string]: number } = {
  'opensans-semibold': require('./assets/fonts/opensans-semibold.ttf'),
  'opensans-bold': require('./assets/fonts/opensans-bold.ttf'),
  'opensans-extrabold': require('./assets/fonts/opensans-extra-bold.ttf'),
  'opensans-light': require('./assets/fonts/opensans-light.ttf'),
  'opensans-regular': require('./assets/fonts/opensans-regular.ttf'),
};

const assets: Assets = {
  images: images,
  fonts: fonts,
};

interface State {
  theme: ThemeKey;
}

export default class App extends React.Component<{}, State> {

  public state: State = {
    theme: 'Eva Light',
  };

  private onTransitionTrackError = (error: any): void => {
    console.warn('Analytics error: ', error.message);
  };

  private onNavigationStateChange = (prevState: RouteState, currentState: RouteState) => {
    const prevStateName: string = getCurrentStateName(prevState);
    const currentStateName: string = getCurrentStateName(currentState);

    if (prevStateName !== currentStateName) {
      trackScreenTransition(currentStateName)
        .catch(this.onTransitionTrackError);
    }
  };

  private onSwitchTheme = (theme: ThemeKey) => {
    ThemeStore.setTheme(theme).then(() => {
      this.setState({ theme });
    });
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    Alert.alert(
      'BicicletApp',
      '¿Estas seguro de salir?',
      [
        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Si', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false })
    return true;
  }

  public render(): React.ReactNode {
    const contextValue: ThemeContextType = {
      currentTheme: this.state.theme,
      toggleTheme: this.onSwitchTheme,
    };

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ApplicationLoader assets={assets}>
            <IconRegistry icons={EvaIconsPack} />
            <ThemeContext.Provider value={contextValue}>
              <ApplicationProvider
                mapping={mapping}
                theme={themes[this.state.theme]}>
                <DynamicStatusBar currentTheme={this.state.theme} />
                <StatusBar hidden={true} />
                <Router onNavigationStateChange={this.onNavigationStateChange} />
              </ApplicationProvider>
            </ThemeContext.Provider>
          </ApplicationLoader>
        </PersistGate>
      </Provider>
    );
  }
}
