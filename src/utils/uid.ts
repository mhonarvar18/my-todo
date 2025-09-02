export function uid(): string {
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const buf = new Uint32Array(2);
    window.crypto.getRandomValues(buf);
    return Array.from(buf).map(n => n.toString(36)).join("").slice(0, 12);
  }
  return Math.random().toString(36).slice(2, 14);
}
