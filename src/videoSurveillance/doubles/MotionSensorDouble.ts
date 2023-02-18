import {MotionSensor} from "../src/MotionSensor";

export class MotionSensorDouble implements MotionSensor {
  private onDetectingMotion: boolean

  constructor(params?: { onDetectingMotion?: boolean }) {
    this.onDetectingMotion = params.onDetectingMotion
  }

  isDetectingMotion(): boolean {
    return this.onDetectingMotion
  }
}
