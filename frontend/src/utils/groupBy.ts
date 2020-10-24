export function groupBy(key: string, array: any[]): { [key: string]: any[] } {
  return array.reduce((accumulator, current) => {
    const valueToGroup = current[key];

    if (!accumulator[valueToGroup]) accumulator[valueToGroup] = [];

    const oldArray = accumulator[valueToGroup];

    accumulator[valueToGroup] = [...oldArray, current];

    return accumulator;
  }, {});
}
