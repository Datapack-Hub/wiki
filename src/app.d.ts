import 'unplugin-icons/types/svelte'

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	export type Post = {
		title: string
		content: string, 
		url: string,
		tags: string[],
		versions: string
	}
}

export {};
