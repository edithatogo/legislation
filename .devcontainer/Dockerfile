FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bookworm@sha256:49698b6eae8a476ebfe37652b03a415d66f4e7ea8e1f8253a46b7a7836fe59ef

# Install additional dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the project
RUN npm run build

# Default command
CMD ["npm", "run", "dev", "--", "--help"]
