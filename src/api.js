const host = 'localhost';
const port = 8080;
const url = endpoint => `http://sprinter-api.herokuapp.com/${endpoint}`;

export default {
    fetch: (path, action) => {
        fetch(path).then(res => res.json())
        .then(response => {
            action(response)
        })},
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
