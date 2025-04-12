<template>
    <div class="digital-form-page">
      <h1 class="page-title">Digital Form</h1>
      <div class="document-container">
        <iframe
          v-if="documentUrl"
          :src="documentUrl"
          class="document-viewer"
          frameborder="0"
        ></iframe>
        <div v-else class="loading">
          Loading document...
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DigitalForm',
    data() {
      return {
        documentUrl: null // URL-ul către documentul PDF sau alt tip de document
      }
    },
    created() {
      // Aici puteți încărca documentul
      this.loadDocument()
    },
    methods: {
      loadDocument() {
        // Aici puteți adăuga logica pentru încărcarea documentului
        // Exemplu:
        this.documentUrl = '/path/to/your/document.pdf'
      }
    }
  }
  </script>
  
  <style scoped>
  .digital-form-page {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .page-title {
    font-size: 24px;
    font-weight: 500;
    color: var(--text-dark);
    margin-bottom: 24px;
  }
  
  .document-container {
    background: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: 24px;
    min-height: 600px;
  }
  
  .document-viewer {
    width: 100%;
    height: 800px;
  }
  
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    color: var(--text-gray);
  }
  </style>