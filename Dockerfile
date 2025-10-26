# Stage 1: Build the Angular application
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g @angular/cli@18 \
  && npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build

# Stage 2: Serve the application with NGINX
FROM nginx:stable-bullseye

# Copy the built application from the previous stage
COPY --from=build /app/dist/hoteleria-umg/browser /var/www/html

# Copy custom NGINX configuration if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
