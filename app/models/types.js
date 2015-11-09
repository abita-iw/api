export const INT ='INT';
export const DATE ='DATE';
export const REQUIRED ='REQUIRED';
export const OPTIONAL ='OPTIONAL';
export const ALPHA ='ALPHA';
export const EMAIL ='EMAIL';
export const NUMERIC ='NUMERIC';
export const LENGTH = 'LENGTH';
export const NOTNULL = 'NOTNULL';

export const int = {
  name: INT
}
export const date = {
  name: DATE
}
export const required = {
  name: REQUIRED
}
export const optional = {
  name: OPTIONAL
}
export const alpha = {
  name: ALPHA
}
export const email = {
  name: EMAIL
}
export const numeric = {
  name: NUMERIC
}
export const notnull = {
  name: NOTNULL
}
export function length(min, max) {
  return {
    name: LENGTH,
    options: [min, max]
  }
}
