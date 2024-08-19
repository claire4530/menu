// pages/api/payments.js
import excuteQuery from '@/lib/db'

export default async function handler(req, res) {
    try {
        const [rows] = await excuteQuery.execute('SELECT * FROM areas')
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' })
    }
}
