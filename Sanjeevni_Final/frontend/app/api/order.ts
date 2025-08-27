import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

let orders: any[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { pharmacyName, medicineName, userPhone } = req.body
    if (!pharmacyName || !medicineName || !userPhone) {
      return res.status(400).json({ error: "Missing required fields" })
    }
    try {
      // Replace with your actual external website API endpoint
      const externalApiUrl = "https://your-pharmacy-website.com/api/check-stock"
      const response = await axios.post(externalApiUrl, {
        pharmacyName,
        medicineName,
        userPhone
      })
      if (response.data && response.data.status === "complete") {
        const order = {
          id: Date.now(),
          pharmacyName,
          medicineName,
          userPhone,
          receivedAt: new Date().toISOString(),
          status: "Order Complete"
        }
        orders.push(order)
        return res.status(201).json({ message: "Order Complete", order })
      } else {
        return res.status(200).json({ message: "Stock Ended" })
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to connect to pharmacy website" })
    }
  }
  if (req.method === "GET") {
    return res.status(200).json({ orders })
  }
  return res.status(405).json({ error: "Method not allowed" })
}