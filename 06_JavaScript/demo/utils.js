export function isEqualTest(prev, next) {
  if (typeof prev !== typeof next) return false;
  if (prev === null || next === null) return prev === next;

  if (Array.isArray(prev) && Array.isArray(next)) {
    if (prev.length !== next.length) return false;
    for (let i = 0; i < prev.length; i++) {
      if (!isEqualTest(prev[i], next[i])) return false;
    }
  } else if (typeof prev === 'object' && typeof next === 'object') {
    const prevKeys = Object.keys(prev);
    const nextKeys = Object.keys(next);
    if (prevKeys.length !== nextKeys.length) return false;
    for (let key of prevKeys) {
      if (!isEqualTest(prev[key], next[key])) return false;
    }
  } else {
    return prev === next;
  }
  return true;
}