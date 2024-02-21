import React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type CustomInputT = {
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  value: string;
  keyboardType?: KeyboardTypeOptions;
  isEye?: boolean;
  isPasswordVisible?: boolean;
  eyePress?: () => void;
  whichEye?: string;
};
const CustomInput = ({
  placeholder,
  secureTextEntry,
  keyboardType,
  value,
  onChangeText,
  isEye,
  whichEye,
  eyePress,
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
      {isEye && (
        <TouchableNativeFeedback onPress={eyePress}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={whichEye ? whichEye : ''}
              color={'grey'}
              size={28}
            />
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    width: '82%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    color: '#333333',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});
export default CustomInput;
