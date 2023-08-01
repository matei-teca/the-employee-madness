# Employee Data

This is an individual study project at Codecool.

## Server side

### Install dependencies
```bash
cd ./server
npm install
```

### .env file
Copy the .env.sample as .env and fill up the environment variable for your personal mongodb connecttion url.

### Prepare the database

```bash
cd ./server
npm run populate
```

**populate command** will run the populate.js file as a script and it will generate a buch of starter data for your database. 

### Running the code

```bash
cd ./server
npm run dev
```

It will start the server with nodemon. So it will watch the changes and restart the server if some ot the files changed.

### Testing with test.http

If you like to try the endpoints of the rest api, you can check the test.http file for urls are should work on your environment as well. And if you install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extenstion for vscode you can actually run those in your editor.



## Client side

### Install dependencies

```bash
cd ./client
npm install
```

### Proxy

Watch for the port of your rest api. By default it will bind on port 8080 and the frontend proxy settings also depend on this configuration. If you for some reasons change the port of the backend, don't forget to change the ./client/package.json proxy settings as well.

### Runnig the code

```bash
cd ./client
npm start
```

And the create-react-app react-scripts package will start your frontend on the 3000 port and you can visit the http://localhost:3000 on your preferred browser.


<img width="1440" alt="image" src="https://github.com/matei-teca/the-employee-madness/assets/116873451/a0299a14-65c3-4750-ae30-60a34e4c3050">


<img width="1440" alt="image" src="https://github.com/matei-teca/the-employee-madness/assets/116873451/9e03041f-8a47-4631-9231-4e7907daf752">

<img width="1440" alt="image" src="https://github.com/matei-teca/the-employee-madness/assets/116873451/638f355f-edb3-41c1-9cf0-c184617fad4d">



