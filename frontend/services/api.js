import AsyncStorage from '@react-native-async-storage/async-storage';

// For Expo development - use your computer's IP address
const API_BASE_URL = 'http://192.168.33.111:3000/api';

class ApiService {
  async getAuthToken() {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.log('Error getting auth token:', error);
      return null;
    }
  }

  async setAuthToken(token) {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.log('Error setting auth token:', error);
    }
  }

  async removeAuthToken() {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.log('Error removing auth token:', error);
    }
  }

  async makeRequest(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const token = await this.getAuthToken();
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.log('API Request Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, prn) {
    const response = await this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, prn }),
    });
    
    if (response.token) {
      await this.setAuthToken(response.token);
    }
    
    return response;
  }

  async sendOTP(email) {
    return await this.makeRequest('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyOTP(email, otp) {
    return await this.makeRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  }

  async resetPassword(email, otp, newPassword) {
    return await this.makeRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, otp, newPassword }),
    });
  }

  async changePassword(currentPassword, newPassword) {
    return await this.makeRequest('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Bus endpoints
  async getBusDetails() {
    return await this.makeRequest('/bus/details');
  }

  async getBusLocation() {
    return await this.makeRequest('/bus/location');
  }

  async getETA() {
    return await this.makeRequest('/bus/eta');
  }

  async logout() {
    await this.removeAuthToken();
  }
}

export default new ApiService();
