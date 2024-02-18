import React from 'react';
import {KeyboardTypeOptions, StyleSheet, TextInput, View} from 'react-native';

type CustomInputT = {
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  value: string;
  keyboardType?: KeyboardTypeOptions;
};
const CustomInput = ({
  placeholder,
  secureTextEntry,
  keyboardType,
  value,
  onChangeText,
}: CustomInputT) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor="#959595"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    color: '#333333',
  },
});
export default CustomInput;
