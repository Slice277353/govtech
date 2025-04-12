<!-- src/components/layout/TopBar.vue -->
<template>
    <div class="top-bar">
      <router-link to="/" class="logo">
        MAnimals
      </router-link>
      <div class="top-actions">
        <span>Română</span>
        <span>Notificări</span>
        <span>Ieșire</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TopBar'
  }
  </script>
  
  <style scoped>
  .logo {
    font-size: 18px;
    font-weight: 500;
    color: white;
    text-decoration: none;
    cursor: pointer;
  }
  
  .logo:hover {
    opacity: 0.9;
  }
  
  .top-actions {
    display: flex;
    gap: 20px;
    font-size: 14px;
  }
  
  .top-actions span {
    cursor: pointer;
  }
  
  .top-actions span:hover {
    opacity: 0.9;
  }
  </style>