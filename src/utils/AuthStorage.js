import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  construct(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token from the storage
    const accessToken = await AsyncStorage.getItem(`${this.namespace}:token`);
    return accessToken ? JSON.parse(accessToken) : null;
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    // namespace:key format for the keys
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(accessToken)
    );
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;
