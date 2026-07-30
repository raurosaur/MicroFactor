export default class SortedArray {
  array: [number, string][];
  MAX_SIZE: number;
  length: number;

  constructor(arrayLike: Array<[number, string]> = [], MAX_SIZE = 10) {
    this.array = arrayLike.sort().reverse().slice(0, MAX_SIZE);
    this.MAX_SIZE = MAX_SIZE;
    this.length = arrayLike.length;
  }

  add(item: [number, string]): SortedArray {
    this.array.push(item);
    this.array = this.array.sort().reverse().slice(0, this.MAX_SIZE);
    this.length = this.array.length;
    return this;
  }
  toArray(): [number, string][] {
    return this.array;
  }
}
