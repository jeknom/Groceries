import * as React from 'react';
import { BottomNavigation, Text, Colors } from 'react-native-paper';
import Meals from './Meals';
import Settings from './Settings';

const MealsRoute = () => <Meals />;
const ShoppingRoute = () => <Text>Shopping</Text>;
const SettingsRoute = () => <Settings />;

export default class MyComponent extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'meals', title: 'Meals', icon: 'restaurant' },
            { key: 'shopping', title: 'Shopping', icon: 'shopping-cart' },
            { key: 'settings', title: 'Settings', icon: 'settings' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        meals: MealsRoute,
        shopping: ShoppingRoute,
        settings: SettingsRoute,
    });

    render() {
        return (
            <BottomNavigation
                navigationState={this.state}
                onIndexChange={this._handleIndexChange}
                renderScene={this._renderScene}
            />
        );
    }
}