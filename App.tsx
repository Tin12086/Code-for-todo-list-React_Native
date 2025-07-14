import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, TextInput, FlatList, ScrollView, TouchableOpacity, Pressable, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

interface ITodo {
  id: number,
  name: string
}
export default function App() {
  const [todo, setTodo] = useState("");
  const [listTodo, setListTodo] = useState<ITodo[]>([])
  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const HandleAddToDo = () => {
    if(!todo){
      Alert.alert("Lỗi input todo", "Todo không được để trống", [
        {text: 'Xác nhận', onPress: () => console.log('OK Pressed')},
      ])
      return;
    };
    if(todo.trim()){
    setListTodo([...listTodo, {id: randomInteger(2, 20000000), name: todo}])}; 
    setTodo(""); 
  }
  const deleteTodo = (id: number) => {
    const newTodo = listTodo.filter(item => item.id !== id);
    setListTodo(newTodo);
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.header}>Todo App</Text>
        <View style={styles.body}>
          <TextInput placeholder='Add todo' onChangeText={(value) => setTodo(value)} style={styles.todoInput}/>
          <Button onPress={HandleAddToDo}
          title='Add todo' />
        </View>
        <ScrollView style={styles.body}> 
          {listTodo.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => deleteTodo(item.id)}>
              <Text style={styles.todoItem}>{item.id}.{item.name}</Text>
            </TouchableOpacity>
            // <Pressable onPress={() => deleteTodo(item.id)}>
            //   <Text style={styles.todoItem}>{item.id}.{item.name}</Text>
            // </Pressable>
          )
        )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "orange",
    paddingHorizontal: 20,
    textAlign: "center",
    fontSize: 40
  },
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  todoInput: {
    borderBottomColor: "green", 
    borderBottomWidth: 1,
    padding: 5,
    margin: 15
  },
  todoItem: {
    fontSize: 30,
    borderWidth: 1,
    borderStyle: "dashed",
    marginBottom: 20,
    padding: 10
  },
  body: {
    paddingHorizontal: 10,
    marginBottom: 20,
  }
});
