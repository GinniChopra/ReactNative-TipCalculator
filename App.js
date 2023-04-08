import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput,Button,Image  } from "react-native";
import {FlatList,SafeAreaView,TouchableOpacity} from 'react-native';


const percentageAmount = [
  {id: 1, name: "10%", value: 0.10},
  {id: 2, name: "15%", value: 0.15},
  {id: 3, name: "18%", value: 0.18},
  {id: 4, name: "20%", value: 0.20},
];



export default function App() {

  const [bill, setBill] = useState(0.00);
  const [tip, setTip] = useState(0);
  const [selectedId, setSelectedId] = useState();

  const staticImage = require("./assets/tip.jpg");


  // Generate Random Bill Amount between $100 - $200
  const randomBillAmount = () => {  
    const randomBill = (Math.floor(Math.random() * 101) + 100);
    setBill(randomBill);
  };

  // Render the FlatList items
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#3CB371":"#FFC300"   ;
    const color = item.id === selectedId ? "white" : "black";
    return (
      <ListItem
        item={item}
        onPress={() => {
          setTip(item.value);
          setSelectedId(item.id)}
        }
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };


  const ListItem = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor }]}
    >
      <Text style={[styles.itemText, { color: textColor }]}>{item.name}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>

      <Text style={styles.title}> Tip Calculator</Text>

      <Button style={styles.button} onPress={randomBillAmount} title="Generate Random Bill"></Button>

      <TextInput
        value={bill > 0 ? bill.toString(): ""}
        placeholder="Enter The Bill Amount"
        style={styles.textInput}
        onChangeText={(bill) => setBill(bill)}
      ></TextInput>

    <Image
        source={staticImage}
        alt="image"
        style={{
        width: 320,
        height: 130,
        borderRadius: 10,
        
       }}
/>

      <SafeAreaView>
      <FlatList
      data={percentageAmount}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center", 
      }}      horizontal
      />
      </SafeAreaView>



    <View style={styles.totalAmount}>

    <Text style={styles.totalAmountText}>Bill Amount: ${bill > 0 ? (bill * 1.0).toFixed(2) : "0.00"}</Text>

    <Text style={styles.totalAmountText}>Tip Amount: ${(bill*tip).toFixed(2)} </Text>

    <View style={styles.divider} />

    <Text style={styles.totalAmountText}>Total: ${(bill * (1 + tip)).toFixed(2)}</Text>

  </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "stretch",
    justifyContent: "top",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 32,
    marginVertical: 50,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textShadowColor: '#aaa'
  },
  
  button: {
    width: 50,
    backgroundColor: "blue",
    color: "white", 
    marginBottom: 20,
  },
  textInput: {
    marginTop:20,
    marginBottom: 30,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    fontSize: 16,
    backgroundColor: "#e5e4e2",
    borderRadius: 7,
  },
  image: {
    width: 320,
    height: 130,
    borderRadius: 10,
    elevation: 5,
  },
  item: {
    width: 55,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  
    elevation: 5,
  },
  
  itemText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: 'center',
  },
  totalAmount:{
      marginTop:50,
      justifyContent: "flex-end",
      alignItems:"flex-end",
  },
  totalAmountText: {
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: "black",
    width: "100%",
    marginVertical: 10,
  },
});