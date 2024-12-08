# Use Node.js LTS version
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend source code
COPY . .

# Expose the port for the frontend
EXPOSE 3000

# Command to start the React development server
CMD ["npm", "start"]
