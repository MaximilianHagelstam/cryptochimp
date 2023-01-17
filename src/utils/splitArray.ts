export const splitArray = <T>(arr: T[], chunkSize: number): T[][] => {
  const arrCopy = [...arr];
  const chunks = [];
  while (arrCopy.length > 0) {
    chunks.push(arrCopy.splice(0, chunkSize));
  }
  return chunks;
};
