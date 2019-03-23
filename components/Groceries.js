import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Searchbar, Divider } from 'react-native-paper';
import Grocery from './Grocery';
import GroceryEdit from './GroceryEdit';

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
        <Divider />
        {groceryItems()}
        <Button
          style={styles.addButton}
          icon="add"
          mode="outlined"
          onPress={() => this.setState({ addVisible: true })}
        >
          Add grocery
        </Button>
        <GroceryEdit
          visible={this.state.addVisible}
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
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
  },

  searchbar: {
    margin: 20,
  },

  addButton: {
    margin: 20,
    padding: 10,
  }
});