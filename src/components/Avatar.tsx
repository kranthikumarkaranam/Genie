import React, {useState} from 'react';
import {
  View,
  TouchableNativeFeedback,
  StyleProp,
  ViewStyle,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import constants from '../util/constants';
import {useAppSelector} from '../store/pre-Typed';

type AvatarT = {
  name?: string;
  style?: StyleProp<ViewStyle>;
  onImageSelected: (imageUri: string | null) => void;
};

const Avatar = ({style, onImageSelected}: AvatarT) => {
  const storedImage = useAppSelector(state => state.MyUser.image);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    storedImage,
  );

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.errorCode) {
        console.log('ImagePicker Error Code: ', response.errorCode);
      } else {
        let imageUri = response.assets?.[0]?.uri || null;
        setSelectedImage(imageUri);
        onImageSelected(imageUri);
      }
    });
  };

  return (
    <View style={style}>
      <TouchableNativeFeedback onPress={openImagePicker}>
        {selectedImage ? (
          <View>
            <Image
              style={{width: 160, height: 160, borderRadius: 80}}
              source={{
                uri: selectedImage,
              }}
            />
            <Ionicons name={'camera'} color={'grey'} size={14} />
          </View>
        ) : (
          <View style={{position: 'relative'}}>
            <Image
              style={{width: 160, height: 160, borderRadius: 80}}
              source={constants.AvatarPlaceholder}
            />
            <View
              style={{
                position: 'absolute',
                top: '80%',
                left: '80%',
                transform: [{translateX: -16}, {translateY: -16}],
              }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: 'white',
                  position: 'absolute',
                  paddingLeft: 6,
                  paddingTop: 5,
                  borderRadius: 20,
                }}>
                <Ionicons name={'camera'} color={'grey'} size={28} />
              </View>
            </View>
          </View>
        )}
      </TouchableNativeFeedback>
    </View>
  );
};

export default Avatar;
