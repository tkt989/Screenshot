import adbkit from 'adbkit'
import fs from 'fs'
import tmp from 'tmp'

const client = adbkit.createClient()

export default class Adb {
  adb = `${__static}/mac/adb`
  /** @type {RegExp} */

  /**
   * adb devices
   */
  devices() {
    return client.listDevices().then(devices => {
      return devices.map(dev => dev.id)
    })
  }

  /**
   * adb screencap
   *
   * @param {String} id
   * @returns {Promise}
   */
  screencap(id) {
    return client.screencap(id)
  }

  screencapFile(id) {
    let screencapFile = tmp.fileSync().name
    return new Promise((resolve, reject) => {
      this.screencap(id).then(stream => {
        let dest = fs.createWriteStream(screencapFile, 'utf8')
        stream.on('finish', () => {
          resolve(screencapFile)
        })
        stream.pipe(dest)
      })
    })
  }

  /**
   *
   * @param {String} text
   */
  parseDevices(text) {
    let devicesRegex = /^([^\s]+)\s+[^\s]+$/
    let result = []

    text.split('\n').forEach(line => {
      let m = devicesRegex.exec(line)
      if (m == null) return
      result.push(m[1])
    })
    return result
  }
}
