import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Settings } from './settings.component';

interface State {
  soundEnabled: boolean;
}

export class SettingsContainer extends React.Component<NavigationStackScreenProps, State> {

  public state: State = {
    soundEnabled: true,
  };

  private navigationKey: string = 'SettingsContainer';

  private onEditProfilePress = () => {
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Profile Settings 1',
    });
  };

  private onChangePasswordPress = () => {

  };

  private onNotificationPress = () => {

  };

  private onPrivacyPress = () => {

  };

  private onSoundEnabledValueChange = (soundEnabled: boolean) => {
    this.setState({ soundEnabled });
  };

  public render(): React.ReactNode {
    return (
      <Settings
        soundEnabled={this.state.soundEnabled}
        onEditProfilePress={this.onEditProfilePress}
        onChangePasswordPress={this.onChangePasswordPress}
        onNotificationPress={this.onNotificationPress}
        onPrivacyPress={this.onPrivacyPress}
        onSoundEnabledValueChange={this.onSoundEnabledValueChange}
        navigationprops = {this.props.navigation}
      />
    );
  }
}
