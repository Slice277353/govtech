<template>
    <div class="delivery-payment-page">
      <!-- Delivery Section -->
      <div v-if="!showPayment" class="section-container">
        <div class="section-header">
          <img src="@/assets/mdelivery-logo.png" alt="MDelivery" class="logo">
          <h1>Selectare metodă de livrare</h1>
        </div>
  
        <div class="delivery-options">
          <div 
            v-for="option in deliveryOptions" 
            :key="option.id"
            class="delivery-option"
            :class="{ 'selected': selectedDeliveryOption === option }"
            @click="selectDeliveryOption(option)"
          >
            <div class="option-icon">
              <i :class="option.icon"></i>
            </div>
            <div class="option-details">
              <h3>{{ option.name }}</h3>
              <p>{{ option.description }}</p>
              <span class="price">{{ option.price }} MDL</span>
            </div>
          </div>
        </div>
  
        <div class="order-summary">
          <div class="summary-row">
            <span>Cost produse:</span>
            <strong>{{ orderTotal }} MDL</strong>
          </div>
          <div class="summary-row">
            <span>Cost livrare:</span>
            <strong>{{ selectedDeliveryOption ? selectedDeliveryOption.price : 0 }} MDL</strong>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <strong>{{ finalTotal }} MDL</strong>
          </div>
        </div>
  
        <div class="action-buttons">
          <button 
            @click="proceedToPayment" 
            class="primary-button"
            :disabled="!selectedDeliveryOption"
          >
            Continuă spre plată
          </button>
          <button @click="goBack" class="secondary-button">
            Înapoi
          </button>
        </div>
      </div>
  
      <!-- Payment Section -->
      <div v-else class="section-container">
        <div class="section-header">
          <img src="@/assets/mpay-logo.png" alt="MPay" class="logo">
          <h1>Confirmare plată</h1>
        </div>
  
        <div class="order-details">
          <div class="detail-row">
            <span>Număr comandă: </span>
            <strong>{{ orderNumber }}</strong>
          </div>
          <div class="detail-row">
            <span>Serviciu: </span>
            <strong>Comandă crotalii</strong>
          </div>
          <div class="detail-row">
            <span>Livrare: </span>
            <strong>{{ selectedDeliveryOption.name }}</strong>
          </div>
          <div class="detail-row total">
            <span>Total de plată: </span>
            <strong>{{ finalTotal }} MDL</strong>
          </div>
        </div>
  
        <div class="payment-methods" v-if="!methodSelected">
          <h2>Selectați metoda de plată:</h2>
          <div class="method-grid">
            <div 
              v-for="method in paymentMethods" 
              :key="method.id"
              class="payment-method"
              @click="selectPaymentMethod(method)"
            >
              <i :class="method.icon"></i>
              <span>{{ method.name }}</span>
            </div>
          </div>
        </div>
  
        <div class="payment-process" v-else>
          <div v-if="!loading && !success">
            <h3>{{ selectedPaymentMethod.name }}</h3>
            <p class="instruction">{{ selectedPaymentMethod.instruction }}</p>
            <button @click="processPayment" class="primary-button">
              Confirmă plata
            </button>
            <button @click="methodSelected = false" class="secondary-button">
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
    </div>
  </template>
  
  <script>
  export default {
    name: 'DeliveryPayment',
    data() {
      return {
        showPayment: false,
        orderNumber: 'MPY' + Date.now().toString().slice(-8),
        orderTotal: 0,
        selectedDeliveryOption: null,
        methodSelected: false,
        selectedPaymentMethod: null,
        loading: false,
        success: false,
        loadingMessage: '',
        deliveryOptions: [
          {
            id: 1,
            name: 'Livrare standard',
            description: 'Livrare în 3-5 zile lucrătoare',
            price: 50,
            icon: 'fas fa-truck'
          },
          {
            id: 2,
            name: 'Livrare express',
            description: 'Livrare în 1-2 zile lucrătoare',
            price: 100,
            icon: 'fas fa-shipping-fast'
          },
          {
            id: 3,
            name: 'Ridicare personală',
            description: 'Din oficiul nostru',
            price: 0,
            icon: 'fas fa-store'
          }
        ],
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
      }
    },
    computed: {
      finalTotal() {
        const deliveryCost = this.selectedDeliveryOption ? this.selectedDeliveryOption.price : 0
        return this.orderTotal + deliveryCost
      }
    },
    created() {
      const savedOrder = localStorage.getItem('currentOrder')
      if (savedOrder) {
        const orderData = JSON.parse(savedOrder)
        this.orderTotal = orderData.orderDetails?.total || 0
      } else {
        this.$router.push('/')
      }
    },
    methods: {
      selectDeliveryOption(option) {
        this.selectedDeliveryOption = option
      },
      proceedToPayment() {
        if (this.selectedDeliveryOption) {
          this.showPayment = true
        }
      },
      selectPaymentMethod(method) {
        this.selectedPaymentMethod = method
        this.methodSelected = true
      },
      async processPayment() {
        this.loading = true
        const steps = [
          'Inițializare tranzacție...',
          'Verificare date...',
          'Procesare plată...',
          'Confirmare tranzacție...'
        ]
  
        for (const step of steps) {
          this.loadingMessage = step
          await this.delay(1000)
        }
  
        this.loading = false
        this.success = true
  
        setTimeout(() => {
          this.$router.push({
            path: '/payment-success',
            query: {
              orderNumber: this.orderNumber,
              amount: this.finalTotal
            }
          })
        }, 2000)
      },
      delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      },
      goBack() {
        if (this.showPayment) {
          this.showPayment = false
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .delivery-payment-page {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .section-container {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .logo {
    max-width: 200px;
    margin-bottom: 1rem;
  }
  
  /* Delivery Options Styles */
  .delivery-options {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .delivery-option {
    display: flex;
    padding: 1.5rem;
    border: 2px solid #eee;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .delivery-option.selected {
    border-color: #007bff;
    background: #f0f8ff;
  }
  
  .option-icon i {
    font-size: 2rem;
    color: #007bff;
    margin-right: 1rem;
  }
  
  /* Payment Methods Styles */
  .method-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .payment-method {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .payment-method:hover {
    border-color: #007bff;
    background: #f8f9fa;
  }
  
  .payment-method i {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #007bff;
  }
  
  /* Common Styles */
  .primary-button, .secondary-button {
    width: 100%;
    padding: 1rem;
    margin: 0.5rem 0;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .primary-button {
    background: #007bff;
    color: white;
  }
  
  .primary-button:hover {
    background: #0056b3;
  }
  
  .secondary-button {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
  }
  
  .secondary-button:hover {
    background: #e2e6ea;
  }
  
  /* Loading and Success States */
  .loading-state, .success-state {
    text-align: center;
    padding: 2rem 0;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .success-state {
    color: #28a745;
  }
  
  .success-state i {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .delivery-payment-page {
      padding: 1rem;
    }
    
    .section-container {
      padding: 1rem;
    }
    
    .method-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>