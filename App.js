import * as React from 'react';
import { Font } from 'expo';
import { View, AsyncStorage, StyleSheet, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import Groceries from './components/Groceries';

export default class App extends React.Component {
  state = {
    loading: true,
    data: {}
  }

  componentDidMount = async () => {
    await Font
      .loadAsync({
        'MaterialIcons': require('./assets/fonts/MaterialIcons.ttf')
      })
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log("Could not load fonts: ", error);
      });

    await AsyncStorage
      .getItem('DATA')
      .then(response => {
        if (response != null)
          this.setState({ data: JSON.parse(response) });
        else
          this.setState({
            data: {
              groceries: [],
              meals: []
            },
          });
      })
      .catch(error => {
        console.log("Could not fetch data: ", error);
      });
  }

  updateData = async data => {
    await AsyncStorage
      .setItem('DATA', JSON.stringify(data))
      .then(async () => {
        await AsyncStorage
          .getItem('DATA')
          .then(response => {
            this.setState({ data: JSON.parse(response) });
          });
      })
      .catch(error => {
        console.log("Could not update data: ", error);
      })
  }

  render() {
    console.log(this.state.data)
    if (!this.state.loading)
      return (
        <PaperProvider>
          <Groceries
            data={this.state.data}
            onUpdate={this.updateData}
          />
          <Button
            mode="outlined"
            onPress={async () => {
              await AsyncStorage.clear()
            }}
            icon="remove"
          >
            Debug: destroy data
        </Button>
        </PaperProvider>
      );
    else return (
      <PaperProvider>
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            color="#0000ff"
          />
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});