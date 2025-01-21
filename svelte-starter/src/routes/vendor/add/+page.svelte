<script lang="ts">
    import axios from '../../../lib/axios';
    import type { Vendor } from '../../../model/model';
  
    let formData = {
      name: '',
      email:'',
      contact:'',
      riskLevel: 'Low'
    };
  
    let responseMessage = '';
    async function handleSubmit() {
      try {
        const response = await axios.post('/vendors', formData)
        responseMessage = `${response.data.message}`;
        reset()
      } catch (err:any) {
        responseMessage = `Error: ${err.data.message}`;
      }
    }
  
    function reset() {
      formData = { } as Vendor
    }
  </script>
  
  <main class="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Add Vendor</h1>
  
    <form on:submit={handleSubmit} class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          bind:value={formData.name}
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          bind:value={formData.email}
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label for="contact" class="block text-sm font-medium text-gray-700">Contact</label>
        <input
          id="contact"
          type="text"
          bind:value={formData.contact}
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Risk Level</label>
        <select bind:value={formData.riskLevel} id="options" name="options" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
  
      <div class="flex justify-end space-x-3">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        >
          Submit
        </button>
        <button
          type="button"
          on:click={reset}
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </form>
  
    <!-- Response Message -->
    {#if responseMessage}
      <p class="mt-6 text-sm text-green-600">{responseMessage}</p>
    {/if}
  </main>
  