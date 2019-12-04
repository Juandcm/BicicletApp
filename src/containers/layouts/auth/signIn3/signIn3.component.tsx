import React from 'react';
import { View } from 'react-native';
import AwesomeButton from "react-native-really-awesome-button";
import Toast, { DURATION, ToastStyles } from 'react-native-easy-toast'
import { LinearGradient } from "expo-linear-gradient";

import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  Button,
  Text,
} from '@kitten/ui';
import {
  SignInForm2,
  SignInForm2Data,
} from '@src/components/auth';
import {
  ScrollableAvoidKeyboard,
  ImageOverlay,
  textStyle,
} from '@src/components/common';
import {
  imageSignIn3Bg,
  ImageSource,
  trekLogin,
  manillarLogin
} from '@src/assets/images';

interface ComponentProps {
  onForgotPasswordPress: () => void;
  onSignInPress: (formData: SignInForm2Data) => void;
  onSignUpPress: () => void;
}

export type SignIn3Props = ThemedComponentProps & ComponentProps;

interface State {
  formData: SignInForm2Data;
}

class SignIn3Component extends React.Component<SignIn3Props, State> {

  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = trekLogin;

  private onSignInButtonPress = () => {
    this.props.onSignInPress(this.state.formData);
  };

  private onSignUpButtonPress = () => {
    this.props.onSignUpPress();
  };

  private onForgotPasswordButtonPress = () => {
    this.props.onForgotPasswordPress();
    console.log(this.props)
  };

  private onFormDataChange = (formData: SignInForm2Data) => {
    this.setState({ formData });
  };


  private actionSimulation = (next) => {
    setTimeout(() => {
      next();
      this.onSignInButtonPress()
    }, 1000);
  }

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <ScrollableAvoidKeyboard>
        <ImageOverlay
          style={themedStyle.container}
          source={this.backgroundImage.imageSource}>
          <View style={themedStyle.headerContainer}>
            <Text
              style={themedStyle.helloLabel}
              category='h4'>
              Login
            </Text>
            <Text
              style={themedStyle.signInLabel}
              category='s1'>
              Entrar en tu cuenta
            </Text>
          </View>
          <SignInForm2
            style={themedStyle.formContainer}
            onForgotPasswordPress={this.onForgotPasswordButtonPress}
            onDataChange={this.onFormDataChange}
          />
          <AwesomeButton
            style={themedStyle.signInButton}
            // disabled={!this.state.formData}
            onPress={this.actionSimulation}
            borderRadius={50}
            raiseLevel={6}
            springRelease={true}
            backgroundShadow='rgba(255,255,255,0)'
            activeOpacity={.6}
            progress
            stretch={true}>

            <Text
              style={themedStyle.helloLabel}
              category='H2'>
              INICIAR
            </Text>
          </AwesomeButton>


          <Button
            style={themedStyle.signUpButton}
            textStyle={themedStyle.signUpText}
            appearance='ghost'
            activeOpacity={0.75}
            onPress={this.onSignUpButtonPress}>
            ¿No tienes una cuenta? Regístrate
          </Button>



        </ImageOverlay>
      </ScrollableAvoidKeyboard>
    );
  }
}



export const SignIn3 = withStyles(SignIn3Component, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  helloLabel: {
    color: 'white',
    ...textStyle.headline,
  },
  signInLabel: {
    marginTop: 16,
    color: 'white',
    ...textStyle.subtitle,
  },
  signInButton: {
    marginHorizontal: 16,
    width: '90%',
  },
  signUpButton: {
    marginVertical: 12,
  },
  signUpText: {
    color: 'white',
    ...textStyle.subtitle,
  },
}));

