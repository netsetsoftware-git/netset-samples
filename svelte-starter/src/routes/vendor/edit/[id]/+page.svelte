<script lang="ts">
    import axios from '../../../../lib/axios';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';

    let { data }: { data: PageData } = $props();
    const vendor = data.vendor

    let formData = $state({ name: vendor.name, riskLevel: vendor.riskLevel });

    async function handleSubmit(event:any) {
      event.preventDefault();
      await axios.put(`/vendors/${vendor._id}`, formData)
      goto('/vendor/view');
    }
  
    function reset() {
      formData = { name: '',riskLevel: '' }
    }
  </script>
  
  <main class="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Edit Vendor</h1>
  
    <form onsubmit={handleSubmit} class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Vendor Name</label>
        <input
          id="name"
          type="text"
          bind:value={formData.name}
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
          onclick={reset}
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </form>
  </main>
  