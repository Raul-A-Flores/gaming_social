# Alpha Social Media App

Early stages of a gaming social media application centered around gamers. Topics include popular gaming titles with future plans of other integrations. Application was built using Typescript, 

## Getting Started

To get started download or clone repository.

### Frontend

Create a .env with corresponding values:

```
NEXT_PUBLIC_SANITY_TOKEN = " "

NEXT_PUBLIC_GOOGLE_API_TOKEN = " "

NEXT_PUBLIC_BASE_URL = http://localhost:3000
```

Then, install required dependencies
```
npm install --legacy-peer-deps'
```

Finally, run in local environment:

```
npm run dev
```

### Backend

The backend is built using Sanity. To begin install sanity globally on your system in CLI.
```
npm install -g @sanity/cli
```

Once sanity is installed you can go back to the directory of this project and run
```
sanity init
```
This will create a new sanity project. Name the project to your liking and create a clean project. Once client has finished downloading. Visit this backend repository and copy the schema files and replace initial ones.

https://github.com/Raul-A-Flores/alpha_backend

Run Sanity CLI
```
sanity start
```
Click on the link provided on the terminal to access your schema. Navigate to manage your project and copy your API for the env files. Copy the project id as well and replace in utils/client.ts. 
