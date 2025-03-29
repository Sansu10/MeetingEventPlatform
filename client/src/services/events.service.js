import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Replace with your actual API URL

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};

export const eventsService = {
  async getEvents() {
    try {
      const response = await axios.get(`${API_URL}/events`, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getEventsRequest() {
    try {
      const response = await axios.get(`${API_URL}/events`, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  async createEvent(eventData) {
    try {
      const response = await axios.post(`${API_URL}/events`, eventData, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};