import { readFileSync } from "fs" 
import { cardProcess, getCardToken, getTransactionStatus } from "./api.js"
import { delay } from "./helpers.js"
import "dotenv/config"

async function fetchCardToken(data)
{
    const res = await getCardToken(data)
    return res["id"]
}

async function fetchAcsPaymentId(data)
{
    const res = await cardProcess(data)
    if (!res.success) throw new Error()
    return {
        "acs": res["acs"],
        "payment_id": res["payment_id"] 
    }
}

async function fetchStatus(data) 
{
    const res = await getTransactionStatus(data)
    return res["transaction_status"]
}

async function main() {
    const project = process.env.PROJECT
    const data = JSON.parse(readFileSync("./data.json"))

    const card_token = await fetchCardToken({project, ...data["card_details"]})
    console.log("Card token: ", card_token)
    
    const processData = {
        card_token,
        project,
        ...data["process_details"]   
    }
    
    const processRes = await fetchAcsPaymentId(processData)
    const payment_id = processRes["payment_id"]

    console.log("Payment id: ", payment_id)
    console.log("Acs url: ", processRes["acs"]["url"])
    
    const statusData = {project, payment_id}

    let status = await fetchStatus(statusData)
    console.log(status)

    for (let i = 0; status == "processing" && i != 10; i++) {
        await delay(1000)
        status = await fetchStatus(statusData)
        console.log(status)
    }
}

main()