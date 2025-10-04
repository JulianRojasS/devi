// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface result<T> {
		success: boolean;
		statusCode: number;
		data?: T;
		error?: string | object;
		model: string;
		date: string;
		'ip-access': string;
		count?: number;
	}
	interface User {
		id: string;
		name: string;
		email: string;
		password: string;
		createdAt: Date;
		updatedAt: Date;
		verified: boolean;
		status: 'active' | 'inactive' | 'banned';
		roles: string[];
		token?: string | null;
		accessToken?: string;
		refreshToken?: string;
		profilePictureUrl?: string;
		lastLogin?: Date;
		bio?: string;
		location?: string;
		website?: string;
		githubUrl?: string;
		linkedinUrl?: string;
	}
	interface Apps {
		id: string;
		name: string;
		description: string;
		logoUrl: string;
		createdAt: string;
		updatedAt: string;
		websiteUrl: string;
		status: 'active' | 'inactive' | 'pending';
		githubUrl: string;
		userId: string;
		user: User;
	}
	interface Otps {
		id: string;
		secret: string;
		name: string;
		createdAt: string;
		updatedAt: string;
		userId: string;
	}
}

export {};
