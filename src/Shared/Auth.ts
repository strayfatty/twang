export class Auth {
    static isAuthenticated(): boolean  {
        return !!Auth.access_token();
    }

    static clear() {
        Auth.access_token(null);
    }

    static access_token(value?: string): string {
        return store('access_token', value);
    }
}

function store(key: string, value: string): string {
    if (value) {
        window.localStorage.setItem(key, value);
    } if (value === null) {
        window.localStorage.removeItem(key);
    }

    return window.localStorage.getItem(key);
}