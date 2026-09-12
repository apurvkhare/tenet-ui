// Runtime deprecation warnings — dev only, once per key, silent in production builds.
// Pair every warning with an `@deprecated` JSDoc tag on the type; the catalog build turns those
// tags into generated/deprecations.json, which eslint-plugin-tenet-ui and the MCP server read.

const warned = new Set<string>();

const isDev = (): boolean => {
  const nodeEnv = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV;
  return nodeEnv !== 'production';
};

/** Warn once (per key) in development. */
export function warnDeprecated(key: string, message: string): void {
  if (!isDev() || warned.has(key)) return;
  warned.add(key);
  // eslint-disable-next-line no-console
  console.warn(`tenet-ui: ${message}`);
}

/**
 * Resolve the 0.4.0 `block` → `fullWidth` rename. `fullWidth` wins when both are passed;
 * `block` keeps working (with a one-time dev warning) until 0.5.0.
 */
export function resolveFullWidth(component: string, fullWidth: boolean | undefined, block: boolean | undefined): boolean {
  if (block !== undefined) {
    warnDeprecated(`${component}.block`, `<${component} block> is deprecated since 0.4.0 — use <${component} fullWidth> instead. \`block\` will be removed in 0.5.0.`);
  }
  return fullWidth ?? block ?? false;
}
