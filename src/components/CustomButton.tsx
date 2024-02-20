import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import constants from '../util/constants';

interface CustomButtonT {
  onPress: () => void;
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
const CustomButton = ({
  title,
  onPress,
  containerStyle,
  textStyle,
}: CustomButtonT) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, containerStyle]}>
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </>
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
