  // Indica al grabador que detenga la grabación cuando el sensor no detecta movimiento.
  // Indica al grabador que comience la grabación cuando el sensor detecta movimiento.
  // Indica al grabador que detenga la grabación cuando el sensor arroja un error inesperado.
  // Comprueba el estado del sensor e movimiento una vez por segundo.

  import { VideoSurveillance } from "./src/VideoSurveillance";
  import { MotionSensorDouble } from "./doubles/MotionSensorDouble";
  import { VideoRecorderDouble } from "./doubles/VideoRecorderDouble";

  describe('videoSurveillance should', () => {
    it('stop recording if sensor does not detect movement', () => {
      const sensorDouble = new MotionSensorDouble({ onDetectingMotion: false });
      const videoRecorderDouble = new VideoRecorderDouble();
      const videoSurveillance = new VideoSurveillance(sensorDouble, videoRecorderDouble);

      videoSurveillance.run()

      expect(videoRecorderDouble.stopRecordingSpy).toHaveBeenCalled()
    });

    it('start recording if sensor detects movement', () => {
      const sensorDouble = new MotionSensorDouble({ onDetectingMotion: true });
      const videoRecorderDouble = new VideoRecorderDouble();
      const videoSurveillance = new VideoSurveillance(sensorDouble, videoRecorderDouble);

      videoSurveillance.run()

      expect(videoRecorderDouble.startRecordingSpy).toHaveBeenCalled()
    });

    it('stop recording if sensor does not work properly', () => {
      const sensorDouble = {
        isDetectingMotion: () => { throw Error() }
      };
      const videoRecorderDouble = new VideoRecorderDouble();
      const videoSurveillance = new VideoSurveillance(sensorDouble, videoRecorderDouble);

      videoSurveillance.run()

      expect(videoRecorderDouble.stopRecordingSpy).toHaveBeenCalled()
    });

    it('check sensor state every one second', async () => {
      const sensorDouble = new MotionSensorDouble({ onDetectingMotion: true });
      const sensorSpy = jest.spyOn(sensorDouble, 'isDetectingMotion');
      const videoRecorderDouble = new VideoRecorderDouble();
      const videoSurveillance = new VideoSurveillance(sensorDouble, videoRecorderDouble);
      const numberOfCalls = 2;

      await videoSurveillance.run(numberOfCalls)

      expect(sensorSpy).toHaveBeenCalledTimes(numberOfCalls)
    });
  });

