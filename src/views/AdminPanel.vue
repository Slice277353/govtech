<template>
  <div class="admin-panel">
    <h1>Admin Panel</h1>
    
    <!-- Chart Section -->
    <div class="chart-container">
      <h2>Comenzi pe zile</h2>
      <div class="chart-wrapper">
        <canvas ref="ordersChart"></canvas>
      </div>
    </div>

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
            <td>{{ formatDate(request.date) }}</td>
            <td>{{ request.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Rest of your modal code remains the same -->
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'AdminPanel',
  data() {
    return {
      requests: [],
      selectedRequest: null,
      ordersChart: null
    };
  },
  created() {
    this.fetchRequests();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('ro-RO');
    },
    async fetchRequests() {
      try {
        const response = await fetch('http://localhost:3000/clients');
        if (!response.ok) throw new Error('Failed to fetch requests');
        
        const clients = await response.json();
        this.requests = clients.flatMap(client =>
          client.orders.map(order => ({
            idnp: client.IDNP,
            name: `${client.firstName || 'Ion'} ${client.lastName || 'Popescu'}`,
            date: order.date,
            status: order.status,
            items: order.items
          }))
        );

        this.renderChart(this.requests);
      } catch (error) {
        console.error('Error fetching requests:', error);
        alert('Eroare la încărcarea cererilor.');
      }
    },
    renderChart(requests) {
      // Destroy previous chart if exists
      if (this.ordersChart) {
        this.ordersChart.destroy();
      }

      // Group orders by date
      const ordersByDate = requests.reduce((acc, request) => {
        const date = new Date(request.date).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      // Sort dates chronologically
      const sortedDates = Object.keys(ordersByDate).sort();
      const orderCounts = sortedDates.map(date => ordersByDate[date]);

      // Get canvas context
      const ctx = this.$refs.ordersChart.getContext('2d');

      // Create new chart
      this.ordersChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: sortedDates,
          datasets: [{
            label: 'Număr de comenzi',
            data: orderCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.parsed.y} comenzi`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                precision: 0
              }
            }
          }
        }
      });
    },
    // ... rest of your methods remain unchanged
  },
  beforeUnmount() {
    // Clean up chart when component is destroyed
    if (this.ordersChart) {
      this.ordersChart.destroy();
    }
  }
};
</script>

<style scoped>
/* Add these new styles */
.chart-container {
  background: white;
  border-radius: var(--radius-md);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
}

.chart-container h2 {
  margin-bottom: 16px;
  color: var(--text-dark);
  font-size: 18px;
  font-weight: 500;
}

.chart-wrapper {
  position: relative;
  height: 300px;
  width: 100%;
}

/* Rest of your existing styles remain the same */
</style>