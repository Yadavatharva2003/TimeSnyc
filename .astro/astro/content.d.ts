declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"posts": {
"5-tips-for-time-management.md": {
	id: "5-tips-for-time-management.md";
  slug: "5-tips-for-time-management";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"avoid-meeting-fatigue.md": {
	id: "avoid-meeting-fatigue.md";
  slug: "avoid-meeting-fatigue";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"best-time-management-apps-2025.md": {
	id: "best-time-management-apps-2025.md";
  slug: "best-time-management-apps-2025";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"calendar-hacks.md": {
	id: "calendar-hacks.md";
  slug: "calendar-hacks";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"countdown-uses.md": {
	id: "countdown-uses.md";
  slug: "countdown-uses";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"how-to-manage-timezones.md": {
	id: "how-to-manage-timezones.md";
  slug: "how-to-manage-timezones";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"productivity-sprints.md": {
	id: "productivity-sprints.md";
  slug: "productivity-sprints";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"psychology-of-punctuality.md": {
	id: "psychology-of-punctuality.md";
  slug: "psychology-of-punctuality";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"remote-meeting-etiquette.md": {
	id: "remote-meeting-etiquette.md";
  slug: "remote-meeting-etiquette";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"scheduling-with-us-clients.md": {
	id: "scheduling-with-us-clients.md";
  slug: "scheduling-with-us-clients";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"timezone-conversion-guide.md": {
	id: "timezone-conversion-guide.md";
  slug: "timezone-conversion-guide";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"timezone-ux-tips.md": {
	id: "timezone-ux-tips.md";
  slug: "timezone-ux-tips";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
