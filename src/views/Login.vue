<template>
    <div class="login-page">
      <div class="login-container">
        <div class="login-header">
          <img src="@/assets/mpass-logo.png" alt="MPass Logo" class="mpass-logo">
          <h1>Autentificare prin MPass</h1>
        </div>
  
        <div class="login-content" v-if="!loading && !error">
          <p class="login-description">
            Pentru a continua, veți fi autentificat prin intermediul serviciului guvernamental MPass
          </p>
          
          <div class="auth-methods" v-if="!showPhoneInput">
            <button @click="showMobileAuth" class="auth-button mobile">
              <i class="fas fa-mobile-alt"></i>
              Semnătură mobilă
            </button>
            
  
            <button @click="startAuth('digital')" class="auth-button digital">
              <i class="fas fa-id-card"></i>
              Semnătură digitală
            </button>
          </div>
  
          <div class="auth-method mobile" v-else>
            <h3>Semnătură mobilă</h3>
            <div class="phone-input-container">
              <div class="phone-prefix">+373</div>
              <input 
                type="tel" 
                v-model="phoneNumber"
                placeholder="Introduceți numărul de telefon"
                class="phone-input"
                @input="validatePhoneNumber"
                maxlength="8"
              >
            </div>
            <p class="error-message" v-if="phoneError">{{ phoneError }}</p>
            
            <button 
              @click="startAuth('mobile')" 
              class="auth-button mobile"
              :disabled="!isPhoneValid"
            >
              <i class="fas fa-arrow-right"></i>
              Continuă
            </button>
  
            <button @click="backToMethods" class="back-button">
              <i class="fas fa-arrow-left"></i>
              Înapoi
            </button>
          </div>
        </div>
  
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>{{ loadingMessage }}</p>
        </div>
  
        <div v-if="error" class="error-state">
          <i class="fas fa-exclamation-circle"></i>
          <p>{{ errorMessage }}</p>
          <button @click="resetAuth" class="retry-button">Încearcă din nou</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import auth from '@/services/auth';
  
  export default {
    name: 'Login',
    data() {
      return {
        loading: false,
        error: false,
        errorMessage: '',
        loadingMessage: '',
        authMethod: null,
        phoneNumber: '',
        phoneError: '',
        isPhoneValid: false,
        showPhoneInput: false
      };
    },
    methods: {
      showMobileAuth() {
        this.showPhoneInput = true;
      },
  
      backToMethods() {
        this.showPhoneInput = false;
        this.phoneNumber = '';
        this.phoneError = '';
        this.isPhoneValid = false;
      },
  
      validatePhoneNumber() {
        this.phoneNumber = this.phoneNumber.replace(/\D/g, '');
        
        if (this.phoneNumber.length === 0) {
          this.phoneError = 'Numărul de telefon este obligatoriu';
          this.isPhoneValid = false;
        } else if (this.phoneNumber.length < 8) {
          this.phoneError = 'Numărul de telefon trebuie să conțină 8 cifre';
          this.isPhoneValid = false;
        } else {
          this.phoneError = '';
          this.isPhoneValid = true;
        }
      },
  
      async startAuth(method) {
        if (method === 'mobile' && !this.isPhoneValid) {
          return;
        }
  
        this.authMethod = method;
        this.loading = true;
        this.error = false;
        
        const steps = method === 'mobile' 
          ? [
              'Verificare semnătură mobilă...',
              'Validare identitate...',
              'Autentificare...'
            ]
          : [
              'Inițializare serviciu MPass...',
              'Așteptare semnătură digitală...',
              'Verificare certificat...'
            ];
  
        for (const step of steps) {
          this.loadingMessage = step;
          await this.delay(1000);
        }
  
        try {
          const success = await auth.login();
          if (success) {
            this.$router.push('/auth-success');
            } else {
             throw new Error('Autentificare eșuată');
            }
        } catch (error) {
          this.error = true;
          this.errorMessage = 'A apărut o eroare în procesul de autentificare. Vă rugăm să încercați din nou.';
        } finally {
          this.loading = false;
        }
      },
  
      resetAuth() {
        this.error = false;
        this.loading = false;
        this.errorMessage = '';
        this.loadingMessage = '';
        this.authMethod = null;
        this.phoneNumber = '';
        this.phoneError = '';
        this.isPhoneValid = false;
        this.showPhoneInput = false;
      },
  
      delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    }
  };
  </script>
  
  <style scoped>
  .login-page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f7fa;
  }
  
  .login-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    width: 100%;
    max-width: 480px;
    margin: 1rem;
  }
  
  .login-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .mpass-logo {
    height: 60px;
    margin-bottom: 1rem;
  }
  
  .login-description {
    text-align: center;
    color: #666;
    margin-bottom: 2rem;
  }
  
  .auth-methods {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .auth-method {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .auth-method h3 {
    margin: 0;
    color: #333;
    font-size: 1.1rem;
  }
  
  .phone-input-container {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .phone-prefix {
    background-color: #f5f5f5;
    padding: 0.8rem 1rem;
    color: #666;
    border-right: 1px solid #ddd;
    font-family: monospace;
  }
  
  .phone-input {
    flex: 1;
    padding: 0.8rem;
    border: none;
    outline: none;
    font-size: 1rem;
  }
  
  .submitted-phone {
    padding: 0.8rem;
    background-color: #f5f5f5;
    border-radius: 4px;
    color: #333;
    font-family: monospace;
    text-align: center;
  }
  
  .error-message {
    color: #d32f2f;
    font-size: 0.9rem;
    margin: 0;
  }
  
  .separator {
    text-align: center;
    color: #666;
    position: relative;
    margin: 1rem 0;
  }
  
  .separator::before,
  .separator::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: #ddd;
  }
  
  .separator::before {
    left: 0;
  }
  
  .separator::after {
    right: 0;
  }
  
  .auth-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .auth-button.mobile {
    background-color: #4CAF50;
    color: white;
  }
  
  .auth-button.digital {
    background-color: #2196F3;
    color: white;
  }
  
  .auth-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .auth-button:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .loading-state {
    text-align: center;
    padding: 2rem;
  }
  
  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }
  
  .error-state {
    text-align: center;
    color: #d32f2f;
    padding: 1rem;
  }
  
  .retry-button {
    background-color: #666;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    margin-top: 1rem;
    cursor: pointer;
  }
  

  .back-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.back-button:hover {
  background-color: #f5f5f5;
}

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 480px) {
    .login-container {
      margin: 0;
      border-radius: 0;
      min-height: 100vh;
    }
  }
  </style>