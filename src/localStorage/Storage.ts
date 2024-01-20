import AsyncStorage from '@react-native-async-storage/async-storage';

// Cache product data
export const cacheProductData = async (products:any) => {
  try {
    await AsyncStorage.setItem('newsData', JSON.stringify(products));
  } catch (error) {
    console.log('Error caching product data:', error);
  }
};

export const getCachedProductData = async () => {
  try {
    const cachedData = await AsyncStorage.getItem('newsData');
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.log('Error retrieving cached product data:', error);
  }
};