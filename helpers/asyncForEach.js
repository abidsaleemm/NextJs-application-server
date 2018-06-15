export default async (array, callback) => {
  try {
    for (let i = 0, { length } = array; i < length; i++) {
      await callback(array[i], i, array);
    }
  } catch (error) {
    throw error;
  }
};
