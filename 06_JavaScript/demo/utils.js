export function isDiffTest(prev, next) {
  if (typeof prev !== typeof next) return false;
  if (prev === null || next === null) return prev === next;

  if (Array.isArray(prev) && Array.isArray(next)) {
    const commonLength = Math.min(prev.length, next.length);
    for (let i = 0; i < commonLength; i++) {
      if (!isDiffTest(prev[i], next[i])) return false;
    }
  } else if (typeof prev === 'object' && typeof next === 'object') {
    const prevKeys = Object.keys(prev);
    const nextKeys = Object.keys(next);
    const allKeys = new Set([ ...prevKeys, ...nextKeys ]);
    for (let key of allKeys) {
      if (!isDiffTest(prev[key], next[key])) return false;
    }
  } else {
    return prev === next;
  }
  return true;
}
