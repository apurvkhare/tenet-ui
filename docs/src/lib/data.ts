// Build-time access to the normalized repo data written by scripts/generate-pages.mjs.
import catalog from '../generated/components.json';
import tokensJson from '../generated/tokens.json';
import deprecationsJson from '../generated/deprecations.json';
import meta from '../generated/meta.json';

export interface PropDoc {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  description?: string;
  typeRef?: string;
  deprecated?: string | boolean;
}
export interface SubcomponentDoc {
  id: string;
  name: string;
  kind?: string;
  description?: string;
  deprecated?: string | boolean;
  props?: PropDoc[];
}
export interface RelatedType {
  name: string;
  description?: string;
  members?: PropDoc[];
}
export interface StoryRef {
  id: string;
  name: string;
  exportName: string;
}
export interface ComponentDoc {
  id: string;
  name: string;
  status?: string;
  a11yReviewed?: boolean;
  importPath?: string;
  source?: string;
  types?: string;
  guidelines?: string | null;
  extends?: string[];
  props?: PropDoc[];
  subcomponents?: SubcomponentDoc[];
  relatedTypes?: RelatedType[];
  stories?: StoryRef[];
  related?: string[];
  deprecated?: string | boolean;
  description?: string;
}
export interface Deprecation {
  kind: 'component' | 'prop' | string;
  component: string;
  prop?: string;
  replacement?: string;
  message?: string;
  since?: string;
}
export interface Token {
  name: string;
  cssVar: string;
  type: string;
  path?: string[];
  description?: string;
  value?: unknown;
  themed?: boolean;
  light?: unknown;
  dark?: unknown;
  contrast?: unknown;
}

const components = (catalog as { components?: Record<string, ComponentDoc> }).components ?? {};

export const componentList: ComponentDoc[] = Object.values(components).sort((a, b) => a.name.localeCompare(b.name));
export const getComponent = (id: string): ComponentDoc | undefined => components[id];
export const tokens = tokensJson as Token[];
export const deprecations: Deprecation[] = (deprecationsJson as { deprecations?: Deprecation[] }).deprecations ?? [];
export const siteMeta = meta as {
  package: string;
  version: string;
  storybookUrl: string;
  repoUrl: string;
  buildDate: string;
  catalogVersion: string;
};

/** Deprecation registry entry for a prop (or a component when prop is omitted). */
export function findDeprecation(componentName: string, prop?: string): Deprecation | undefined {
  return deprecations.find((d) => d.component === componentName && (prop ? d.prop === prop : d.kind === 'component' && !d.prop));
}

/** Replacement named in a `@deprecated` message: first backticked identifier. */
export function replacementFromMessage(msg: string | boolean | undefined): string | undefined {
  if (typeof msg !== 'string') return undefined;
  return msg.match(/`([^`]+)`/)?.[1];
}

export const tokenGroup = (t: Token): string => (Array.isArray(t.path) && t.path[0]) || t.name.split(/[-.]/)[0]!;

export const isColorValue = (v: unknown): v is string =>
  typeof v === 'string' && /^(#|rgb|hsl|oklch|color\()/i.test(v.trim());

export const storyUrl = (storyId: string) => `${siteMeta.storybookUrl}/?path=/story/${storyId}`;
