import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import constants from '../util/constants';
interface PaginationT {
  activeDotIndex: number;
  dotsLength: number;
  handleDotPress: (index: number) => void;
}
const Pagination = ({
  activeDotIndex,
  dotsLength,
  handleDotPress,
}: PaginationT) => {
  const renderDots = () => {
    const dots = [];

    for (let i = 0; i < dotsLength; i++) {
      dots.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleDotPress(i)}
          style={[
            styles.dot,
            activeDotIndex === i ? styles.activeDot : styles.inactiveDot,
          ]}
        />,
      );
    }
    return dots;
  };

  return <View style={styles.container}>{renderDots()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: constants.PrimaryColor,
  },
  inactiveDot: {
    backgroundColor: '#d8d8d6',
  },
});

export default Pagination;
