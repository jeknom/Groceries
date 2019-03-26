import * as React from 'react';
import { Font } from 'expo';
import { View, AsyncStorage, StyleSheet, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider, BottomNavigation, Text } from 'react-native-paper';
import Groceries from './components/Groceries';
import Meals from './components/Meals';
import EraseData from './components/Debug/EraseData';

export default class App extends React.Component {
  state = {
    loading: true,
    index: 0,
    routes: [
      { key: 'meals', title: 'Meals', icon: 'queue-music' },
      { key: 'groceries', title: 'Groceries', icon: 'album' },
    ],
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

    const GroceriesRoute = () =>
      <Groceries
        data={this.state.data}
        onUpdate={this.updateData}
      />;

    const MealsRoute = () =>
      <Meals
        data={this.state.data}
        onUpdate={this.updateData}
      />;

    const handleIndexChange = index => this.setState({ index });

    const renderScene = BottomNavigation.SceneMap({
      groceries: GroceriesRoute,
      meals: MealsRoute,
    });

    if (!this.state.loading)
      return (
        <PaperProvider>
          <BottomNavigation
            navigationState={this.state}
            onIndexChange={handleIndexChange}
            renderScene={renderScene}
          />
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