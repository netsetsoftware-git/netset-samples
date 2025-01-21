<script lang="ts">
    import instance from '$lib/axios';
    import { createEventDispatcher } from 'svelte';
    
    const props = $props()
    const vendors = props.vendors
    const dispatch = createEventDispatcher();
    
    async function notified() {
        console.log(vendors)
        await instance.post("/vendors/notify", vendors)
        dispatch('notifyEvent', { status: 'success' });
    }
</script>

{#if vendors.length>0}
    <div class="flex justify-center items-center m-8">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h1 class="text-2xl font-semibold text-center text-gray-700 mb-4">Send Notification to { vendors.length } vendor(s)</h1>
            <div class="mb-4">
            <label for="inputField" class="block text-sm font-medium text-gray-600">Message</label>
                <textarea id="message" name="message" 
                    placeholder="Enter your message" required
                    class="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </textarea>
            </div>

            <div class="mb-4">
            <button onclick={notified} type="submit" class="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Send
            </button>
            </div>
        </div>
    </div>
  {/if}