<template>
    <div class="success-page">
      <div class="success-container">
        <div class="success-icon">
          <img src="@/assets/success-icon.png" alt="Success" class="check-icon">
        </div>
        <h1>Plată efectuată cu succes!</h1>
        <p>Comanda dvs. a fost înregistrată și va fi procesată în curând.</p>
        
        <div class="success-details">
          <div class="detail-row">
            <span>Număr comandă:</span>
            <strong>{{ orderNumber }}</strong>
          </div>
          <div class="detail-row">
            <span>Suma achitată:</span>
            <strong>{{ amount }} MDL</strong>
          </div>
        </div>
  
        <div class="action-buttons">
          <button @click="goToHome" class="primary-button">
            Pagina principală
          </button>
          <button @click="viewOrder" class="secondary-button">
            Vezi comanda
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orderNumber: '',
        amount: 0
      }
    },
    created() {
      // Preluăm datele din query parameters
      this.orderNumber = this.$route.query.orderNumber || 'N/A'
      this.amount = this.$route.query.amount || 0
    },
    methods: {
      goToHome() {
        this.$router.push('/')
      },
      viewOrder() {
        // Implementare pentru vizualizarea comenzii
        console.log('View order:', this.orderNumber)
      }
    }
  }
  </script>
  
  <style scoped>
  .success-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .success-container {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 500px;
    width: 90%;
  }
  
  .success-icon {
    margin-bottom: 1.5rem;
  }
  
  .check-icon {
    width: 64px;
    height: 64px;
  }
  
  h1 {
    color: #333;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    margin-bottom: 2rem;
  }
  
  .success-details {
    background: #f8f8f8;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }
  
  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }
  
  .detail-row:last-child {
    border-bottom: none;
  }
  
  .detail-row span {
    color: #666;
  }
  
  .detail-row strong {
    color: #333;
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  
  .primary-button, .secondary-button {
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .primary-button {
    background: #007bff;
    color: white;
    border: none;
  }
  
  .secondary-button {
    background: white;
    color: #007bff;
    border: 1px solid #007bff;
  }
  
  .primary-button:hover {
    background: #0056b3;
  }
  
  .secondary-button:hover {
    background: #f0f8ff;
  }
  
  @media (max-width: 480px) {
    .action-buttons {
      flex-direction: column;
    }
    
    .primary-button, .secondary-button {
      width: 100%;
      margin-bottom: 0.5rem;
    }
  }
  </style>