<template>
  <div class="payment-page">
    <div class="payment-container" v-if="orderNumber && total">
      <div class="payment-header">
        <img src="@/assets/mpay-logo.png" alt="MPay" class="mpay-logo">
        <h1>Confirmare plată</h1>
      </div>

      <div class="order-details">
        <div class="detail-row">
          <span>Număr comandă:</span>
          <strong>{{ orderNumber }}</strong>
        </div>
        <div class="detail-row">
          <span>Serviciu:</span>
          <strong>Comandă crotalii</strong>
        </div>
        <div class="detail-row total">
          <span>Suma totală:</span>
          <strong>{{ total }} MDL</strong>
        </div>
      </div>

      <div class="payment-methods" v-if="!methodSelected">
        <h2>Selectați metoda de plată:</h2>
        <div class="method-grid">
          <div 
            class="payment-method"
            v-for="method in paymentMethods"
            :key="method.id"
            @click="selectMethod(method)"
          >
            <i :class="method.icon"></i>
            <span>{{ method.name }}</span>
          </div>
        </div>
      </div>

      <div class="payment-process" v-else>
        <div v-if="!loading && !success">
          <h3>{{ selectedMethod.name }}</h3>
          <p class="instruction">{{ selectedMethod.instruction }}</p>
          <button 
            @click="processPayment" 
            class="pay-button"
          >
            Confirmă plata
          </button>
          <button 
            @click="methodSelected = false" 
            class="back-button"
          >
            Schimbă metoda
          </button>
        </div>

        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>{{ loadingMessage }}</p>
        </div>

        <div v-if="success" class="success-state">
          <i class="fas fa-check-circle"></i>
          <h2>Plată efectuată cu succes!</h2>
          <p>Veți fi redirecționat în câteva momente...</p>
        </div>
      </div>
    </div>
    <div v-else class="error-message">
      <h2>Eroare</h2>
      <p>Detaliile comenzii nu au fost găsite. Vă rugăm să încercați din nou.</p>
      <button @click="goToHome" class="primary-button">Pagina principală</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderNumber: '',
      total: 0,
      methodSelected: false,
      selectedMethod: null,
      loading: false,
      success: false,
      loadingMessage: '',
      paymentMethods: [
        {
          id: 1,
          name: 'Card bancar',
          icon: 'fas fa-credit-card',
          instruction: 'Introduceți datele cardului pentru a efectua plata'
        },
        {
          id: 2,
          name: 'Mobile banking',
          icon: 'fas fa-mobile-alt',
          instruction: 'Scanați codul QR sau confirmați în aplicația mobilă'
        },
        {
          id: 3,
          name: 'Internet banking',
          icon: 'fas fa-laptop',
          instruction: 'Veți fi redirecționat către pagina băncii dvs.'
        },
        {
          id: 4,
          name: 'Terminal de plată',
          icon: 'fas fa-cash-register',
          instruction: 'Utilizați codul de plată la cel mai apropiat terminal'
        }
      ]
    };
  },
  created() {
    const savedOrder = localStorage.getItem('orderForPayment');
    if (savedOrder) {
      const orderData = JSON.parse(savedOrder);
      this.orderNumber = orderData.orderData?.orderNumber || 'N/A';
      this.total = orderData.orderData?.total || 0;
    } else {
      this.$router.push('/'); // Redirect to home if no order data is found
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    selectMethod(method) {
      this.selectedMethod = method;
      this.methodSelected = true;
    },
    async processPayment() {
      this.loading = true;
      const steps = [
        'Inițializare tranzacție...',
        'Verificare date...',
        'Procesare plată...',
        'Confirmare tranzacție...'
      ];

      for (const step of steps) {
        this.loadingMessage = step;
        await this.delay(1000);
      }

      this.loading = false;
      this.success = true;

      // Simulăm redirecționarea după plată
      setTimeout(() => {
        this.$router.push({
          path: '/payment-success',
          query: {
            orderNumber: this.orderNumber,
            amount: this.total
          }
        });
      }, 2000);
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
};
</script>

<style scoped>
.payment-page {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  padding: 32px;
  max-width: 600px;
  width: 100%;
}

.payment-header {
  text-align: center;
  margin-bottom: 32px;
}

.mpay-logo {
  height: 40px;
  margin-bottom: 16px;
}

.order-details {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 32px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.detail-row.total {
  border-top: 1px solid #dee2e6;
  margin-top: 16px;
  padding-top: 16px;
  font-size: 1.2em;
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.payment-method {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.payment-method:hover {
  border-color: #005EC7;
  background-color: #f8f9fa;
}

.payment-method i {
  font-size: 24px;
  color: #005EC7;
}

.payment-process {
  text-align: center;
}

.instruction {
  margin: 20px 0;
  color: #666;
}

.pay-button {
  background-color: #005EC7;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 4px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  margin-bottom: 12px;
}

.pay-button:hover {
  background-color: #004CAA;
}

.back-button {
  background: none;
  border: 1px solid #dee2e6;
  padding: 12px 32px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.loading-state {
  text-align: center;
  padding: 32px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #005EC7;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

.success-state {
  text-align: center;
  padding: 32px;
}

.success-state i {
  font-size: 48px;
  color: #28a745;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .payment-container {
    padding: 20px;
  }

  .method-grid {
    grid-template-columns: 1fr;
  }
}
</style>