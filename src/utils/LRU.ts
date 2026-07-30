type LRU_OPTIONS = {
  max: number; // Max no of entries
  ttl: number; // time to live in ms
};

export default class LRUCache<T> {
  max: number;
  ttl: number;
  cache: Record<string, [T, number]> = {};
  size: number = 0;

  constructor(
    options: LRU_OPTIONS = { max: 100, ttl: 1e7 },
    dump: string | null = null,
  ) {
    this.max = options.max;
    this.ttl = options.ttl;

    if (dump) {
      this.cache = JSON.parse(dump);
      this.size = Object.entries(this.cache).length;
    }
  }

  /**
   * Dump for the cache to load into constructor
   * @returns string version of the cache to load into async storage
   */
  dump() {
    return JSON.stringify(this.cache);
  }

  /**
   * Checks whether the cache contains a key that starts with {@link searchStr}.
   *
   * @param searchStr - The prefix to match against cache keys.
   * @returns `true` if a matching cache key exists.
   */
  match(searchStr: string): boolean {
    return !!Object.keys(this.cache).find((key) => key.startsWith(searchStr));
  }
  /**
   * Checks if the key is present within the cache.
   * If present updates the entry's accessed time
   * @param key key of the cache
   * @param refresh if refresh is set to true, then updates entry time
   * @returns boolean for if the cache contains the key
   */
  has(key: string, refresh = true) {
    if (key in this.cache) {
      if (refresh) this.cache[key][1] = Date.now();
      return true;
    }
    return false;
  }
  /**
   * Retrieves element for the cache
   * @param key key for the entry
   * @returns Element if found, or null
   */
  get(key: string) {
    if (this.has(key)) {
      this.cache[key][1] = Date.now();
      return this.cache[key][0];
    }
    return null;
  }
  /**
   * Sets element for the cache
   * @param key key of the new entry
   * @param value value of the new entry
   */
  set(key: string, value: T) {
    if (key in this.cache) {
    } else if (this.size >= this.max) {
      // cache is full
      const entries = Object.entries(this.cache);
      let max_key = "";
      let max_time = -1;
      const now = Date.now();
      for (const [key, [value, time]] of entries) {
        if (now - time < this.ttl) {
          //expired object
          max_key = key;
          break;
        }
        if (max_time > time) {
          max_key = key;
          max_time = time;
        }
      }
      delete this.cache[max_key];
    } else {
      this.size++;
    }
    this.cache[key] = [value, Date.now()];
  }
}
