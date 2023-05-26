const axios = require('axios');


// Get Projects

export async function getAllProjects() {
    const response = await axios.get('/api/projects');
    return response.data;
}

export async function getProject(id) {
    const response = await axios.get(`/api/projects/${id}`);
    return response.data;
}


// Update Projects

export async function updateProject(id) {
    let url = `/api/templates/${id}`; 
    const response = await axios.post(url, {
        type: 'Press Release', 
		title: 'EU SF NEW'
    });
    return response.data;
}


// Delete Projects

export async function deleteProject(id) {
    let url = `/api/templates/${id}`;
    const response = await axios.delete(url);
    return response.data;
}

