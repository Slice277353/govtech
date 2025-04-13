<template>
  <div class="home-page">
    <div class="cards-grid">
      <!-- Detalii Animal card with input field -->
      <div class="card" @click="goToAnimalDetails">
        <h2><br>Detalii Animal</h2>
        <input
          id="animal-id"
          type="text"
          v-model="animalId"
          class="input-field"
          placeholder="Introduceți ID-ul animalului"
          @click.stop
        />
        <button class="card-button" @click.stop="goToAnimalDetails">Vizualizați</button>
      </div>

      <!-- Mijloace de identificare (CROTALII) card -->
      <div class="card" @click="goToAuth">
        <h2><br>Mijloace de identificare <br>(CROTALII)</h2>
        <button class="card-button">Comandă on-line</button>
      </div>

      <!-- The rest of the cards remain in their original order
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
      </div> -->

      <div class="card" @click="goToAdminPanel">
        <h2><br>Admin Panel</h2>
        <button class="card-button">Gestionați cererile</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      animalId: '' // Bind this to the input field
    };
  },
  methods: {
    goToAuth() {
      this.$router.push('/login');
    },
    goToAdminPanel() {
      this.$router.push('/admin-panel');
    },
    goToAnimalDetails() {
      console.log(`Navigating to animal details with ID: ${this.animalId}`);
      this.$router.push('/animal-details');
    }
  }
};
</script>

<style scoped>
.home-page {
  padding: 32px;
  min-height: calc(100vh - 64px);
  background-color: var(--light-gray);
}

.cards-grid {
  display: grid;
  grid-template-rows: 0.5fr 1fr 1fr;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.card {
  grid-row: 2;
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
  /* min-height: 240px; */
  height: 100%;
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

/* Add styles for the input field and label */
.input-label {
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
  color: var(--text-dark);
}

.input-field {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid var(--light-gray);
  border-radius: var(--radius-sm);
  font-size: 1rem;
}

@media (max-width: 768px) {
  .home-page {
    padding: 16px;
  }
}
</style>
