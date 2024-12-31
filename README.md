# Expo Camera takePictureAsync Silent Failure

This repository demonstrates a subtle bug in Expo's Camera API where `takePictureAsync` can silently fail if called before the camera has finished loading. The promise resolves to `undefined`, making it challenging to debug.

## Reproducing the Issue

The `bug.js` file contains code that attempts to take a picture immediately after the camera component mounts. This leads to the silent failure.  The solution is presented in `bugSolution.js`.

## Solution

The solution involves using the `cameraRef` and its `getStatusAsync` method to ensure the camera is ready before attempting to capture an image. This method returns a status object including a `isRecording` and `isTakingPhoto` flag.