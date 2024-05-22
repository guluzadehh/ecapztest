import { createHmac } from "crypto"

export function createSignatureFromObject(request, keyHex) {
  return createSignature(Object.values(request), keyHex);
}

export function createSignature(values, keyHex) {
    const hmacData = values.sort().join('|')
    const hmacKey = Buffer.from(keyHex, 'hex')
    const hmacObj = createHmac('sha256', hmacKey)
    hmacObj.update(hmacData)
    return hmacObj.digest('hex')
  }

export const delay = (ms = 1000) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}