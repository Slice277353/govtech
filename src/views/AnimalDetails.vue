<template>
  <div class="animal-details-page">
    <div class="details-card">
      <h2>Detalii Animal</h2>
      
      <!-- Animal name and identifier -->
      <div class="section">
        <h3>{{ animal.name }}</h3>
        <p>Cod identificare: <strong>{{ animal.identifier }}</strong></p>
      </div>

      <!-- Despre animal section -->
      <div class="section">
        <h3>Despre animal</h3>
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Greutate:</span>
            <span class="detail-value">{{ animal.weight }} kg</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Vârsta la sacrificare:</span>
            <span class="detail-value">{{ animal.ageWhenButchered }} luni</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Vaccinuri:</span>
            <span class="detail-value">{{ animal.vaccines }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Adaosuri hrană:</span>
            <span class="detail-value">{{ animal.foodAdditives }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Data sacrificării:</span>
            <span class="detail-value">{{ animal.dateCut }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Data procesării/ambalării:</span>
            <span class="detail-value">{{ animal.dateProcessed }}</span>
          </div>
        </div>
      </div>

      <!-- Despre furnizor section -->
      <div class="section">
        <h3>Despre furnizor</h3>
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Furnizor:</span>
            <span class="detail-value">{{ supplier.name }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Adresă furnizor:</span>
            <span class="detail-value">{{ supplier.address }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Producător:</span>
            <span class="detail-value">{{ supplier.producer }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Adresă producător:</span>
            <span class="detail-value">{{ supplier.producerAddress }}</span>
          </div>
        </div>
      </div>

      <button class="back-button" @click="goBack">Înapoi</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimalDetails',
  data() {
    return {
      animal: {
        name: 'Vaca',
        identifier: Math.random().toString().slice(2, 10), // Generate random 8-digit code
        weight: 250,
        dateOfBirth: '2023-05-12',
        breed: 'Holstein',
        color: 'Alb cu negru',
        owner: 'Ion Popescu',
        ageWhenButchered: 24,
        vaccines: 'Rabie, Febra aftoasă',
        foodAdditives: 'Vitamine, Minerale',
        dateCut: '2025-04-10',
        dateProcessed: '2025-04-12'
      },
      supplier: {
        name: 'Furnizor SRL',
        address: 'Strada Principală 123, Chișinău',
        producer: 'Producător SA',
        producerAddress: 'Strada Fabricii 45, Bălți'
      }
    };
  },
  methods: {
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.animal-details-page {
  padding: 32px;
  min-height: calc(100vh - 64px);
  background-color: var(--light-gray);
  display: flex;
  justify-content: center;
  align-items: center;
}

.details-card {
  background: white;
  border-radius: var(--radius-md);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.details-card h2 {
  margin-bottom: 24px;
  font-size: 1.8rem;
  color: var(--text-dark);
}

.section {
  margin-bottom: 24px;
}

.section h3 {
  margin-bottom: 16px;
  font-size: 1.4rem;
  color: var(--text-dark);
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: var(--text-dark);
}

.detail-label {
  font-weight: bold;
}

.detail-value {
  color: var(--text-gray);
}

.back-button {
  background-color: var(--primary-blue);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #1557b0;
}
</style>
