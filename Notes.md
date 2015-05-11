# What is NodeJS?

NodeJS is a runtime environment for JavaScript in the same sense that Google Chrome, Firefox or Internet Explorer are runtime environments for JavaScript.

Node is something which can be executed on any system which supports it, including Unix-based systems like Linux or OSX, and of course Microsoft Windows.

Crucially, NodeJS allows us to write scripts, servers, tools and all sorts of other software applications in JavaScript to run them mostly on the command line.

---

# What will we learn?

Today we're going to learn about creating a new Node project, about the npm package manager, about writing a simple REST HTTP API and about creating command line tools in NodeJS, using Unit Tests. Along the way you'll be picking up NodeJS idioms and learning about some useful packages.

---

# Your First NodeJS Application

The first program we're going to write is a classic: a Hello World application. You're probably all familiar with the syntax we're gonna use.

SEE `hello-world/index.js`

--

So, very simple, one line. To run it, we're just gonna go into our folder on the command line and type `node index.js`. You should now see your console writing out those timeless worlds.

Next thing we're gonna do is start getting some dependencies.

---

# Using Modules

Normally in front-end JavaScript, to include some code that someone else has written we just use an HTML `<script>` tag, right?

Well, in NodeJS we use split code into modules. A module is just a load of JS code, like a jQuery plugin or some other front-end JavaScript library, but it's written in such a way that it can be saved to your project easily and included in any other file easily.

Well in NodeJS, we use the `require()` function, which fetches the module that we need and gives us all of the functions and properties which it advertises.

In Node, there are a lot of modules which are available out of the box. For example, let's `require` the path module.

```js
var path = require('path');
```

SEE `hello-world-path/index.js`

https://nodejs.org/api/ for more

--

To formalise our new project, we have to create a "package" file, which contains information about your project such as the name, version number, author and dependencies.

So in the same folder that we created our index.js file, go into terminal and type this:

```
npm init
```

You'll get an interactive wizard-style tool for defining a few project properties, each of which have defaults. For now, let's just hit enter through each of them and allow npm to set them up for us. This has created our package file and named it `package.json`.

---

# The Node Package Manager

The Node Package manager is a command-line tool and, in a way, a whole ecosystem of hundreds of thousands of JavaScript modules written by developers around the world to solve common problems.

The npm directory is searchable at http://npmjs.org/, so if you are looking for a module to do a certain task you can probably find it pretty easily.

Let's write a simple application which will make an HTTP request to Reddit's API and list all of today's most popular Today I Learned posts.

First let's make a new Node project in a folder called 'todayilearned'. In that, do an `npm init` and then type:

```
npm install request --save
```

This not only downloads the `request` module, but it also saves it as a dependency for your project. That means that if you ever delete the module's files, or someone has downloaded your project without all the modules in it, they need only type `npm install` and all the dependencies will be downloaded automatically.

So let's get to writing some code.

SEE `todayilearned/index.js`

---

# Writing our own modules

So, now that we know how to use modules, we can write our own!

We're going to turn our Reddit Today I Learned script into a self-contained module which can be called from other places. In order to make it work, because it contains asynchronous code, we'll need to give it an idiomatic node callback.

---

# REST

Rest stands for Representational State Transfer. The idea is that by using HTTP Requests with certain HTTP Methods such as GET, POST and PUT we can drive the state of an application.

In this example, we're going to use the module we wrote in the last section and turn it into a REST API.

SEE `checkout-rest/server.js`

---

# Executing your code as a standalone package

Now that we have a working REST API, it makes sense for us to want to be able to make it globally installable so we can run it from anywhere on our system. To do this, we need to specify a property in `package.json`.

```json
...
  "bin": "./server.js",
...
```

Once we've done this, we can type `npm install ./ -g` on the command line, and our new module will be installed throughout the system using `server.js` as the file to execute. Typing `checkout-rest` will run our server.

---

# Publishing your code to npm

This final step allows us to publish our module to the npm directory so that when people try to install our module for their projects or their system, they can do so.

First we can create a user on NPM using `npm adduser`. This will ask for your desired credentials on the command line then create your account.

If you already had an account that you'd created on the site, type `npm login`, and type in your credentials.

Now it's a simple matter of typing `npm publish`, and your package will be up on the npm directory. Just make sure you all choose different names for your packages!

---

# NodeJS Packages of Note:

* ExpressJS: `npm install express`
* Commander: `npm install commander`