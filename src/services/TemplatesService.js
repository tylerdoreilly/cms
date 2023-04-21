const axios = require('axios');

export async function getAllTemplates() {
    const response = await axios.get('/api/templates');
    return response.data;
}

export async function getTemplateTypes() {
    const response = await axios.get('/api/templateTypes');
    return response.data;
}

export async function getTemplateItems() {
    const response = await axios.get('/api/templateItems');
    return response.data;
}

export async function getCustomTemplateItems() {
    const response = await axios.get('/api/templateItemsCustom');
    return response.data;
}

export async function getTemplate(id) {
    const response = await axios.get(`/api/templates/${id}`);
    return response.data[0];
}

// export async function createTemplate(data) {
//     const response = await axios.post(`/api/template`, {user: data});
//     return response.data;
// }

export async function updateTemplate(id) {
    let url = `/api/templates/${id}`; 
    const response = await axios.post(url, {
        type: 'Press Release', 
		title: 'EU SF NEW'
    });
    return response.data;
}
