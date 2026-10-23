import api from "./api";

export const getServices = () => api.get("/services").then((r) => r.data);
export const getProjects = (category) => api.get("/projects", { params: category ? { category } : {} }).then((r) => r.data);
export const getProject = (slug) => api.get(`/projects/${slug}`).then((r) => r.data);
export const sendContact = (data) => api.post("/contact", data).then((r) => r.data);
export const subscribe = (email) => api.post("/newsletter", { email }).then((r) => r.data);
