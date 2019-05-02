import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Meals from './Meals';
import Shopping from './Shopping';
import Settings from './Settings';

class Navigator extends React.Component {
    state = {
        active: { name: 'meals', component: <Meals /> }
    };

    handleActiveChange = name => {
        if (name === 'meals' && this.state.active.name !== 'meals')
            this.setState({ active: { name: 'meals', component: <Meals /> } });
        else if (name === 'shopping' && this.state.active.name !== 'shopping')
            this.setState({ active: { name: 'shopping', component: <Shopping /> } });
        else if (name === 'settings' && this.state.active.name !== 'settings')
            this.setState({ active: { name: 'settings', component: <Settings /> } });
    }

    render() {
        const { colors } = this.props.theme;
        const { active } = this.state;

        return (
            <View style={this.styles.container}>
                <View style={this.styles.content}>
                    {active.component}
                </View>
                <View style={this.styles.navigation}>
                    <TouchableOpacity
                        style={this.styles.navButton}
                        onPress={() => this.handleActiveChange('meals')}
                    >
                        <Icon name="restaurant" size={24} color={colors.accent} />
                        {active.name === 'meals' ? <Text style={{ color: colors.accent }}>Meals</Text> : null}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.styles.navButton}
                        onPress={() => this.handleActiveChange('shopping')}
                    >
                        <Icon name="shopping-cart" size={24} color={colors.accent} />
                        {active.name === 'shopping' ? <Text style={{ color: colors.accent }}>Shopping</Text> : null}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.styles.navButton}
                        onPress={() => this.handleActiveChange('settings')}
                    >
                        <Icon name="settings" size={24} color={colors.accent} />
                        {active.name === 'settings' ? <Text style={{ color: colors.accent }}>Settings</Text> : null}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    styles = StyleSheet.create({
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
            backgroundColor: this.props.theme.colors.primary,
            marginTop: 5,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center'
        },
        navButton: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            padding: 10,
            marginRight: 20,
            marginLeft: 20
        },
    });
}

export default withTheme(Navigator);