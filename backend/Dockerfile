# Use Node.js LTS version
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend source code
COPY . .

# Expose backend port
EXPOSE 5000

# Command to run the backend server with ts-node
CMD ["npx", "ts-node", "src/server.ts"]
