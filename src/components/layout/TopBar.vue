<template>
  <div class="top-bar">
    <router-link to="/" class="logo">
      MAnimals
    </router-link>
    <div class="top-actions">
      <span class="user-info" v-if="isAuthenticated">
        <i class="fas fa-user"></i>
        {{ userData.nume }} {{ userData.prenume }}
      </span>
      <span>Română</span>
      <span class="notifications">
        <i class="fas fa-bell"></i>
        Notificări
      </span>
      <span 
        v-if="isAuthenticated" 
        @click="logout" 
        class="logout-button"
      >
        <i class="fas fa-sign-out-alt"></i>
        Ieșire
      </span>
      <span 
        v-else 
        @click="login" 
        class="login-button"
      >
        <i class="fas fa-sign-in-alt"></i>
        Autentificare
      </span>
    </div>
  </div>
</template>

<script>
import auth from '@/services/auth';

export default {
  name: 'TopBar',
  computed: {
    isAuthenticated() {
      return auth.isAuthenticated;
    },
    userData() {
      return auth.userData || {};
    }
  },
  methods: {
    logout() {
      auth.logout();
      this.$router.push('/login');
    },
    login() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background-color: var(--primary-blue);
  color: white;
}

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
  align-items: center;
}

.top-actions span {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.top-actions span:hover {
  opacity: 0.9;
}

.user-info {
  font-weight: 500;
  cursor: default;
}

.notifications {
  position: relative;
}

.logout-button, .login-button {
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  transition: background-color 0.2s;
}

.logout-button:hover, .login-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
}

/* Responsive design */
@media (max-width: 768px) {
  .top-bar {
    padding: 0 16px;
  }

  .user-info {
    display: none;
  }

  .top-actions {
    gap: 16px;
  }

  .top-actions span i {
    font-size: 16px;
  }

  .notifications span {
    display: none;
  }
}
</style>