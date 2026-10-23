import api from "./api";

const toArray = (r) => (Array.isArray(r.data) ? r.data : []);

export const getServices = () => api.get("/services").then(toArray);
export const getProjects = (category) => api.get("/projects", { params: category ? { category } : {} }).then(toArray);
export const getProject = (slug) => api.get(`/projects/${slug}`).then((r) => r.data);
export const sendContact = (data) => api.post("/contact", data).then((r) => r.data);
export const subscribe = (email) => api.post("/newsletter", { email }).then((r) => r.data);
