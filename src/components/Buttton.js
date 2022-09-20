import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import style from '../styles.json'
export default function Button({ onPress, title = 'Save', size = "large" ,color="primaryColor"}) {
  return (
    <Pressable style={{ ...styles.basic, ...styles[size] , backgroundColor: style[color],}} onPress={onPress}>
      <Text style={{ ...styles.basic_text, ...styles.text[size] }}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  basic: {
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  large: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    maxWidth: 368,
    width: '90%',
    height: 68,
    borderRadius: 15,
  },

  small: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    maxWidth: 100,
    width: '90%',
    height: 30,
    borderRadius: 10,
  },
  //  text start 
  basic_text: {
    textAlign: "center",
    color: "#FFFFFF"
  },
  text: {
    large: {
      fontWeight: '500',
      fontSize: 24,
      lineHeight: 29,
    },
    small: {
      fontWeight: '500',
      fontSize: 16,
      textAlign: "center",
      color: "#FFFFFF"
    }
  },


});
