const host = 'localhost';
const port = 8080;
const url = endpoint => `http://${host}:${port}/${endpoint}`;

export default {
    fetch: (opt, action) => {
        fetch(opt.path, { method: opt.method, body: opt.body, headers: opt.headers }).then(res => res.json())
        .then(response => {
            action(response)
        })},
    endpoints: {
        getProjects: () => ({
            path: url('project'),
            method: "GET"
        }),
        getSprints: (projectId) => ({
            path: url(`project/${projectId}/sprint`),
            method: "GET"
        }),
        getDeclarations: (projectId, sprintId) => ({
            path: url(`project/${projectId}/sprint/${sprintId}/declaration`),
            method: "GET"
        }),
        declareHours: (projectId, sprintId, userId, data) => ({
            path: url(`project/${projectId}/sprint/${sprintId}/declaration/${userId}`),
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }),
    }
}
