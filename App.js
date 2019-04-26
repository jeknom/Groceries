import * as React from 'react';
import { Font } from 'expo';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
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
      <PaperProvider>
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

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});