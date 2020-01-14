export class HttpClient {
    static async get(url: string) {
        const response = await fetch(url, { method: 'GET' });
        return await response.json();
    }
}