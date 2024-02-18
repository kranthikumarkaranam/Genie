import React, {useState} from 'react';
import {
  View,
  TouchableNativeFeedback,
  StyleProp,
  ViewStyle,
  Image,
} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
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
          <Image
            style={{width: 160, height: 160, borderRadius: 80}}
            source={{
              uri: selectedImage,
            }}
          />
        ) : (
          <Image
            style={{width: 160, height: 160, borderRadius: 80}}
            source={constants.AvatarPlaceholder}
          />
        )}
      </TouchableNativeFeedback>
    </View>
  );
};

export default Avatar;
