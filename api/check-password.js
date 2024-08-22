export default function handler(req, res) {
    if (req.method === 'POST') {
        const { password } = req.body;
        const correctPassword = 'macaroninoodles';

        if (password === correctPassword) {
            res.status(200).json({ access: 'granted' });
        } else {
            res.status(403).json({ access: 'denied' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
