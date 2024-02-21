import {ActivityIndicator} from 'react-native-paper';
import constants from '../util/constants';
import {Text, View} from 'react-native';

const LoadingIndicator = ({
  size,
  paddingHorizontal,
}: {
  size?: number | 'small' | 'large';
  paddingHorizontal: number;
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
        paddingHorizontal: paddingHorizontal,
      }}>
      <ActivityIndicator
        animating={true}
        color={constants.PrimaryColor}
        size={size}
        style={{flex: 1}}
      />
      <Text
        style={{color: constants.PrimaryColor, fontSize: 20, marginBottom: 4}}>
        Loading...
      </Text>
    </View>
  );
};

export default LoadingIndicator;
