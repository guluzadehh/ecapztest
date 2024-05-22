import { createHmac } from "crypto"

export function createSignature(request, keyHex) {
    const hmacData = Object.values(request).sort().join('|')
    const hmacKey = Buffer.from(keyHex, 'hex')
    const hmacObj = createHmac('sha256', hmacKey)
    hmacObj.update(hmacData)
    return hmacObj.digest('hex')
  }

export const delay = (ms = 1000) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}