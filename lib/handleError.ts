export default function handleError(error: unknown, message: string): never {
  console.error(`${message}:`, error);

  if (error instanceof Error) {
    throw new Error(`${message}: ${error.message}`, { cause: error });
  }

  throw new Error(`${message}: ${String(error)}`);
}
