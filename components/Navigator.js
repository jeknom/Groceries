import * as React from 'react';
import { BottomNavigation, Text, Snackbar } from 'react-native-paper';
import Meals from './Meals';
import Settings from './Settings';

const MealsRoute = () => <Meals onNotification={this.handleNotification} />;
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
        snackbarVisible: false,
        notification: '',
    };

    handleNotification = (message, delay) => {
        this.setState({ notification: message, snackbarVisible: true })
        setTimeout(() => this.setState({ snackbarVisible: false }), delay);
    }

    handleIndexChange = index => this.setState({ index });

    renderScene = BottomNavigation.SceneMap({
        meals: MealsRoute,
        shopping: ShoppingRoute,
        settings: SettingsRoute,
    });

    render() {
        return (
            <>
                <BottomNavigation
                    navigationState={this.state}
                    onIndexChange={this.handleIndexChange}
                    renderScene={this.renderScene}
                />
                <Snackbar
                    visible={this.state.snackbarVisible}
                    onDismiss={() => this.setState({ snackbarVisible: false })}
                >
                    {this.state.notification}
                </Snackbar>
            </>
        );
    }
}