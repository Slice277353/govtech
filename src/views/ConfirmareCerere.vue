<template>
  <div class="confirmare-page">
    <div class="confirmare-container">
      <h2>Confirmarea comenzii</h2>
      
      <div class="order-details">
        <div class="order-summary">
          <table>
            <thead>
              <tr>
                <th>Animal</th>
                <th>Numar crotalie</th>
                <th>Preț unitar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in orderData.items" :key="index">
                <td>{{ item.selectedAnimal.name }}</td>
                <td>{{ item.crotalieNumber }}</td>
                <td>{{ item.selectedAnimal.price }} MDL</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Detalii client -->
        <div class="client-details" v-if="!showModifyConfirm">
          <h3>Detalii client</h3>
          <div class="form-group">
            <label for="name">Nume complet:</label>
            <input 
              type="text" 
              id="name" 
              v-model="clientDetails.name"
              :class="{ 'error': validationErrors.name }"
            >
            <span class="error-message" v-if="validationErrors.name">
              {{ validationErrors.name }}
            </span>
          </div>

          <div class="form-group">
            <label for="phone">Telefon:</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="clientDetails.phone"
              :class="{ 'error': validationErrors.phone }"
            >
            <span class="error-message" v-if="validationErrors.phone">
              {{ validationErrors.phone }}
            </span>
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              v-model="clientDetails.email"
              :class="{ 'error': validationErrors.email }"
            >
            <span class="error-message" v-if="validationErrors.email">
              {{ validationErrors.email }}
            </span>
          </div>
        </div>
      </div>

      <div class="confirmation-actions" v-if="!showModifyConfirm">
        <button @click="validateAndConfirm" class="confirm-btn">
          <span class="checkmark">✓</span> Confirmă
        </button>
        <button @click="showModifyPrompt" class="modify-btn">
          <span class="edit-mark">✎</span> Modifică
        </button>
        <button @click="cancelOrder" class="cancel-btn">
          <span class="x-mark">✕</span> Anulează
        </button>
      </div>

      <div class="modify-confirm" v-if="showModifyConfirm">
        <p>Doriți să modificați comanda?</p>
        <div class="modify-actions">
          <button @click="modifyOrder" class="modify-btn">Da</button>
          <button @click="cancelModify" class="cancel-modify-btn">Nu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmareCerere',
  data() {
    return {
      orderData: {
        items: [],
        total: 0
      },
      clientDetails: {
        name: '',
        phone: '',
        email: ''
      },
      showModifyConfirm: false,
      validationErrors: {
        name: '',
        phone: '',
        email: ''
      },
      isSubmitting: false
    }
  },
  created() {
    const savedOrder = localStorage.getItem('currentOrder')
    if (savedOrder) {
      this.orderData = JSON.parse(savedOrder)
      
      // Încărcăm detaliile clientului dacă există
      const savedClientDetails = localStorage.getItem('clientDetails')
      if (savedClientDetails) {
        this.clientDetails = JSON.parse(savedClientDetails)
      }
    } else {
      this.$router.push('/cerere-crotalii')
    }
  },
  methods: {
    validateForm() {
      let isValid = true
      this.validationErrors = {
        name: '',
        phone: '',
        email: ''
      }

      // Validare nume
      if (!this.clientDetails.name.trim()) {
        this.validationErrors.name = 'Numele este obligatoriu'
        isValid = false
      }

      // Validare telefon
      const phoneRegex = /^(?:\+373|0)(?:6[789]|7[89])\d{6}$/
      if (!phoneRegex.test(this.clientDetails.phone)) {
        this.validationErrors.phone = 'Numărul de telefon nu este valid'
        isValid = false
      }

      // Validare email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.clientDetails.email)) {
        this.validationErrors.email = 'Adresa de email nu este validă'
        isValid = false
      }

      return isValid
    },

    validateAndConfirm() {
      if (this.validateForm()) {
        this.isSubmitting = true;
        
        // Salvăm detaliile clientului
        localStorage.setItem('clientDetails', JSON.stringify(this.clientDetails))
        
        // Salvăm datele comenzii pentru MPay
        const orderDetails = {
          orderData: this.orderData,
          clientDetails: this.clientDetails,
          timestamp: new Date().toISOString()
        }
        localStorage.setItem('orderForPayment', JSON.stringify(orderDetails))

        // Redirecționăm către pagina MPay
        this.$router.push('/mpay')
      }
    },

    showModifyPrompt() {
      this.showModifyConfirm = true
    },

    modifyOrder() {
      localStorage.setItem('isModifying', 'true')
      this.$router.push('/cerere-crotalii')
    },

    cancelModify() {
      this.showModifyConfirm = false
    },

    cancelOrder() {
      if (confirm('Sunteți sigur că doriți să anulați comanda?')) {
        localStorage.removeItem('currentOrder')
        localStorage.removeItem('clientDetails')
        this.$router.push('/')
      }
    },

    confirmOrder() {
      // Aici puteți adăuga logica pentru trimiterea comenzii către server
      alert('Comanda a fost plasată cu succes!')
      localStorage.removeItem('currentOrder')
      localStorage.removeItem('isModifying')
      localStorage.removeItem('clientDetails')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.confirmare-page {
  padding: 32px;
  background-color: var(--light-gray);
  min-height: 100vh;
}

.confirmare-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: var(--radius-md);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

h2 {
  margin-bottom: 24px;
  color: var(--text-dark);
  font-size: 24px;
  font-weight: 500;
}

h3 {
  margin: 24px 0 16px;
  color: var(--text-dark);
  font-size: 20px;
  font-weight: 500;
}

.order-details {
  margin-bottom: 32px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

th {
  font-weight: 500;
  color: var(--text-gray);
  background-color: var(--light-gray);
}

.total-label {
  text-align: right;
  font-weight: 500;
}

.total-amount {
  font-weight: 500;
  color: var(--text-dark);
}

.client-details {
  margin-top: 24px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-gray);
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 16px;
}

input.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 4px;
  display: block;
}

.confirmation-actions, .modify-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}

.confirm-btn, .modify-btn, .cancel-btn, .cancel-modify-btn {
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.confirm-btn {
  background-color: #34A853;
  color: white;
}

.confirm-btn:hover {
  background-color: #2E8B47;
}

.modify-btn {
  background-color: var(--primary-blue);
  color: white;
}

.modify-btn:hover {
  background-color: #1557b0;
}

.cancel-btn {
  background-color: #EA4335;
  color: white;
}

.cancel-btn:hover {
  background-color: #D33828;
}

.modify-confirm {
  text-align: center;
  margin-top: 24px;
}

.modify-confirm p {
  margin-bottom: 16px;
  font-size: 18px;
  color: var(--text-dark);
}

.cancel-modify-btn {
  background-color: var(--light-gray);
  color: var(--text-dark);
}

.checkmark, .x-mark, .edit-mark {
  font-size: 20px;
}

@media (max-width: 768px) {
  .confirmare-page {
    padding: 16px;
  }

  .confirmation-actions {
    flex-direction: column;
  }

  .confirm-btn, .modify-btn, .cancel-btn {
    width: 100%;
    justify-content: center;
  }

  table {
    font-size: 14px;
  }

  th, td {
    padding: 8px;
  }
}
</style>