import React from 'react';
import { List } from 'react-native-paper';
import Counter from './Counter';

const Grocery = ({ grocery, onIncrease, onDecrease }) => {
    return (
        <List.Item
            key={grocery.name}
            title={grocery.name}
            description={`Costs ${grocery.price}€ | Found in area ${grocery.layout}`}
            right={() =>
                <Counter
                    count={grocery.quantity ? grocery.quantity : 0}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                />
            }
        />
    );
}

export default Grocery;