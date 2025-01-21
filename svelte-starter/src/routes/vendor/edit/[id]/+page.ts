import type { PageLoad } from './$types';
import axios from '../../../../lib/axios';

export const load: PageLoad = async ({ params }) => {
    const response = await axios.get(`/vendors/${params.id}`)
    return response.data.data
};