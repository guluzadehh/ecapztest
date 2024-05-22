import { createSignature } from "./helpers.js"
import axios from "axios"
import "dotenv/config"

const API_SECRET_KEY = process.env.API_SECRET_KEY

const api = axios.create({
    baseURL: "https://api.staging.megagatepay.com",
    headers: {
        "Content-Type": "application/json charset=UTF-8"
    }
})

export async function getCardToken(data)
{
    const res = await api
        .post(
            "/dev/card/getToken", 
            {...data}
        )

    return res.data
}

export async function cardProcess(data)
{
    const signature = createSignature(data, API_SECRET_KEY)

    const res = await api
        .post(
            "/dev/card/process",
            {...data, signature}
        )

    return res.data
}

export async function getTransactionStatus(data)
{
    const signature = createSignature(data, API_SECRET_KEY)

    const res = await api
        .post(
            "/dev/transaction/status",
            {...data, signature}
        )

    return res.data
}