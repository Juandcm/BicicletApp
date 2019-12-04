import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  StyleType,
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  ListItem,
  ListItemProps,
  Text,
} from '@kitten/ui';

interface ComponentProps {
  title: string;
}

export type ThemeCardComponentProps = ThemedComponentProps & ListItemProps & ComponentProps;

export class ThemeCardComponent extends React.Component<ThemeCardComponentProps> {

  private getCardStatus = (): string => {
    return this.props.disabled ? 'ACTIVE' : '';
  };

  private renderColors = (style: StyleType, index: number): React.ReactElement<ViewProps> => {
    const { themedStyle } = this.props;

    return (
      <View
        key={index}
        style={[themedStyle.colorItem, style]}
      />
    );
  };

  public render(): React.ReactNode {
    const { themedStyle, style, title, ...restProps } = this.props;

    const colors: StyleType[] = [
      themedStyle.colorItem1,
      themedStyle.colorItem2,
      themedStyle.colorItem3,
      themedStyle.colorItem4,
      themedStyle.colorItem5,
      themedStyle.colorItem6,
    ];

    var cardStatus: string = this.getCardStatus();
    // if (cardStatus == 'active') {
    //   cardStatus = 'Activo';
    // }
    titulonuevo = '';
    switch (title) {
      case 'Eva Light':
        titulonuevo = 'Tema claro';
        break;
      case 'Eva Dark':
        titulonuevo = 'Tema oscuro';
        break;
      default:
        break;
    }
    return (
      <ListItem
        {...restProps}
        style={[themedStyle.container, style]}>
        <View style={themedStyle.headerContainer}>
          <Text
            style={themedStyle.titleLabel}
            category='h6'>
            {titulonuevo}
          </Text>
          <Text category='label'>
          {(cardStatus=='ACTIVE')?'Activo':null}
          {/* {cardStatus} */}
          </Text>
        </View>
        <View style={themedStyle.colorContainer}>
          {colors.map(this.renderColors)}
        </View>
      </ListItem>
    );
  }
}

export const ThemeCard = withStyles(ThemeCardComponent, (theme: ThemeType) => ({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorContainer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleLabel: {
    flex: 1,
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginHorizontal: 2,
  },
  colorItem1: {
    backgroundColor: theme['background-basic-color-2'],
  },
  colorItem2: {
    backgroundColor: theme['background-basic-color-3'],
  },
  colorItem3: {
    backgroundColor: theme['background-alternative-color-2'],
  },
  colorItem4: {
    backgroundColor: theme['background-alternative-color-1'],
  },
  colorItem5: {
    backgroundColor: theme['text-basic-color'],
  },
  colorItem6: {
    backgroundColor: theme['color-primary-default'],
  },
}));
