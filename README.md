# Astro Session Demo
## Synopsis
astro-session-demo is a demonstration of server-side session
management in an astro SSR server.

It's purpose is the same as 
[express-session](https://www.npmjs.com/package/express-session), 
but for Astro.

GitHub publish date: 2024/1/4


## Features
- [x] Session data stored on the server
- [x] Support for any database backend via plugins
  - Supports `better-sqlite3` and JSON files out of the box


- [ ] Maliciously crafted session ID detection
  - Potential improvement, but increases server's computation


## Installation
### Requirements
- Recent version of [NodeJS](https://nodejs.org/) and NPM
- Git, to clone this repo.

### Steps
Firstly, clone this repository
```sh
git clone https://github.com/Dano507/astro-session-demo
```
Navigate to the project folder, and install dependencies
```sh
cd astro-sessions
npm install
```
Then run these commands, and open http://localhost:4321 in 
your favourite browser
```sh
npm run build
npm run preview
```
You will be met with a classic counter component demo, with 
a twist. It's state is saved even if you close the tab, and 
even if the browser closes.


## Future Improvements
- [x] Implement unfinished "Name" component
  - More than just a counter would be nice

- [ ] Add tests
  - This will be tricky with TypeScript, as I can't directly
    import files for unit testing as I would in JavaScript

- [ ] Add Redis backend plugin
  - I've recently been interested in working with Redis, and
    this seems like a good opportunity to do so
  - This will also require me to allow a custom path for the
    databases, instead of just using "database.db" or 
    "database.json


## What I learned
This project started from the need to figure out how a session
implementation would work with AstroJS, but I learned much more
than that.

Since that was too simple, I decided to also experiment with
TypeScript, which I had only had pieces of experience with 
before. 

### Typescript
In typescript, I learned that `d.ts` files are for more than 
just type declarations, and are not suitable for general use
alongside typescript files. It seems that they are designed for 
typing javascript libraries.

Additionally, I found out about subtle differences between 
declaring a type vs declaring an interface. More specifically, 
that interfaces don't support specific features that types 
can.

Lastly, I learned that configuring the strictness and behaviour
of the TypeScript code checker is very easy via a tsconfig.json.
This was useful for me because I wanted to allow "implicit any"
to occur in my code, but still have the rest of the "strict" 
preset behaviours.

### Program Design and Structure
This project also gave me an opportunity to properly 
implement the "dependency injection" pattern. This pattern
is what enables the support for multiple database backends to 
be used without breaking the rest of the program. 

Take a look at the `src/sessions/` directory to see for 
yourself. Each database backend is abstracted using a wrapper
API, or "plugin" as I have been referencing them.

Also, I learned what "factory" means in programming terms and
implemented one in my project to return the correct database
wrapper plugins based on a string. I felt that it would be 
cleaner this way, separating it code from the session
management code.

### SQLite
With such a small database size (only storing ~<10 entries at 
any given time), I noticed that my custom JSON backend 
performed 2-4x faster than the BetterSQLite3 backend as per 
the request time indicator in the AstroJS console output.

### Summary
I overengineered a simple counter, learning fundemental skills
about TypeScript and code modularity along the way.
