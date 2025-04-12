<template>
  <div class="animal-details-page">
    <div class="details-card">
      <h2>Detalii Animal</h2>
      <div class="details-grid">
        <div class="detail-item">
          <span class="detail-label">Greutate:</span>
          <span class="detail-value">{{ animal.weight }} kg</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Data nașterii:</span>
          <span class="detail-value">{{ animal.dateOfBirth }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Rasă:</span>
          <span class="detail-value">{{ animal.breed }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Culoare:</span>
          <span class="detail-value">{{ animal.color }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Proprietar:</span>
          <span class="detail-value">{{ animal.owner }}</span>
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
        weight: 250,
        dateOfBirth: '2023-05-12',
        breed: 'Holstein',
        color: 'Alb cu negru',
        owner: 'Ion Popescu'
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

.details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 24px;
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
