import {ActivityIndicator} from 'react-native-paper';
import constants from '../util/constants';

const LoadingIndicator = () => {
  return (
    <ActivityIndicator
      animating={true}
      color={constants.PrimaryColor}
      size={75}
      style={{flex: 1}}
    />
  );
};

export default LoadingIndicator;
