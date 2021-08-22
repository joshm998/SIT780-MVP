# SIT780-MVP
On [Docker Hub](https://hub.docker.com/repository/docker/joshm998/780mvp/general) 

### Running the Development Environment

1. Clone the repo
   ```sh
   git clone https://github.com/joshm998/SIT780-MVP.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run Project
   ```sh
   npm start
   ```

### Linting 
```sh
   npm run lint
```

### Building Docker Images 
```sh
   docker build -t joshm998/780mvp .
```

```sh
   docker run -p 49610:3000 -d joshm998/780mvp
```
