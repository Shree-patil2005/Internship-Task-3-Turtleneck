import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const validate = () => {
    const err = {};

    if (!formData.user_id.trim()) {
      err.user_id = 'User ID is required';
    }

    if (!formData.name.trim()) {
      err.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      err.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      err.email = 'Email is invalid';
    }

    if (!formData.password) {
      err.password = 'Password is required';
    } else if (formData.password.length < 6) {
      err.password = 'Password must be at least 6 characters';
    }

    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setAuthError(''); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const validCredentials = [
        {
          user_id: '001',
          name: 'shree',
          email: 'shree@gmail.com',
          password: 'shree123'
        },
        {
          user_id: '002',
          name: 'rohit',
          email: 'rohit@gmail.com',
          password: 'rohit456'
        }
      ];

      const isValid = validCredentials.some(
        (cred) =>
          cred.user_id === formData.user_id &&
          cred.name === formData.name &&
          cred.email === formData.email &&
          cred.password === formData.password
      );

      if (isValid) {
        alert('Login successful!');
      } else {
        setAuthError('Invalid credentials.');
      }
    }
  };

  return (
    <div class="p-10 m-10 border border-black-100 rounded-lg w-[400px] block mx-auto">
      <form onSubmit={handleSubmit}>
        <h2 class="text-2xl font-bold mb-6 text-center">Admin Pannel Login</h2>

        {authError && <p class="text-red-500 text-center mb-4">{authError}</p>}

        <div class="mb-4">
          <label class="block mb-1 font-medium">User ID:-</label>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            class=" px-4 py-2 border rounded block mx-auto "
          />
          {errors.user_id && <p class="text-red-500 text-sm">{errors.user_id}</p>}
        </div>

        <div class="mb-4">
          <label class="block mb-1 font-medium">Name:-</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            class=" px-4 py-2 border rounded block mx-auto"
          />
          {errors.name && <p class="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div class="mb-4">
          <label class="block mb-1 font-medium">Email:-</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            class=" px-4 py-2 border rounded block mx-auto"
          />
          {errors.email && <p class="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div class="mb-6">
          <label class="block mb-1 font-medium">Password:-</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            class=" px-4 py-2 border rounded block mx-auto"
          />
          {errors.password && <p class="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button
          type="submit"
          class="block mx-auto bg-green-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;