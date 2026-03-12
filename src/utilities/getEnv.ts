export function getEnv(name: string) {
  const val = import.meta.env[name];
  if (!val) {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }
  return val;
}
