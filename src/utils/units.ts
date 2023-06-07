export const prettyPrintBytes = (size: number): string => {
  const units = ['bytes', 'KB', 'MB'];
  let s = size;
  for (const unit of units) {
    if (s < 1000) {
      return s.toFixed(1) + unit;
    }
    s /= 1000;
  }
  return s.toFixed(1) + 'GB';
};
