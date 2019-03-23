import * as React from 'react';
import { List, IconButton, Colors, Divider } from 'react-native-paper';

const Grocery = ({ item, onDelete }) => {
  return (
    <>
      <List.Item
        title={item.name}
        description={item.price}
        left={() =>
          <IconButton
            icon="remove"
            color={Colors.red500}
            size={20}
            onPress={() => onDelete(item.name)}
          />
        }
      />
      <Divider />
    </>
  );
}

export default Grocery;