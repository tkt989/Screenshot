import Adb from '../../../src/main/adb'

describe('adb', () => {
  it('parseDevices', () => {
    let adb = new Adb()
    let text = `List of devices attached
emulator-5555 device`
    let result = adb.parseDevices(text)

    assert.lengthOf(result, 1)
    assert.equal(result[0], 'emulator-5555')
  })
})
