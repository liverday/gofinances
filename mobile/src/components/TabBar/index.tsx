import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Container, TabBarItem, TabBarText} from './styles';

import ListLogo from '../../assets/list.svg';
import RegisterLogo from '../../assets/total.svg';

const routeIcons: {[key: string]: any} = {
  Listagem: ListLogo,
  Cadastro: RegisterLogo,
};

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const {routes} = state;
  const focusedOptions = descriptors[routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <Container>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index == index;
        const onPress = (): void => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const Icon = routeIcons[route.name];

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarItem
            key={route.name}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Icon width={20} />
            <TabBarText isFocused={isFocused}>{label}</TabBarText>
          </TabBarItem>
        );
      })}
    </Container>
  );
};

export default TabBar;
