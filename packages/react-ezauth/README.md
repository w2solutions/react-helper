# `@w2solutions/react-ezauth`

> react authentication helper package

## Usage

```
const reactEzAuth = require('react-ezauth');

// TODO: DEMONSTRATE API
```

## Overriding User Type and Roles

```
// AuthTypes.d.ts

import "@w2solutions/react-ezauth"

declare module "@w2solutions/react-ezauth" {
  export interface DefaultUser {
    id: string;
    username: string;
    roles: DefaultUserRole[];
    // ...
  }

  export enum DefaultUserRole {
    ADMIN = 'Admin',
    DEVELOPER = 'Developer',
    USER = 'User',
  }
}

```
