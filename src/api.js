const host = 'localhost';
const port = 8080;
const url = endpoint => `http://${host}:${port}/${endpoint}`;

export default {
    fetch: fetch, //TODO implement generic fetch
    endpoints: {
        getProjects: () => ({
            path: url('project'),
            method: 'GET'
        }),
        getSprints: (projectId) => ({
            path: url(`project/${projectId}/sprint`)
        }),
        getDeclarations: (projectId, sprintId) => ({
            path: url(`project/${projectId}/sprint/${sprintId}/declaration`)
        })
    }
}
