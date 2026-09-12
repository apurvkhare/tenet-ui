// True when rendering inside a real Starlight page (Astro.locals.starlightRoute is attached by
// Starlight's route). False inside other render contexts, notably the AstroContainer that
// starlight-llms-txt uses to turn pages into llms*.txt: that container only registers the MDX
// renderer, so React islands must not be emitted there (their static companions carry the content).
export function isStarlightPage(locals: unknown): boolean {
  try {
    return Boolean((locals as { starlightRoute?: unknown } | undefined)?.starlightRoute);
  } catch {
    return false;
  }
}
