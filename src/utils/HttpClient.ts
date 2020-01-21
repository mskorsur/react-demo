export class HttpClient {
    static async get(url: string) {
        const response = await fetch(url, { method: 'GET' });
        return await response.json();
    }

    static async delete(url: string) {
        const response = await fetch(url, {method: 'DELETE'});
        return await response.json();
    }

    static async put(url: string, obj: any) {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        });
        return await response.json();
    }
}