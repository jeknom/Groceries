import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Meals from './Meals';
import Shopping from './Shopping';
import Settings from './Settings';

class Navigator extends React.Component {
    state = {
        index: 0,
        isTransitionAllowed: true
    };

    activeView = () => {
        if (this.state.index === 0) return <Meals />;
        else if (this.state.index === 1) return <Shopping />;
        else if (this.state.index === 2) return <Settings />;
    }

    handleIndexChange = action => {
        if (action === 'increment' && this.state.index < 2) this.setState({ index: this.state.index + 1 });
        else if (action === 'decrement' && this.state.index > 0) this.setState({ index: this.state.index - 1 });
    }

    render() {
        const { colors } = this.props.theme;
        const { index } = this.state;

        const swipeConfig = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <GestureRecognizer
                onSwipeLeft={() => this.handleIndexChange('increment')}
                onSwipeRight={() => this.handleIndexChange('decrement')}
                config={swipeConfig}
                style={{ flex: 1, resizeMode: 'cover' }}
            >
                <View style={this.styles.container}>
                    <View style={this.styles.content}>
                        {this.activeView()}
                    </View>
                    <View style={this.styles.navigation}>
                        <TouchableOpacity
                            style={this.styles.navButton}
                            onPress={() => this.setState({ index: 0 })}
                        >
                            <Icon name="restaurant" size={24} color={index === 0 ? colors.accent : '#a5fc99'} />
                            <Text style={{ color: index === 0 ? colors.accent : '#a5fc99' }}>Meals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.styles.navButton}
                            onPress={() => this.setState({ index: 1 })}
                        >
                            <Icon name="shopping-cart" size={24} color={index === 1 ? colors.accent : '#a5fc99'} />
                            <Text style={{ color: index === 1 ? colors.accent : '#a5fc99' }}>Shopping</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.styles.navButton}
                            onPress={() => this.setState({ index: 2 })}
                        >
                            <Icon name="settings" size={24} color={index === 2 ? colors.accent : '#a5fc99'} />
                            <Text style={{ color: index === 2 ? colors.accent : '#a5fc99' }}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </GestureRecognizer>
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