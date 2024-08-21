export const slugify = (str: string): string => {
  return str
    .normalize('NFD') // Normalize to decompose combined characters (e.g., é -> e + ´)
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};
