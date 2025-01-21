<script lang="ts">
    import { onMount } from 'svelte';
    import axios from '../../../lib/axios';
    import { type Vendor } from '../../../model/model';
    import Notify from '../../../components/notify.svelte';

    let vendors : Vendor[] = $state([]);
    onMount(async () => {
      getVendors()
    })

    const filter = $state({name:'',risk:''})
    async function getVendors() {
      const params : any = {}
      if(filter.name) params.name=filter.name
      if(filter.risk) params.riskLevel=filter.risk

      const response = await axios.get('/vendors', {
        params : params
      })
      vendors = response.data.data.vendors
    }

    async function deleteVendor(index:number) {
      const id = vendors[index]._id

      await axios.delete(`/vendors/${id}`)
      vendors.splice(index, 1)
      vendors = [...vendors ]
    }

    let selectedVendors : string[] = $state([])
    async function deleteBulk() {
      await axios.delete(`/vendors`, { data : selectedVendors })
      
      vendors = vendors.filter(vendor => !selectedVendors.includes(vendor._id))
      selectedVendors = []
    }

    let allChecked = $state(false);
    function selectAll() {
      if(allChecked) {
        selectedVendors = vendors.map(vendor => vendor._id)
      } else {
        selectedVendors = []
      }
    }

    function selectOne(id:string) {
      if(selectedVendors.includes(id)) {
        const index = selectedVendors.findIndex(vendorId => vendorId==id)
        selectedVendors.splice(index, 1)
      } else {
        selectedVendors.push(id)
      }
    }

    function resetFilter() {
      filter.name = ''
      filter.risk = ''
      getVendors()
    }

    let isNotifying = $state(false)
    function notify() {
      isNotifying = !isNotifying
    }

    function onMessage(event:any) {
      const status = event.detail.status
      if(status == 'success') {
        allChecked = false

        notify()
        selectAll()
      }
      
    }
  </script>
  
  <main class="p-6 mx-auto bg-white rounded-lg shadow-md">
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Existing Vendors</h1>
      
      <div class="m-4 p-4 bg-gray-100 rounded-lg shadow-md mx-auto w-full">
        {#if selectedVendors.length > 0 }
        <div class="flex justify-end">
          <button onclick={deleteBulk} class="m-4 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50">
            Delete Selected
          </button>

          <button onclick={notify} class="m-4 bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
            Notify
          </button>
        </div>
        {/if}
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Apply Filter</h2>
        <form class="flex flex-col sm:flex-row items-start space-x-4 space-y-4 sm:space-y-0">
          <div>
            <label for="search" class="block text-sm font-medium text-gray-700 mb-1">
              Vendor Name
            </label>
            <input
              bind:value={filter.name}
              type="text"
              id="search"
              name="search"
              placeholder="Enter Vendor Name"
              class="block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label for="risk" class="block text-sm font-medium text-gray-700 mb-1">
              Risk Level
            </label>
            <select
              bind:value={filter.risk}
              id="risk"
              name="risk"
              class="block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <div class="mt-auto">
            <button
              onclick={getVendors}
              type="submit"
              class="block px-4 py-2 border bg-indigo-600 text-white font-medium text-sm rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Apply Filters
            </button>

            <button
              onclick={resetFilter}
              type="submit"
              class="block px-4 py-2 border bg-red-600 text-white font-medium text-sm rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Reset Filters
            </button>
          </div>
        </form>
      </div>
      
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border text-left text-gray-700">
              <input onchange={() => selectAll() } bind:checked={allChecked} id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            </th>
            <th class="py-2 px-4 border text-left text-gray-700">Sr. No</th>
            <th class="py-2 px-4 border text-left text-gray-700">ID</th>
            <th class="py-2 px-4 border text-left text-gray-700">Name</th>
            <th class="py-2 px-4 border text-left text-gray-700">Email</th>
            <th class="py-2 px-4 border text-left text-gray-700">Contact</th>
            <th class="py-2 px-4 border text-left text-gray-700">Risk</th>
            <th class="py-2 px-4 border text-left text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {#each vendors as vendor, index}
            <tr class="hover:bg-gray-100">
              <td class="py-2 px-4 border text-gray-600">
                <input checked={selectedVendors.includes(vendor._id)} onclick={() => selectOne(vendor._id) } id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              </td>
              <td class="py-2 px-4 border text-gray-600">{index+1}</td>
              <td class="py-2 px-4 border text-gray-600">{vendor._id}</td>
              <td class="py-2 px-4 border text-gray-600">{vendor.name}</td>
              <td class="py-2 px-4 border text-gray-600">{vendor.email}</td>
              <td class="py-2 px-4 border text-gray-600">{vendor.contact}</td>
              <td class="py-2 px-4 border text-gray-600">{vendor.riskLevel}</td>
              <td class="py-2 px-4 border">
                <button class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
                  <a href="/vendor/edit/{vendor._id}">Update</a>
                </button>

                <button onclick={() => deleteVendor(index)} class="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50">
                  Delete
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>

      {#if isNotifying}
        <Notify vendors={selectedVendors} on:notifyEvent={onMessage}/>
      {/if}
    </div>
  </main>
  