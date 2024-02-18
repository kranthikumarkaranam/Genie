import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

export default function CustomCarousel() {
  const data = [
    {title: 'Slide 1', text: 'Text 1'},
    {title: 'Slide 2', text: 'Text 2'},
    {title: 'Slide 3', text: 'Text 3'},
  ];

  const [index, setIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: translateX}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, {dx}) => {
        if (Math.abs(dx) > width / 2) {
          const newIndex = dx > 0 ? index - 1 : index + 1;
          if (newIndex >= 0 && newIndex < data.length) {
            setIndex(newIndex);
            Animated.timing(translateX, {
              toValue: -newIndex * width,
              duration: 300,
              useNativeDriver: true,
            }).start();
          } else {
            Animated.spring(translateX, {
              toValue: -index * width,
              useNativeDriver: true,
            }).start();
          }
        } else {
          Animated.spring(translateX, {
            toValue: -index * width,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.carousel, {transform: [{translateX}]}]}
        {...panResponder.panHandlers}>
        {data.map((item, i) => (
          <View key={i} style={styles.slide}>
            <Text>{item.title}</Text>
            <Text>{item.text}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    width: 'auto',
    height: 100,
  },
  carousel: {
    flexDirection: 'row',
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
