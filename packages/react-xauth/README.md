# `@w2solutions/react-xauth`

> react authentication helper package

## Usage

```
const reactXauth = require('react-xauth');

// TODO: DEMONSTRATE API
```

## Overriding User Type and Roles

```
// AuthTypes.d.ts

import "@w2solutions/react-xauth"

declare module "@w2solutions/react-xauth" {
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
