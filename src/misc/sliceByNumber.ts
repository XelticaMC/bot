/**
 * 配列を指定した数ずつ区切った、新しい配列を生成して返します。
 */
export const sliceByNumber = <T>(array: T[], n: number): T[][] => {
  const resultLength = Math.ceil(array.length / n);
  return Array(resultLength).fill(null).map((_, i) => array.slice(i * n, i * n + n));
};
