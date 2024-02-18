import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import constants from '../util/constants';

interface CustomButtonT {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
}
const CustomButton = ({title, onPress, style}: CustomButtonT) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: constants.PrimaryColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {color: 'white', fontWeight: '500', fontSize: 18},
});
export default CustomButton;
