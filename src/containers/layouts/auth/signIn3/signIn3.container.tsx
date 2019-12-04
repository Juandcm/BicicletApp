import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { StackActions,NavigationActions } from 'react-navigation';
import { SignInForm2Data } from '@src/components/auth';
import { SignIn3 } from './signIn3.component';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

export class SignIn3Container extends React.Component<NavigationStackScreenProps> {

  private navigationKey: string = 'SignIn3Container';

  private onSignInPress = (data: SignInForm2Data) => {
    // this.props.navigation.goBack();
    // this.props.navigation.navigate('Home');
    // console.log(data)
    this.props.navigation.dispatch(resetAction);
  };

  private onSignUpPress = () => {
    this.props.navigation.navigate('Sign Up 3');
  };

  private onForgotPasswordPress = () => {
    // console.log(this.props)
    this.props.navigation.navigate('Forgot Password');
  };

  public render(): React.ReactNode {
    return (
      <SignIn3
        onSignInPress={this.onSignInPress}
        onSignUpPress={this.onSignUpPress}
        onForgotPasswordPress={this.onForgotPasswordPress}
      />
    );
  }
}
