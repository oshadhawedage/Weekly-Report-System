import axios from "./axios";


// GET PROJECTS
export const getProjects = async () => {

    const response = await axios.get("/projects");

    return response.data;

};


// CREATE PROJECT
export const createProject = async (projectData) => {

    const response = await axios.post(
        "/projects",
        projectData
    );

    return response.data;

};


// UPDATE PROJECT
export const updateProject = async (id, projectData) => {

    const response = await axios.put(
        `/projects/${id}`,
        projectData
    );

    return response.data;

};


// DELETE PROJECT
export const deleteProject = async (id) => {

    const response = await axios.delete(
        `/projects/${id}`
    );

    return response.data;

};

// GET LOGGED USER PROJECTS
export const getMyProjects = async () => {

    const response = await axios.get("/projects/my");

    return response.data;

};

// Get members

export const getMembers = async () => {

    const response = await axios.get("/projects/members");

    return response.data;

};


// Assign members

export const assignUsersToProject = async (projectId, userIds) => {

    const response = await axios.post(

        `/projects/${projectId}/users`,

        {

            userIds

        }

    );

    return response.data;

};