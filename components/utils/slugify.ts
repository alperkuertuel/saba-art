export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replaceAll('ö', 'oe')
    .replaceAll('ü', 'ue')
    .replaceAll('ä', 'ae')
    .replaceAll('ß', 'ss')
    .replaceAll(/[^\s\w-]/g, '') // remove any characters which are not word characters
    .replaceAll(/[\s_-]+/g, '-') // remove whitespace characters, underscores, hyphens with a single hyphen
    .replaceAll(/^-+|-+$/g, ''); // no hyphens in the beginning or end of the string
}
