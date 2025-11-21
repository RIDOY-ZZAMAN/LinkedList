export function addTwoLists(list1: number[], list2: number[]): number[] {
  let carry = 0;
  const result: number[] = [];
  let i = 0;

  while (i < list1.length || i < list2.length || carry) {
    const sum = (list1[i] || 0) + (list2[i] || 0) + carry;
    result.push(sum % 10);
    carry = Math.floor(sum / 10);
    i++;
  }

  return result;
}
