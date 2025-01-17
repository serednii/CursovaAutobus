export default function handleError(error: any, message: string) {
  console.error(`${message}:`, error);
  throw new Error(`${message}: ${error.message || error}`);
}
