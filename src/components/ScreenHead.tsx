import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import constants from '../util/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from './CustomButton';

type ScreenHeadT = {
  title?: string;
  isBack?: boolean;
  backPress?: () => void;
  isLastScreen?: boolean;
  isButton?: boolean;
  onPress?: () => void;
};
const ScreenHead = ({
  title,
  isBack,
  backPress,
  isLastScreen,
  isButton,
  onPress,
}: ScreenHeadT) => {
  return (
    <View style={styles.container}>
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
      {isButton && (
        <CustomButton
          title="Clear All"
          onPress={onPress ? onPress : () => {}}
          containerStyle={styles.clearAll}
          textStyle={{color: 'red'}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'white',
  },
  textContainer: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
  },

  text: {
    color: constants.PrimaryColor,
    fontWeight: '600',
    fontSize: 18,
  },
  clearAll: {
    paddingVertical: 7,
    maxWidth: '40%',
    marginRight: 5,
    borderRadius: 6,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    height: 40,
    marginTop: 6,
  },
});

export default ScreenHead;
