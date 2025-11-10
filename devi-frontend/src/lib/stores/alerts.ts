import { writable } from 'svelte/store';
import { v4 } from 'uuid';

export const alerts = writable<{ id: string; type: 'success' | 'error'; message: string }[]>([]);

export const addAlert = (type: 'success' | 'error', message: string) => {
  alerts.update(alerts => [...alerts, { id: v4(), type, message }]);
};