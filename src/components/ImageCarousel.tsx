import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Text,
} from 'react-native';
import Pagination from './Pagination';

const {width: windowWidth} = Dimensions.get('window');

const ImageCarousel = ({images}: {images: string[] | undefined}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / windowWidth);
    setActiveIndex(index);
  };

  const handleDotPress = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: index * windowWidth, animated: true});
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {images.length > 1 ? (
        <>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled // When true, the scroll view stops on multiples of the scroll view's size when scrolling. This can be used for horizontal pagination.
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}>
            {images.map((image, index) => (
              <Image key={index} source={{uri: image}} style={styles.image} />
            ))}
          </ScrollView>
          <Pagination
            activeDotIndex={activeIndex}
            dotsLength={images.length}
            handleDotPress={handleDotPress}
          />
        </>
      ) : (
        <Image source={{uri: images[0]}} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: '100%',
    // backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: windowWidth,
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ImageCarousel;
