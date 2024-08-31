<template>
    <div class="login-page">
      <div class="login-container">
        <h1>Login to MusicApp</h1>
        <form @submit.prevent="submitForm">
          <div class="input-group">
            <label for="name">Enter UserName</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          <div class="input-group">
            <label for="password">Enter Password</label>
            <input type="password" id="password" v-model="form.password" required />
          </div>
          <button type="submit" class="login-button">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LoginForm',
    data() {
      return {
        form: {
          name: '',
          password: '',
        },
        isSubmitting: false,
      };
    },
    methods: {
      async submitForm() {
        if (this.isSubmitting) return;
        this.isSubmitting = true;
  
        try {
          const response = await axios.post('http://localhost:3000/api/login', this.form);
          localStorage.setItem('user', JSON.stringify(response.data));
          //this.$emit('login-success', response.data);
          window.location.href = '/';
        } catch (error) {
          console.error('Error logging in', error);
          alert('Invalid username or password');
        } finally {
          this.isSubmitting = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: #191414; 
    color: white;
    font-family: Arial, sans-serif;
  }
  
  .login-container {
    background-color: #282828;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    max-width: 400px;
    width: 100%;
    text-align: center;
  }
  
  .login-container h1 {
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
  
  .input-group input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #3e3e3e;
    color: white;
  }
  
  .input-group input:focus {
    outline: none;
    border: 1px solid #1db954; 
  }
  
  .login-button, .close-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #1db954; 
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .login-button:hover, .close-button:hover {
    background-color: #1ed760; 
  }
  </style>
  

  