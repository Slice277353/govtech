<template>
    <div class="success-page">
      <div class="success-container">
        <i class="fas fa-check-circle success-icon"></i>
        <h1>Te-ai înregistrat cu succes!</h1>
        
        <div class="buttons-container">
          <button @click="goTo('cerere-crotalii')" class="action-button">
            Cerere crotalii
          </button>
          <button @click="goTo('cerere-duplicat')" class="action-button">
            Cerere duplicat
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AuthSuccess',
    methods: {
      goTo(route) {
        this.$router.push(`/${route}`);
      }
    }
  }
  </script>
  
  <style scoped>
  .success-page {
    min-height: calc(100vh - 64px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--light-gray);
    padding: 20px;
  }
  
  .success-container {
    background: white;
    padding: 40px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    text-align: center;
    max-width: 500px;
    width: 100%;
  }
  
  .success-icon {
    font-size: 64px;
    color: #4CAF50;
    margin-bottom: 20px;
  }
  
  h1 {
    color: var(--text-dark);
    margin-bottom: 30px;
  }
  
  .buttons-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 30px;
  }
  
  .action-button {
    padding: 12px 24px;
    border: none;
    border-radius: var(--radius-sm);
    background-color: var(--primary-blue);
    color: white;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;
  }
  
  .action-button:hover {
    background-color: #1557b0;
  }
  
  @media (max-width: 600px) {
    .buttons-container {
      flex-direction: column;
    }
    
    .action-button {
      width: 100%;
    }
  }
  </style>