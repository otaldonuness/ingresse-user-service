# Build Stage
FROM node:latest as build

# Install pnpm globally in the custom directory
RUN npm install -g pnpm

# Create a user to avoid running as root
RUN useradd -m myuser
USER myuser

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install dependencies by copying package-related files first
COPY pnpm-lock.yaml package.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the code
COPY . .

# Build the application
RUN pnpm run build

# Execution Stage
FROM node:latest

WORKDIR /usr/src/app

# Copy only the necessary files from previous stage
COPY --from=build /usr/src/app/dist ./dist
COPY package.json ./

# Install production dependencies
RUN npm install -g pnpm && pnpm install --prod

# Command to run the app
CMD ["node", "dist/main"]






# Copy the rest of the code
COPY . .

# Build the application
RUN pnpm run build

# Execution Stage
FROM node:latest

WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the necessary files from previous stage
COPY --from=build /usr/src/app/dist ./dist
COPY package.json ./

# Install production dependencies
RUN pnpm install --prod

# Command to run the app
CMD ["node", "dist/main"]
