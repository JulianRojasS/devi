import { writable } from 'svelte/store';

export const alerts = writable<{ id: string; type: 'success' | 'error'; message: string }[]>([]);

export const addAlert = (type: 'success' | 'error', message: string) => {
  alerts.update(alerts => [...alerts, { id: crypto.randomUUID(), type, message }]);
};