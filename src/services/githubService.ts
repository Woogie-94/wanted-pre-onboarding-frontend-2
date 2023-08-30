import axios from "axios";

const githubService = axios.create();
githubService.defaults.baseURL = "https://www.pre-onboarding-selection-task.shop";

githubService.interceptors.request.use(config => {
  if (import.meta.env.VITE_GITHUB_AUTH_TOKEN) {
    config.headers.Authorization = `Bearer ${import.meta.env.VITE_GITHUB_AUTH_TOKEN}`;
  }

  return config;
});

export default githubService;
