import api from "./api.js";

export default class Todos {
    static async create(description) {
        try {
            const response = await api('/todo', { method: 'POST', body: JSON.stringify({ description: description }) });
            return response;
        } catch (e) {
            return null;
        }
    }

    static async get(id) {
        const response = await api('/todo/' + id, { method: 'GET' });
        return response.data;
    }

    static async getAll() {
        let response;
        let retries = 0;
        const maxRetries = 3;
        const retryDelay = 1000; // in milliseconds
        while (retries < maxRetries) {
            try {
                response = await api('/todo');
                console.log(response);
                return response.data;
            } catch (e) {
                console.log(e);
                retries++;
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
        }
        throw new Error('Ошибка');
    }

    static async update(id, completed) {
        try {
            const response = await api('/todo/' + id, { method: 'PUT', body: JSON.stringify({ completed: completed }) });
            return response;
        } catch (e) {
            return null;
        }

    }

    static async delete(id) {
        try {
            return await api('/todo/' + id, { method: 'DELETE' });;
        } catch (e) {
            // такая же логика как и в getAll
            return Todos.delete(id);
        }
    }
}