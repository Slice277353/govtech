<template>
  <div class="home-page">
    <div class="cards-grid">
      <!-- Move Detalii Animal to the first position -->
      <div class="card" @click="goToAnimalDetails">
        <h2>Detalii Animal</h2>
        <button class="card-button">Vizualizați</button>
      </div>

      <!-- Move Mijloace de identificare (CROTALII) to the second position -->
      <div class="card" @click="goToAuth">
        <h2>Mijloace de identificare (CROTALII)</h2>
        <button class="card-button">Comandă on-line</button>
      </div>

      <!-- The rest of the cards remain in their original order -->
      <div class="card">
        <h2>Documente primare</h2>
        <button class="card-button">Accesați</button>
      </div>

      <div class="card">
        <h2>Verificarea crotaliei sau a documentului eliberat</h2>
        <button class="card-button">Cautați</button>
      </div>

      <div class="card">
        <h2>Harta alertelor și date statistice</h2>
        <button class="card-button">Accesați</button>
      </div>

      <div class="card">
        <h2>Cabinet în Sistemului informațional ANSA</h2>
        <button class="card-button">Accesați</button>
      </div>

      <div class="card">
        <h2>Înregistrare animale</h2>
        <button class="card-button">Depune cerere</button>
      </div>

      <div class="card">
        <h2>Cerere LIMS</h2>
        <button class="card-button">Accesați</button>
      </div>

      <div class="card">
        <h2>Solicitare LIMS</h2>
        <button class="card-button">Accesați</button>
      </div>

      <div class="card" @click="goToAdminPanel">
        <h2>Admin Panel</h2>
        <button class="card-button">Gestionați cererile</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    goToAuth() {
      this.$router.push('/login');
    },
    goToAdminPanel() {
      this.$router.push('/admin-panel');
    },
    goToAnimalDetails() {
      this.$router.push('/animal-details');
    }
  }
}
</script>

<style scoped>
.home-page {
  padding: 32px;
  min-height: calc(100vh - 64px);
  background-color: var(--light-gray);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: var(--radius-md);
  padding: 24px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 240px;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.card h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.card-button {
  background-color: var(--primary-blue);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.card-button:hover {
  background-color: #1557b0;
}

@media (max-width: 768px) {
  .home-page {
    padding: 16px;
  }
}
</style>
