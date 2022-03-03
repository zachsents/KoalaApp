
const API_URL = 'https://us-central1-koala-343009.cloudfunctions.net/measurement-api/syncData'

export default function useDatabase() {
    return async (item) => {
        const payload = item.map ? item : [item]
        console.log(JSON.stringify(payload))
        const res = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await res.text()
    }
}
