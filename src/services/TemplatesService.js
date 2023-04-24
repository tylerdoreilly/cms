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

// Combined Requests
export async function getTemplatesList() {
    let templateListEndpoints = [
        '/api/templates',
        '/api/templateTypes',
    ];
    const response = await axios.all(templateListEndpoints.map((endpoint) => axios.get(endpoint)))
    return response;
}

export async function getAllTemplateData(id) {
    let allTemplateEndpoints = [
        `/api/templates/${id}`,
        '/api/templateItems',
        '/api/templateItemsCustom',
        '/api/templateTypes',
    ];
    const response = await axios.all(allTemplateEndpoints.map((endpoint) => axios.get(endpoint)))
    return response;
}