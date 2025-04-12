import mpassSimulator from './mpassSimulator';

export default {
  isAuthenticated: false,
  userData: null,
  token: null,

  async login() {
    try {
      const response = await mpassSimulator.authenticate();
      
      if (response.success) {
        this.isAuthenticated = true;
        this.userData = response.userData;
        this.token = response.token;
        
        localStorage.setItem('mpass_auth', JSON.stringify({
          isAuthenticated: true,
          userData: response.userData,
          token: response.token
        }));
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Eroare la autentificare:', error);
      return false;
    }
  },

  logout() {
    this.isAuthenticated = false;
    this.userData = null;
    this.token = null;
    localStorage.removeItem('mpass_auth');
  },

  checkAuth() {
    const authData = localStorage.getItem('mpass_auth');
    if (authData) {
      const data = JSON.parse(authData);
      this.isAuthenticated = data.isAuthenticated;
      this.userData = data.userData;
      this.token = data.token;
      return true;
    }
    return false;
  }
};