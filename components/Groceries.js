import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import Grocery from './Grocery';
import ModifyItem from './ModifyItem';

export default class Groceries extends React.Component {
  state = {
    search: "",
    addVisible: false,
  }

  handleAdd = grocery => {
    const dataCopy = { ...this.props.data };
    if (dataCopy.groceries.some(g => g.name === grocery.name))
      return;

    dataCopy.groceries.push(grocery);
    this.props.onUpdate(dataCopy);
  }

  handleDelete = groceryName => {
    const dataCopy = { ...this.props.data };
    dataCopy.groceries = dataCopy.groceries.filter(g => g.name !== groceryName);
    this.props.onUpdate(dataCopy);
  }

  render() {
    const { search } = this.state;
    const { data } = this.props;

    const groceryItems = () => {
      if (data.groceries) {
        const dataSearch = search === "" ? data.groceries : data.groceries.filter(g => g.name.toUpperCase().includes(search.toUpperCase()));
        dataSearch.sort((a, b) => (a.color > b.color) ? 1 : -1);
        return dataSearch.map(g =>
          <Grocery
            key={g.name}
            item={g}
            onDelete={this.handleDelete}
          />
        )
      }
    };

    return (
      <View style={styles.container}>
        <Searchbar
          style={styles.searchbar}
          placeholder="Search"
          onChangeText={query => { this.setState({ search: query }); }}
          value={search}
        />
        {groceryItems()}
        <Button
          style={styles.addButton}
          icon="add"
          mode="outlined"
          onPress={() => this.setState({ addVisible: true })}
        />
        <ModifyItem
          visible={this.state.addVisible}
          type={'GROCERY'}
          onModify={this.handleAdd}
          onCancel={() => {
            this.setState({ addVisible: false });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },

  searchbar: {
    margin: 20,
  },

  addButton: {
    marginRight: 20,
    marginLeft: 20,
    padding: 20,
  }
});