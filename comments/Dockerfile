# Specify the base image
FROM node:alpine

# Specify the working directory 
WORKDIR /app

# Copy the dependencies file to the working directory
COPY ./package.json ./

# Install some dependencies
RUN npm install

# Copy the rest of the files to the working directory (this is done after the dependencies are installed so that the dependencies are not reinstalled every time a file is changed)
COPY ./ ./

# Default command
CMD ["npm", "start"]
