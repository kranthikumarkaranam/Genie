import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {TouchableNativeFeedback} from 'react-native';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface SearchBarT {
  value: string;
  onChangeText: (text: string) => void;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}
const SearchBar = ({value, onChangeText, onPress, style}: SearchBarT) => {
  return (
    <View style={[styles.wrapperContainer, style]}>
      <View style={styles.container}>
        {/* <Text style={styles.icon}>SEARCH-ICON</Text> */}
        <TextInput
          placeholder="search"
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#959595"
        />
        <TouchableNativeFeedback onPress={onPress}>
          <Text style={styles.icon}>SEARCH-ICON</Text>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperContainer: {
    height: 60,
    width: '100%',
    // backgroundColor: 'black',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E5E4E2',
    paddingHorizontal: 20,
    borderWidth: 0.4,
    borderRadius: 8,
    borderColor: '#708090',
    elevation: 2,
  },
  input: {
    width: '85%',
    fontSize: 19,
    color: '#333333',
  },
  icon: {
    width: 40,
    height: 18,
    textAlign: 'center',
  },
});

export default SearchBar;
