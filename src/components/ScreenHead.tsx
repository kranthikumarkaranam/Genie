import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import constants from '../util/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ScreenHeadT = {
  title?: string;
  isBack?: boolean;
  backPress?: () => void;
  isLastScreen?: boolean;
};
const ScreenHead = ({title, isBack, backPress, isLastScreen}: ScreenHeadT) => {
  return (
    <View style={styles.textContainer}>
      {isBack ? (
        <>
          {!isLastScreen ? (
            <>
              <TouchableNativeFeedback onPress={backPress}>
                <View>
                  <Icon
                    name="arrow-back"
                    size={26}
                    color={constants.PrimaryColor}
                  />
                </View>
              </TouchableNativeFeedback>
              <Text style={[styles.text, {marginLeft: 10}]}>
                {isLastScreen ? 'Back' : title}
              </Text>
            </>
          ) : (
            <>
              <TouchableNativeFeedback onPress={backPress}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Icon
                    name="arrow-back-ios"
                    size={24}
                    color={constants.PrimaryColor}
                  />
                  <Text style={[styles.text, {marginLeft: -5}]}>Back</Text>
                </View>
              </TouchableNativeFeedback>
            </>
          )}
        </>
      ) : (
        <Text style={[styles.text, {marginLeft: 10}]}>{title}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    // backgroundColor: 'pink',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    color: constants.PrimaryColor,
    fontWeight: '600',
    fontSize: 18,
  },
});

export default ScreenHead;
