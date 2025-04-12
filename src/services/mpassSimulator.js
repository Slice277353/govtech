export default {
    userData: {
      idnp: "2000000000000",
      nume: "Popescu",
      prenume: "Ion",
      email: "ion.popescu@example.com",
      dataNasterii: "2000-01-01",
      cetatenie: "MD"
    },
  
    async authenticate() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulăm erori aleatorii (10% șansă)
          if (Math.random() < 0.01) {
            reject(new Error('Serviciul MPass momentan nu este disponibil'));
            return;
          }
          resolve({
            success: true,
            userData: this.userData,
            token: "simulated_mpass_token_" + Math.random()
          });
        }, 2000);
      });
    }
  };