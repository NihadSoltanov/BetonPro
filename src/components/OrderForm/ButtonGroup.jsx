import { Text, Pressable } from "react-native";
import React from "react";
import styles from "./OrderForm.styles";

const ButtonGroup = ({
    onPress = () => null,
    selectedIndex = null,
    title,
    isSelected,
    selectedbuttonStyle,
    onPressIn
}) => {
 
  return (
    
    <Pressable
      onPressIn={onPressIn}
      onPress={()=>onPress(selectedIndex)}
      style={[styles.laGroupButton, isSelected && selectedbuttonStyle]}
    >
      <Text style={styles.laGroupButtonText}>{title}</Text>
    </Pressable>
  );
};
export {ButtonGroup}