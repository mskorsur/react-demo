
export function store<T>(key: string, users: T[]): void {
    window.sessionStorage.setItem(key, JSON.stringify(users));
}

export function fetch<T>(key: string): T[] {
    let data: T[] = [];

    const cachedData: (string | null) = window.sessionStorage.getItem(key);
    if (cachedData) {
        data = JSON.parse(cachedData);
    }

    return data;
}

