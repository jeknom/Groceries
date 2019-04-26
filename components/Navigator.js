import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Meals from './Meals';
import ShoppingList from './ShoppingList';
import Settings from './Settings';

export default class MyComponent extends React.Component {
    state = {
        active: { name: 'meals', component: <Meals /> }
    };

    handleActiveChange = name => {
        if (name === 'meals' && this.state.active.name !== 'meals') this.setState({ active: { name: 'meals', component: <Meals /> } });
        else if (name === 'shopping' && this.state.active.name !== 'shopping') this.setState({ active: { name: 'shopping', component: <ShoppingList /> } });
        else if (name === 'settings' && this.state.active.name !== 'settings') this.setState({ active: { name: 'settings', component: <Settings /> } });
    }

    render() {
        const { active } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    {active.component}
                </View>
                <View style={styles.navigation}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.handleActiveChange('meals')}
                    >
                        <Icon name="restaurant" size={26} color={active.name === 'meals' ? Colors.white : Colors.grey300} />
                        <Text style={{ color: active.name === 'meals' ? Colors.white : Colors.grey300 }}>Meals</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.handleActiveChange('shopping')}
                    >
                        <Icon name="shopping-cart" size={26} color={active.name === 'meals' ? Colors.white : Colors.grey300} />
                        <Text style={{ color: active.name === 'meals' ? Colors.white : Colors.grey300 }}>Shopping</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.handleActiveChange('settings')}
                    >
                        <Icon name="settings" size={26} color={active.name === 'meals' ? Colors.white : Colors.grey300} />
                        <Text style={{ color: active.name === 'meals' ? Colors.white : Colors.grey300 }}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    content: {
        flex: 1,
    },
    navigation: {
        flex: 0.08,
        flexDirection: 'row',
        backgroundColor: '#42a4f4',
        marginTop: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        marginRight: 20,
        marginLeft: 20
    }
});