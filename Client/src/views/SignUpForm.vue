<template>
  <div class="signup-page">
    <div class="signup-container">
      <h1>Sign Up for MusicApp</h1>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div class="input-group">
          <label for="confirm-email">Confirm Email</label>
          <input type="email" id="confirm-email" v-model="form.confirmEmail" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" required />
        </div>
        <div class="input-group">
          <label for="name">What should we call you?</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
        <div class="input-group">
          <label for="dob">Date of Birth</label>
          <input type="date" id="dob" v-model="form.dob" required />
        </div>
        <div class="input-group">
          <label for="gender">Gender</label>
          <select id="gender" v-model="form.gender" required>
            <option value="" disabled>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button type="submit" class="signup-button">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        email: '',
        confirmEmail: '',
        password: '',
        name: '',
        dob: '',
        gender: '',
      },
      isSubmitting: false, 
    };
  },
  methods: {
    async submitForm() {
      if (this.isSubmitting) return; 
      this.isSubmitting = true; 
      
      if (this.form.email !== this.form.confirmEmail) {
        alert("Emails do not match");
        this.isSubmitting = false; 
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/signup', this.form);
        alert('Form submitted successfully');
        localStorage.setItem('user', JSON.stringify(response.data));
        window.location.href = '/';
      } catch (error) {
        console.error('Error submitting form', error);
        alert('Error submitting form');
      } finally {
        this.isSubmitting = false; 
      }
    },
  },
};
</script>

<style scoped>
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #191414; 
  color: white;
  font-family: Arial, sans-serif;
}

.signup-container {
  background-color: #282828;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.signup-container h1 {
  margin-bottom: 20px;
  color: #1db954;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #3e3e3e;
  color: white;
}

.input-group input:focus,
.input-group select:focus {
  outline: none;
  border: 1px solid #1db954; 
}

.signup-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #1db954; 
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.signup-button:hover {
  background-color: #1ed760; 
}
</style>
