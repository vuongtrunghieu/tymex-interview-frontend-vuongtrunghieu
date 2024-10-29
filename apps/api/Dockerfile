# Use Node.js LTS (Long Term Support) as base image
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Set default port if not provided in .env
ENV PORT=5005

# Copy package files first to leverage Docker cache
COPY apps/api/package.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY apps/api/server.js .
COPY apps/api/db.json .
COPY apps/api/.env .

# Add security - run as non-root user
RUN adduser --disabled-password --gecos "" nodeuser
RUN chown -R nodeuser:nodeuser /usr/src/app
USER nodeuser

# Expose the dynamic port
EXPOSE ${PORT}

# Command to run the application
CMD [ "sh", "-c", "node server.js" ]
