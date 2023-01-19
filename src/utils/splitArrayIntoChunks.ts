export const splitArrayIntoChunks = <T>(arr: T[], chunkSize: number): T[][] => {
  const arrayCopy = [...arr];
  const chunks = [];
  while (arrayCopy.length > 0) {
    chunks.push(arrayCopy.splice(0, chunkSize));
  }
  return chunks;
};
