<template>
  <div class="cerere-page">
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Animal</th>
            <th>Numar crotalie animal</th>
            <th>Preț unitar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableRows" :key="index">
            <td>Bovine</td>
            <td>
              <input 
                type="text" 
                v-model="row.crotalieNumber"
                class="crotalie-input"
              >
            </td>
            <td>15 MDL</td>
          </tr>
        </tbody>
      </table>

      <div class="actions">
        <button @click="addRow" class="add-btn">Adaugă rând</button>
        <div class="total">
          Total: {{ calculateTotal() }} MDL
        </div>
      </div>

      <div class="submit-section">
        <button 
          @click="placeOrder" 
          class="submit-order-btn"
          :disabled="!hasValidOrder"
        >
          Plasează comanda
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CerereCretalii',
  data() {
    return {
      bovine: { id: 1, name: 'Bovine', price: 15 },
      tableRows: []
    }
  },
  computed: {
    hasValidOrder() {
      return this.tableRows.some(row => row.crotalieNumber)
    }
  },
  created() {
    const isModifying = localStorage.getItem('isModifying')
    if (isModifying) {
      const savedOrder = localStorage.getItem('currentOrder')
      if (savedOrder) {
        const orderData = JSON.parse(savedOrder)
        this.tableRows = orderData.items.map(item => ({
          crotalieNumber: item.crotalieNumber
        }))
        
        if (this.tableRows.length === 0) {
          this.addEmptyRow()
        }
      } else {
        this.addEmptyRow()
      }
    } else {
      this.addEmptyRow()
    }
  },
  methods: {
    addEmptyRow() {
      this.tableRows = [{ crotalieNumber: '' }]
    },
    calculateTotal() {
      return this.tableRows.filter(row => row.crotalieNumber).length * this.bovine.price
    },
    addRow() {
      this.tableRows.push({ crotalieNumber: '' })
    },
    placeOrder() {
      const orderData = {
        items: this.tableRows.filter(row => row.crotalieNumber).map(row => ({
          selectedAnimal: this.bovine,
          crotalieNumber: row.crotalieNumber
        })),
        total: this.calculateTotal()
      }
      localStorage.setItem('currentOrder', JSON.stringify(orderData))
      localStorage.removeItem('isModifying')
      this.$router.push('/confirmare-cerere')
    }
  }
}
</script>

<style scoped>
.cerere-page {
  padding: 32px;
  background-color: var(--light-gray);
}

.table-container {
  background: white;
  border-radius: var(--radius-md);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  max-width: 1200px;
  margin: 0 auto;
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

input[type="number"] {
  width: 100px;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.add-btn {
  padding: 8px 16px;
  background-color: var(--primary-blue);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: 'Onest', sans-serif;
}

.add-btn:hover {
  background-color: #1557b0;
}

.total {
  font-size: 18px;
  font-weight: 500;
}

.submit-section {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
}

.submit-order-btn {
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 500;
  background-color: #34A853;
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-order-btn:hover {
  background-color: #2E8B47;
}

.submit-order-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .cerere-page {
    padding: 16px;
  }

  table {
    display: block;
    overflow-x: auto;
  }

  .actions {
    flex-direction: column;
    gap: 16px;
  }

  .add-btn {
    width: 100%;
  }

  .submit-section {
    margin-top: 24px;
  }

  .submit-order-btn {
    width: 100%;
    padding: 16px;
  }
}
</style>