<template>
  <div class="main-content">
    <div class="cards-grid">
      <router-link to="/cerere-crotalii" class="card">
        <div class="card-content">
          <h2>Cerere crontalii</h2>
        </div>
      </router-link>
      <router-link to="/cerere-duplicat" class="card">
        <div class="card-content">
          <h2>Cerere duplicat</h2>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.main-content {
  padding: 32px;
  min-height: calc(100vh - 64px);
  background-color: var(--light-gray);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  text-decoration: none; /* This removes the underline */
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.card-content {
  padding: 24px;
  text-align: center;
}

h2 {
  margin: 0;
  color: var(--text-dark);
  font-size: 24px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .main-content {
    padding: 16px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>