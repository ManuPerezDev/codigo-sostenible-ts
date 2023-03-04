type SubscribeCallback = (event: SensorEvent) => void
enum Signals {
  START_MOVEMENT = 'startMovement',
  STOP_MOVEMENT = 'stopMovement'

}

interface Sensor {
  subscribe: (fn: SubscribeCallback) => void

  notify(signal: Signals): void;
}

interface VideoRecorder {
  start: () => void
}

interface SensorEvent {
  signal: Signals
}

class Orchestrator {
  constructor(private sensor: Sensor, private videoRecorder: VideoRecorder) {
  }

  run() {
    this.sensor.subscribe((event: SensorEvent) => {
      if (event.signal === Signals.START_MOVEMENT){
        this.videoRecorder.start()
      }
    })
  }
}


describe('Video Recorder', () => {
  it('start video recording when movement is detected', () => {
    let sensorDouble = new SensorDouble();
    let videoRecorderDouble = new VideoRecorderDouble();
    const orchestrator = new Orchestrator(
      sensorDouble,
      videoRecorderDouble
    )

    orchestrator.run()
    sensorDouble.notify(Signals.START_MOVEMENT)

    videoRecorderDouble.expect_file_to_have_been_created();
  });

  it('start video recording when movement is detected with jest mocks', async () => {
    let fakeSensor = new SensorDouble();
    let fakeVideoRecorder = {start: jest.fn()};
    const orchestrator = new Orchestrator(
      fakeSensor,
      fakeVideoRecorder
    )

    await orchestrator.run()
    fakeSensor.notify(Signals.START_MOVEMENT)

    expect(fakeVideoRecorder.start).toHaveBeenCalled()
  });
});

class SensorDouble implements Sensor{
  private subscribers: SubscribeCallback[] = []
  subscribe(fn: SubscribeCallback): void {
    this.subscribers.push(fn)
  }

  notify(signal: Signals): void {
    this.subscribers.forEach(callback => callback({ signal }))
  }

}

class VideoRecorderDouble implements VideoRecorder {
  startedRecording: boolean = false

  start() {
    this.startedRecording = true
  }

  expect_file_to_have_been_created() {
    expect(this.startedRecording).toBeTruthy()
  }
}
