export class HttpClient {
    static get(url: string): Promise<any> {
       return fetch(url, { method: 'GET' })
        .then(response => response.json())
        .catch(error => {throw new Error(error)});
    }
}