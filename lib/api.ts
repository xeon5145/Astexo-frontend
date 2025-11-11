export const api = {

    async post<T>(endpoint: string, data: any): Promise<T> {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong');
        }

        return res.json();
    },

    async get<T>(endpoint: string, token?: string): Promise<T> {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
            method: 'GET',
            headers: token ? {
                Authorization: `Bearer ${token}`
            } : {},
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong');
        }

        return res.json();
    },
};