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
		status: 'completed' | 'incomplete' | 'pending';
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
		appId: string;
		app: Apps;
	}
	interface Stages {
		id: string;
		name: string;
		description: string;
		createdAt: string;
		updatedAt: string;
		appId: string;
		creatorId: string;
		status: 'completed' | 'incomplete' | 'pending';
		expectedCompletionDate: string;
		completionDate: string;
		userId: string;
		user: User;
		creator: User;
		app: Apps;
		currentTaskId?: string;
		currentTask?: Task;
		progress?: number;
	}
	interface Tasks {
		id: string;
		name: string;
		description: string;
		createdAt: string;
		updatedAt: string;
		stageId: string;
		stage: Stages;
		creatorId: string;
		creator: User;
		userId: string;
		user: User;
		status: 'completed' | 'incomplete' | 'pending';
		startDate?: string;
		endDate?: string;
	}
	interface Docker {
		id: string;
		name: string;
		host: string;
		port: number;
		active: boolean;
		createdAt: string;
	}
	interface Container {
		Id: string;
		Names: string[];
		Image: string;
		ImageID: string;
		Command: string;
		Created: number;
		State: string;
		Status: string;
		Ports: {
			PrivatePort: number;
			PublicPort: number;
			Type: string;
		}[];
		Labels: Record<string, string>;
		NetworkSettings: {
			Networks: Record<string, {
				IPAMConfig: Record<string, string>;
				Links: string[];
				Aliases: string[];
				NetworkID: string;
			}>;
		};
		Mounts: {
			Source: string;
			Destination: string;
			Mode: string;
			RW: boolean;
		}[];
	}
}

export {};
