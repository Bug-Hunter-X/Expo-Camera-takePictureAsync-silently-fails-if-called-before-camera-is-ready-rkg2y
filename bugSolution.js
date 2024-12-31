The issue is that `takePictureAsync` is called before the camera is fully initialized. Here's the corrected code using the camera ref and `getStatusAsync`:

```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);
  const [photo, setPhoto] = React.useState(null);
  const cameraRef = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const status = await cameraRef.current.getStatusAsync();
      if (status.isRecording || status.isTakingPhoto){
        return;
      }
      const data = await cameraRef.current.takePictureAsync();
      setPhoto(data.uri);
    }
  };

  if (hasPermission === null) {
    return <View />; 
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={{ fontSize: 18 }}>Snap</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {photo && <Image style={{ flex: 1 }} source={{ uri: photo }}/>}
    </View>
  );
};

export default CameraScreen;
```