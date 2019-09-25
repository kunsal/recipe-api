# Demo Recipes API
This is a demo recipes api. It runs on ```http://localhost:3000```
## Installation
- Clone the repository 
- Run ```npm install```
## Operation
- Spin up the API with ```node server``` or ```nodemon server``` (if you have nodedemon installed globally)
## Endpoints
- ```/api/recipes```

| Method | Description |
| --- | --- |
| GET |  Returns all recipes in database |

- ```/api/recipes/{ID}``` 

| Method | Description |
| --- | --- |
| GET |  Returns the recipe with the provided ID |

- ```/api/recipes``` 

| Method | Description |
| --- | --- |
| POST |  Adds a new recipe to the database |

- ```/api/recipes/{ID}```

| Method | Description |
| --- | --- |
| PUT |  Modifies the recipe with the provided ID |

- ```/api/recipes/{ID}```

| Method | Description |
| --- | --- |
| DELETE |  Deletes the recipe with the provided ID |