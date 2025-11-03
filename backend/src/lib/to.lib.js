/**
 * Function to handle error in a go-like style
 * @param {Promise} promise - The promise to be resolved
 * @returns {Promise<[Error | null, any | null]>} - A tuple with error and result
 */
async function to(promise) {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), null];
  }
}

export { to };
