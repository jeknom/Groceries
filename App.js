import * as React from 'react';
import { Font } from 'expo';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Navigator from './components/Navigator';

export default class App extends React.Component {
  state = {
    fontLoading: true,
  }

  async componentDidMount() {
    await Font.loadAsync({ 'MaterialIcons': require('./assets/fonts/MaterialIcons.ttf'), });
    this.setState({ fontLoading: false });
  }

  render() {
    return (
      <PaperProvider theme={theme}>
        {this.state.fontLoading ?
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            color="#0000ff"
          />
          :
          <Navigator />
        }
      </PaperProvider>
    );
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#06d62f',
    accent: 'white',
  }
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});