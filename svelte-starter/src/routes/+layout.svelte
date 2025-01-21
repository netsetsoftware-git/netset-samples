<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<nav class="m-4 flex justify-center">
	<a href="/vendor/add" class="bg-green-500 text-white font-bold m-8 p-4 rounded hover:bg-green-600 focus:outlinenone focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">Add Vendor</a>
	<a href="/vendor/view" class="bg-blue-500 text-white font-bold m-8 p-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">View Vendors</a>
</nav>

{@render children()}
