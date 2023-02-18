import { MotionSensor } from "./MotionSensor";
import { VideoRecorder } from "./VideoRecorder";

export class VideoSurveillance {
  constructor(
    private motionSensor: MotionSensor,
    private videoRecorder: VideoRecorder
  ) {
  }

  async run(numberOfCalls: number = 1) {
    try {
      for (let i = 0; i < numberOfCalls; i++) {
        if (this.motionSensor.isDetectingMotion()) {
          this.videoRecorder.startRecording()
        }

        this.videoRecorder.stopRecording()
        await this.delay(1000)
      }
    } catch (error) {
      this.videoRecorder.stopRecording()
    }
  }

  private delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
