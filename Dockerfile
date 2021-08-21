FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy Package JSON and run NPM Install
COPY package*.json ./

#Install Node Packages
RUN npm install
COPY . .

#Expose Port 3000
EXPOSE 3000
CMD [ "npm", "start" ]