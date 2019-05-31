const host = "localhost";
const port = 8080;
const url = endpoint => `http://${host}:${port}/${endpoint}`;
let base64 = require('base-64');

export default {

    fetch: (opt, action) => {
        fetch(opt.path, {
            method: opt.method,
            body: opt.body,
            headers: opt.headers,
            credentials: 'include'
        })
            .then(res => res.json())
            .then(response => {
                action(response);
            });
    },
    fetchNoContent: (opt, action) => {
        fetch(opt.path, {
            method: opt.method,
            body: opt.body,
            headers: opt.headers,
            credentials: 'include'
        }).then(response => {
            action(response);
        });
    },
    fetchHandleError: (opt, action, errorCallback) => {
        fetch(opt.path, {
            method: opt.method,
            body: opt.body,
            headers: opt.headers,
            credentials: 'include'
        })
            .then(res => res.json())
            .then(response => {
                action(response);
            })
            .catch(errorCallback);
    },
    endpoints: {
        getProjects: () => ({
            path: url(`project`),
            method: "GET"
        }),

        getSprints: projectId => ({
            path: url(`project/${projectId}/sprint`),
            method: "GET"
        }),

        getDeclarations: (projectId, sprintId) => ({
            path: url(`project/${projectId}/sprint/${sprintId}/declaration`),
            method: "GET"
        }),

        getUsers: () => ({
            path: url(`user`)
        }),

        addUser: (data) => ({
            path: url(`user`),
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }),

        declareHours: (projectId, sprintId, userId, data) => ({
            path: url(
                `project/${projectId}/sprint/${sprintId}/declaration/${userId}`
            ),
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }),
        createProject: (data) => ({
            path: url(
                `project`
            ),
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }),
        closeProject: (projectId, data) => ({
            path: url(
                `project/${projectId}`
            ),
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }),

        setProjectMembership: (projectId, userId, data) => ({
            path: url(
                `project/${projectId}/membership/${userId}/`
            ),
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }),

        createSprint: (projectId, data) => ({
            path: url(
                `project/${projectId}/sprint`
            ),
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }),

        closeSprint: (projectId, sprintId, data) => ({
            path: url(
                `project/${projectId}/sprint/${sprintId}`
            ),
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }),

        signIn: (login, password) => ({
            path: url(
              `signin`
            ),
            method: "GET",
            headers: {
                'Authorization': `Basic ${base64.encode(login + ":" + password)}`
            }
        }),

        signOut: () => ({
            path: url(
                `signout`
            ),
            method: "GET"
        })
    }
};
