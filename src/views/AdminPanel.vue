<template>
  <div class="admin-panel">
    <h1>Admin Panel</h1>
    <div class="requests-container">
      <table>
        <thead>
          <tr>
            <th>IDNP</th>
            <th>Nume</th>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(request, index) in requests" 
            :key="index" 
            @click="openRequestDetails(request)"
            class="clickable-row"
          >
            <td>{{ request.idnp }}</td>
            <td>{{ request.name }}</td>
            <td>{{ request.date }}</td>
            <td>{{ request.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="selectedRequest" class="modal-overlay" @click.self="closeRequestDetails">
      <div class="modal-content">
        <h2>Detalii Cerere</h2>
        <p><strong>IDNP:</strong> {{ selectedRequest.idnp }}</p>
        <p><strong>Nume:</strong> {{ selectedRequest.name }}</p>
        <p><strong>Data:</strong> {{ selectedRequest.date }}</p>
        <p><strong>Status:</strong> {{ selectedRequest.status }}</p>
        <h3>Articole Comandate</h3>
        <table>
          <thead>
            <tr>
              <th>Animal</th>
              <th>Cantitate</th>
              <th>Preț unitar</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in selectedRequest.items" :key="index">
              <td>{{ item.animalTypeName }}</td>
              <td>
                <input 
                  type="number" 
                  v-model.number="item.quantity" 
                  class="editable-input"
                  :disabled="!isModifying"
                  @input="updateRowTotal(item)"
                />
              </td>
              <td>{{ item.unitPrice }} MDL</td>
              <td>{{ item.rowTotal }} MDL</td>
            </tr>
          </tbody>
        </table>
        <div class="actions">
          <button v-if="!isModifying" @click="acceptRequest(selectedRequest)" class="accept-btn">Acceptă</button>
          <button v-if="!isModifying" @click="enableModification" class="modify-btn">Modifică</button>
          <button v-if="!isModifying" @click="denyRequest(selectedRequest)" class="deny-btn">Respinge</button>
          <button v-if="isModifying" @click="saveChanges" class="save-btn">Salvează</button>
          <button v-if="isModifying" @click="cancelModification" class="cancel-btn">Anulează</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPanel',
  data() {
    return {
      requests: [], // List of cerere (requests)
      selectedRequest: null, // Currently selected request
      isModifying: false // Flag to enable/disable modification
    };
  },
  created() {
    this.fetchRequests();
  },
  methods: {
    fetchRequests() {
      fetch('http://localhost:3000/clients')
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch requests');
          return response.json();
        })
        .then(clients => {
          this.requests = clients.flatMap(client =>
            client.orders.map(order => ({
              idnp: client.IDNP,
              name: `${client.firstName || 'Ion'} ${client.lastName || 'Popescu'}`,
              date: order.date,
              status: order.status,
              items: order.items
            }))
          );
        })
        .catch(error => {
          console.error('Error fetching requests:', error);
          alert('Eroare la încărcarea cererilor.');
        });
    },
    openRequestDetails(request) {
      this.selectedRequest = JSON.parse(JSON.stringify(request)); // Deep copy to avoid direct mutation
      this.isModifying = false;
    },
    closeRequestDetails() {
      this.selectedRequest = null;
      this.isModifying = false;
    },
    enableModification() {
      this.isModifying = true;
    },
    cancelModification() {
      this.isModifying = false;
    },
    updateRowTotal(item) {
      item.rowTotal = item.unitPrice * item.quantity;
    },
    saveChanges() {
      const index = this.requests.findIndex(r => r.idnp === this.selectedRequest.idnp);
      if (index !== -1) {
        this.requests[index] = JSON.parse(JSON.stringify(this.selectedRequest)); // Save changes
        alert('Modificările au fost salvate cu succes.');
        this.isModifying = false; // Return to the initial state
      }
    },
    acceptRequest(request) {
      alert(`Cererea cu IDNP ${request.idnp} a fost acceptată.`);
      this.removeRequest(request);
    },
    denyRequest(request) {
      if (confirm(`Sunteți sigur că doriți să respingeți cererea cu IDNP ${request.idnp}?`)) {
        alert(`Cererea cu IDNP ${request.idnp} a fost respinsă.`);
        this.removeRequest(request);
      }
    },
    removeRequest(request) {
      const index = this.requests.findIndex(r => r.idnp === request.idnp);
      if (index !== -1) {
        this.requests.splice(index, 1); // Properly remove the request
        this.selectedRequest = null;
      }
    }
  }
};
</script>

<style scoped>
.admin-panel {
  padding: 32px;
  background-color: var(--light-gray);
  min-height: 100vh;
}

h1 {
  margin-bottom: 24px;
  color: var(--text-dark);
  font-size: 24px;
  font-weight: 500;
}

.requests-container {
  background: white;
  border-radius: var(--radius-md);
  padding: 24px;
  box-shadow: var(--shadow-sm);
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

.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s;
}

.clickable-row:hover {
  background-color: var(--light-gray);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: var(--radius-md);
  padding: 24px;
  box-shadow: var(--shadow-md);
  width: 90%;
  max-width: 600px;
}

.editable-input {
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
}

.actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}

.accept-btn {
  background-color: #34A853;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.modify-btn {
  background-color: var(--primary-blue);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.deny-btn {
  background-color: #EA4335;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.save-btn {
  background-color: #34A853;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.cancel-btn {
  background-color: #EA4335;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
</style>
