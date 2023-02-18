import {VideoRecorder} from "../src/VideoRecorder";

export class VideoRecorderDouble implements VideoRecorder {
  readonly stopRecordingSpy = jest.fn()
  readonly startRecordingSpy = jest.fn()

  startRecording(): void {
    this.startRecordingSpy.call(true)
  }

  stopRecording(): void {
    this.stopRecordingSpy.call(true)
  }
}
