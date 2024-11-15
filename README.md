# React Role

[![npm](https://img.shields.io/npm/v/@permify/react-role?style=flat-square)](https://www.npmjs.com/package/@permify/react-role)
[![Twitter Follow](https://img.shields.io/twitter/follow/GetPermify?style=social)](https://twitter.com/GetPermify)
[![Discord](https://img.shields.io/discord/950799928047833088.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/MJbUjwskdH)

React Role is lightweight role based access management solution which provides components, hooks, and helper methods for controlling access checks and user permissions throughout your entire React application.

# Installation

Use npm to install:

```shell
npm install @permify/react-role
```

Use yarn to install:

```shell
yarn add @permify/react-role
```

# How to use

## `PermifyProvider`

Wrap the part of your application where you want to perform access checks with PermifyProvider. You should pass some props to PermifyProvider in order to utilize from Permify components, hooks and helper methods.

```javascript
import React from "react";
import { PermifyProvider } from "@permify/react-role";

const App = () => {
    return (
        <PermifyProvider>
            {/* Application layer, Routes, ThemeProviders etc. */}
        </PermifyProvider>;
    )
};

export default App;
```

### User Identification

In order to check user roles or permissions, you should set logged in user with `setUser` function. Our advice is call this method in your login functions promise.

Set the user using the `usePermify` hook:

```javascript

import { usePermify } from '@permify/react-role';

...

const { setUser } = usePermify();

const login = async (e) => {
    const response = await login(email, password);

    setUser({
       id: "2",
       roles: ["admin", "manager"],
       permissions: ["post-create", "user-delete", "content-show"]
    })

    //
    // Continue authentication flow
    //
};
```

Or using `PermifyContext`:

```javascript
import React from "react";
import { PermifyContext } from "@permify/react-role";

const AuthComponent = () => {
    const login = (setUser) => {
        return async (event) => {
            const response = await login(email, password);

            setUser({
                id: "2",
                roles: ["admin", "manager"],
                permissions: ["post-create", "user-delete", "content-show"]
            })

            //
            // Continue authentication flow
            //
        };
    };

    return (
        <PermifyContext.Consumer>
            {({ setUser }) => (
                <form onSubmit={login(setUser)}>
                    {/* form layer */}
                </form>
            )}
        </PermifyContext.Consumer>;
    )
};

export default AuthComponent;
```

## `HasAccess`

HasAccess is a wrapper component that you can wrap around components or UI Layers that should only be accessible to users have authorization.

You can check roles and permissions of the user with giving them as props.

```javascript
import React from "react";
import { HasAccess } from "@permify/react-role";

const AnyComponent = () => {
    return (
        ..
        ..

        <HasAccess
            roles={["admin", "manager"]}
            permissions={["user-delete"]}
            renderAuthFailed={<p>You are not authorized to access!</p>}
            isLoading={<Spinner/>}
        >
            <button type="button"> Delete </button>
        </HasAccess>

        ..
        ..
    )
};

export default App;
```

## `isAuthorized(roleNames, permissionNames)`

isAuthorized is a helper function that returns a Promise which resolves with true if the user is authorized for action with the given parameters, if not it resolves with false.

You should call it inside a conditional logic structure; for ex. if check for fetching protected information.

Using isAuthorized through the usePermify hook:

```javascript
import React, {useState, useEffect} from "react";
import { usePermify } from "@permify/react-role";

const AnyComponent = () => {
    const { isAuthorized, isLoading } = usePermify();

    useEffect(() => {
        const fetchData = async () => {
            // Pass roles and permissions accordingly
            // You can send empty array or null for first param to check permissions only
            if (await isAuthorized(["admin", "manager"], "user-delete")) {
                // request protected info from serverß
            }
        };

        fetchData();
    },[]);

    return (
        <>
            {isLoading && <span>Loading...</span>}
            {dataFetched &&
                //render protected component, UI Layers etc.
            }
        </>;
    )
};

export default AnyComponent;
```

## Stargazers

[![Stargazers repo roster for @Permify/react-role](https://reporoster.com/stars/Permify/react-role)](https://github.com/Permify/react-role/stargazers)

<h2 align="left">:heart: Let's get connected:</h2>

<p align="left">
<a href="https://twitter.com/GetPermify">
  <img alt="guilyx | Twitter" width="50px" src="https://user-images.githubusercontent.com/43545812/144034996-602b144a-16e1-41cc-99e7-c6040b20dcaf.png"/>
</a>
<a href="https://www.linkedin.com/company/permifyco">
  <img alt="guilyx's LinkdeIN" width="50px" src="https://user-images.githubusercontent.com/43545812/144035037-0f415fc7-9f96-4517-a370-ccc6e78a714b.png" />
</a>
</p>

# License

Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
