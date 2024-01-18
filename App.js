import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import uuid from 'react-native-uuid';
import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';

const App = () => {
  const [items, setItems] = useState([
    { id: uuid.v4(), text: 'Milk' },
    { id: uuid.v4(), text: 'Eggs' },
    { id: uuid.v4(), text: 'Bread' },
    { id: uuid.v4(), text: 'Milo' },
    { id: uuid.v4(), text: 'Garri' },
  ]);

  // Flag true if user is currently editing an item
  const [isEditing, setIsEditing] = useState(false);

  // State to capture information about the item being edited
  const [editItemDetail, setEditItemDetail] = useState({
    id: null,
    text: null,
  });

  const [checkedItems, setCheckedItems] = useState([]);

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Submit the user's edits to the overall items state
  const saveEditItem = (id, text) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editItemDetail.id ? { id, text: editItemDetail.text } : item
      )
    );
    // Flip edit status back to false
    setIsEditing(false);
  };

  // Event handler to capture user's text input as they edit an item
  const handleEditChange = (text) => {
    setEditItemDetail({ id: editItemDetail.id, text });
  };

  const addItem = (text) => {
    if (!text) {
      Alert.alert('No item entered', 'Please enter an item when adding to your shopping list', [
        { text: 'Understood', style: 'cancel' },
      ]);
    } else {
      setItems((prevItems) => [{ id: uuid.v4(), text }, ...prevItems]);
    }
  };

  // capture old item's ID and text when user clicks edit
  const editItem = (id, text) => {
    setEditItemDetail({ id, text });
    setIsEditing(true);
  };

  const itemChecked = (id, text) => {
    const isChecked = checkedItems.some((checkedItem) => checkedItem.id === id);
    isChecked
      ? // remove item from checked items state (uncheck)
        setCheckedItems((prevItems) => prevItems.filter((item) => item.id !== id))
      : // Add item to checked items state
        setCheckedItems((prevItems) => [...prevItems, { id, text }]);
  };

  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            deleteItem={deleteItem}
            editItem={editItem}
            isEditing={isEditing}
            editItemDetail={editItemDetail}
            saveEditItem={saveEditItem}
            handleEditChange={handleEditChange}
            itemChecked={itemChecked}
            checkedItems={checkedItems}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default App;
