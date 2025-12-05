# --- Stage 1: Builder (Install Dependencies) ---
# Use a dedicated, stable Node.js image for building and installing dependencies.
FROM node:20-slim AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the build context root (backend/)
# This ensures a cache layer is created for dependencies
COPY package*.json ./

# Install production dependencies only using npm ci for repeatable builds
RUN npm ci --only=production

# --- Stage 2: Final Image (Runtime) ---
# Use a minimal runtime image for the smallest possible final size
FROM node:20-slim

# Set the working directory for the application
WORKDIR /usr/src/app

# Copy the installed node_modules from the builder stage
# This step significantly reduces the image size
COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY . .

# Expose the port the application listens on (assuming standard Node port 3000)
#ENV PORT=8080
EXPOSE 3002

# Define the command to run the application
CMD [ "npm", "start" ]