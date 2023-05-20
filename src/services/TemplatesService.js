const axios = require('axios');


// Get Template Items

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

export async function getCustomControls() {
    const response = await axios.get('/api/customControls');
    return response.data;
}

export async function getCustomControlsLibrary() {
    const response = await axios.get('/api/customControlsLibrary');
    return response.data;
}

export async function getTemplate(id) {
    const response = await axios.get(`/api/templates/${id}`);
    return response.data[0];
}


// Combined Requests

export async function getAllControls() {
    let templateListEndpoints = [
        '/api/customControls',
        '/api/customControlsLibrary',
    ];
    const response = await axios.all(templateListEndpoints.map((endpoint) => axios.get(endpoint)))
    return response;
}

export async function getTemplatesList() {
    let templateListEndpoints = [
        '/api/templates',
        '/api/templateTypes',
        '/api/customControlsLibrary',
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
        '/api/customControls',
        '/api/customControlsLibrary',
        
    ];
    const response = await axios.all(allTemplateEndpoints.map((endpoint) => axios.get(endpoint)))
    return response;
}


// Update Template Items

export async function updateTemplate(id) {
    let url = `/api/templates/${id}`; 
    const response = await axios.post(url, {
        type: 'Press Release', 
		title: 'EU SF NEW'
    });
    return response.data;
}


// Delete Templates

export async function deleteTemplate(id) {
    let url = `/api/templates/${id}`;
    const response = await axios.delete(url);
    return response.data;
}

// Temp Get Image
export async function getImage() {
    const response = await axios.get('/api/logo');
    return response.data;
}
