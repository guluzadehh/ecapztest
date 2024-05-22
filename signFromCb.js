import { createSignature } from "./helpers.js"
import "dotenv/config"

const data = {
    "success": true,
    "payment_id": "1716384546080_IoLdQmBCspuFRBXEmrDahdvx",
    "order_id": "1233213123213",
    "create_date": "2024-05-22T13:29:06.389Z",
    "result_date": "2024-05-22T13:29:06.389Z",
    "card_pan": "424449******8988",
    "transaction_status": "completed",
    "amount": "4.85",
    "currency": "USD",
    "status_code": null,
    "status_description": null,
    "amount_gross": "5.00",
    "transactions": [],
}

const signature = "8987077a5da8036d40e44e013998e26d714c4934bde9f3904f8e90b3a593bd3d"

const preparedData = Object.values(data)
    .map(i => typeof(i) === "boolean" ? i.toString() : i)
    .filter(i => i != null && i.length > 0)

const alt = createSignature(preparedData, process.env.API_SECRET_KEY)

console.log(alt)
console.log("Signatures are equal: ", signature == alt)