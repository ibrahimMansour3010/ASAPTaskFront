export function getEnumKeyByEnumValue<T extends {[index: string]: string | number}>(myEnum: T, enumValue: number): string {
  return Object.keys(myEnum).find(key => myEnum[key] === enumValue) || '';
}
