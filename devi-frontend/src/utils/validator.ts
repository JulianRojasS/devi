/**
 * Función que valida la respuesta de la API y maneja alertas automáticamente
 * @param data - Respuesta de la API con formato result<T>
 * @returns Los datos si es exitoso, null si hay error
 */
import { addAlert } from '$lib/stores/alerts';
export default function validator<T>(data: result<T | undefined>, successMessage?: string): T | undefined | null {
	// Si el statusCode es 200 y success es true, retornar los datos
	console.log(data);
	if (data.statusCode === 200 && data.success || data.statusCode === 201 && data.success) {
		if (successMessage) {
			addAlert('success', successMessage);
		}
		return data.data;
	}

	// Manejo de errores comunes con alertas
	let alertMessage = '';

	switch (data.statusCode) {
		case 400:
			alertMessage = `Error de solicitud: ${data.error || 'Datos inválidos'}`;
			break;
		case 401:
			alertMessage = `Error de autenticación: ${data.error || 'No autorizado'}`;
			break;
		case 403:
			alertMessage = `Error de permisos: ${data.error || 'Acceso denegado'}`;
			break;
		case 404:
			alertMessage = `Error: ${data.error || 'Recurso no encontrado'}`;
			break;
		case 500:
			alertMessage = `Error del servidor: ${data.error || 'Error interno del servidor'}`;
			break;
		default:
			alertMessage = `Error ${data.statusCode}: ${data.error || 'Error desconocido'}`;
	}

	// Mostrar alerta con el error
	addAlert('error', alertMessage);
	
	return null;
}