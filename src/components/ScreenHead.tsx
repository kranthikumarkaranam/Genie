import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import constants from '../util/constants';

type ScreenHeadT = {
  title?: string;
  isBack: boolean;
  backPress?: () => void;
};
const ScreenHead = ({title, isBack, backPress}: ScreenHeadT) => {
  return (
    <>
      <View style={styles.textContainer}>
        {isBack && (
          <TouchableNativeFeedback onPress={backPress}>
            <Text style={styles.icon}>BACK</Text>
          </TouchableNativeFeedback>
        )}
        <Text style={styles.text}>{title}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    color: constants.PrimaryColor,
    fontWeight: '600',
    fontSize: 18,
  },
  icon: {
    color: constants.PrimaryColor,
    fontWeight: '600',
    fontSize: 18,
    marginRight: 10,
  },
});

export default ScreenHead;
