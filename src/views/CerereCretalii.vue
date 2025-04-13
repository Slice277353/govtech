<template>
  <div class="cerere-page">
    <div class="client-info">
    </div>
    <div class="table-container">
      <!-- Placeholder Name -->
      <p>
        Nume: Ion Popescu
      </p>
      <!-- Randomly Generated IDNP -->
      <p>
        IDNP: {{ idnp }}
      </p>
      <table>
        <thead>
          <tr>
            <th>Selectează animal</th>
            <th>Cantitate crotalii</th>
            <th>Preț unitar</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableRows" :key="index">
            <td>
              <div class="select-container">
                <select 
                  v-model="row.selectedAnimal"
                  @change="updatePrice(row)"
                >
                  <option value="">Selectează</option>
                  <option 
                    v-for="animal in availableAnimals(index)" 
                    :key="animal.id" 
                    :value="animal"
                  >
                    {{ animal.name }}
                  </option>
                </select>
              </div>
            </td>
            <td>
              <input 
                type="number" 
                v-model="row.quantity" 
                min="0"
                @input="updatePrice(row)"
                :disabled="!row.selectedAnimal"
              >
            </td>
            <td>{{ row.selectedAnimal ? row.selectedAnimal.price + ' MDL' : '-' }}</td>
            <td>{{ calculateRowTotal(row) }} MDL</td>
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
      idnp: '', // Randomly generated IDNP
      clientDetails: {
        firstName: '',
        lastName: ''
      },
      animals: [
        { id: 1, name: 'Bovine', price: 15 },
        { id: 2, name: 'Ovine', price: 12 },
        { id: 3, name: 'Caprine', price: 12 },
        { id: 4, name: 'Porcine', price: 10 },
        { id: 5, name: 'Cabaline', price: 15 },
        { id: 6, name: 'Măgari', price: 15 },
        { id: 7, name: 'Iepuri', price: 8 },
        { id: 8, name: 'Nutrii', price: 8 }
      ],
      tableRows: []
    }
  },
  watch: {
    idnp(newIDNP) {
      if (newIDNP.length === 13) {
        this.fetchClientDetails(newIDNP);
      } else {
        this.clientDetails = { firstName: '', lastName: '' };
      }
    }
  },
  computed: {
    hasValidOrder() {
      return this.tableRows.some(row => 
        row.selectedAnimal && row.quantity > 0
      )
    }
  },
  created() {
    // Generate a random IDNP on component creation
    this.idnp = '4' + Math.random().toString().slice(2, 13);
    // Verificăm dacă suntem în modul de modificare
    const isModifying = localStorage.getItem('isModifying')
    if (isModifying) {
      // Încărcăm datele salvate
      const savedOrder = localStorage.getItem('currentOrder')
      if (savedOrder) {
        const orderData = JSON.parse(savedOrder)
        // Populăm tableRows cu datele salvate
        this.tableRows = (orderData?.items ?? []).map(item => ({
          selectedAnimal: this.findAnimalById(item.selectedAnimal.id),
          quantity: item.quantity
        }))
        
        // Dacă nu există niciun rând, adăugăm unul gol
        if (this.tableRows.length === 0) {
          this.addEmptyRow()
        }
      } else {
        this.addEmptyRow()
      }
    } else {
      // Dacă nu suntem în modul de modificare, începem cu un rând gol
      this.addEmptyRow()
    }
  },
  methods: {
    fetchClientDetails(idnp) {
      fetch(`http://localhost:3000/clients?IDNP=${idnp}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch client details');
          return response.json();
        })
        .then(clients => {
          if (clients.length > 0) {
            const client = clients[0];
            this.clientDetails = {
              firstName: client.firstName || 'Ion',
              lastName: client.lastName || 'Popescu'
            };
          } else {
            this.clientDetails = { firstName: 'Ion', lastName: 'Popescu' };
          }
        })
        .catch(error => {
          console.error('Error fetching client details:', error);
          this.clientDetails = { firstName: 'Ion', lastName: 'Popescu' };
        });
    },
    findAnimalById(id) {
      return this.animals.find(animal => animal.id === id)
    },
    addEmptyRow() {
      this.tableRows = [{ selectedAnimal: null, quantity: 0 }]
    },
    availableAnimals(currentIndex) {
      return this.animals.filter(animal => {
        return !this.tableRows.some((row, index) => 
          index !== currentIndex && 
          row.selectedAnimal && 
          row.selectedAnimal.id === animal.id
        )
      })
    },
    updatePrice(row) {
      if (row.quantity < 0) row.quantity = 0
    },
    calculateRowTotal(row) {
      if (!row.selectedAnimal) return 0
      return row.selectedAnimal.price * (row.quantity || 0)
    },
    calculateTotal() {
      return this.tableRows.reduce((total, row) => {
        return total + this.calculateRowTotal(row)
      }, 0)
    },
    addRow() {
      this.tableRows.push({ selectedAnimal: null, quantity: 0 })
    },
    placeOrder() {
      const clientIDNP = '4' + Math.random().toString().slice(2, 13); // Generate or get IDNP

      fetch('http://localhost:3000/animalCodeCounter')
        .then(response => {
          if (!response.ok) throw new Error('Counter fetch failed');
          return response.json();
        })
        .then(counter => {
          const orderItems = this.tableRows
            .filter(row => row.selectedAnimal && row.quantity > 0)
            .map(row => ({
              animalTypeId: row.selectedAnimal.id,
              animalTypeName: row.selectedAnimal.name,
              quantity: row.quantity,
              unitPrice: row.selectedAnimal.price,
              rowTotal: row.selectedAnimal.price * row.quantity
            }));

          const individualAnimals = [];
          let currentCounter = Math.max(counter.value, 1); // Ensure counter starts from 1

          this.tableRows.filter(row => row.selectedAnimal && row.quantity > 0)
            .forEach(row => {
              for (let i = 0; i < row.quantity; i++) {
                individualAnimals.push({
                  animalCode: (currentCounter++).toString().padStart(10, '0'),
                  animalTypeId: row.selectedAnimal.id,
                  status: 'active',
                  registrationDate: new Date().toISOString().split('T')[0]
                });
              }
            });

          const newOrder = {
            orderId: Date.now(),
            date: new Date().toISOString(),
            status: 'pending',
            items: orderItems,
            individualAnimals,
            total: orderItems.reduce((sum, item) => sum + item.rowTotal, 0)
          };

          return Promise.all([
            fetch(`http://localhost:3000/clients?IDNP=${clientIDNP}`)
              .then(res => {
                if (!res.ok) throw new Error('Client lookup failed');
                return res.json();
              })
              .then(clients => {
                if (clients.length > 0) {
                  const client = clients[0];
                  client.orders = client.orders || [];
                  client.orders.push(newOrder);
                  return fetch(`http://localhost:3000/clients/${client.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(client)
                  });
                } else {
                  return fetch('http://localhost:3000/clients', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      IDNP: clientIDNP,
                      orders: [newOrder]
                    })
                  });
                }
              }),
            fetch(`http://localhost:3000/idnpRecords?IDNP=${clientIDNP}`)
              .then(res => {
                if (!res.ok) throw new Error('IDNP lookup failed');
                return res.json();
              })
              .then(records => {
                if (records.length > 0) {
                  const record = records[0];
                  record.animalCodes.push(...individualAnimals.map(a => a.animalCode));
                  return fetch(`http://localhost:3000/idnpRecords/${record.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(record)
                  });
                } else {
                  return fetch('http://localhost:3000/idnpRecords', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      IDNP: clientIDNP,
                      animalCodes: individualAnimals.map(a => a.animalCode)
                    })
                  });
                }
              }),
            fetch('http://localhost:3000/animalCodeCounter', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ value: currentCounter })
            })
          ]);
        })
        .then(() => {
          const orderTotal = this.calculateTotal(); // Calculate the total price of the order
          localStorage.setItem('currentOrder', JSON.stringify({ clientIDNP, orderDetails: { total: orderTotal } }));
          localStorage.removeItem('isModifying');
          this.$router.push('/mdelivery-payment');
        })
        .catch(error => {
          console.error('Error saving order:', error);
          alert('Eroare la salvarea comenzii. Vă rugăm încercați din nou.');
        });
        
    }
  }
}
</script>

<style scoped>
.cerere-page {
  padding: 32px;
  background-color: var(--light-gray);
}

.client-info {
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 500;
}

.table-container {
  background: white;
  border-radius: var(--radius-md);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  max-width: 1200px;
  margin: 0 auto;
}

.table-container p {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
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

.select-container select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background-color: white;
  font-family: 'Onest', sans-serif;
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