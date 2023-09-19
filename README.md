# cra-template-typescript

This is a TypeScript template for [Create React App](https://github.com/facebook/create-react-app).

To use this template, add `--template fluentui-dashboard` when creating a new app.

For example:

```sh
npx create-react-app my-app --template fluentui-dashboard

# or

yarn create react-app my-app --template fluentui-dashboard
```

## Auth settings
```config
REACT_APP_BACKEND_API_URL=http://localhost:7071/v1
REACT_APP_REDIRECT_URI=http://localhost:3000/
REACT_APP_TENANT_ID=<Your tenant Id>
REACT_APP_PORTAL_CLIENT_ID=<Your application/Client Id>
REACT_APP_SCOPES=<Scope(s)>
REACT_APP_ADMIN_ROLE=<Admin role>
REACT_APP_VIEWER_ROLE=<Viewer role>
```

# Testing features
For the top left menu find options to show message bar success and errors and toggle progressbar.

For more information, please refer to:

- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped with Create React App.
