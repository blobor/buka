FROM nginx:1.11-alpine

# Install required dependencies
RUN apk add --no-cache openssl

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf

# Create directory where to store dhparam.pem
RUN mkdir -p /etc/nginx/ssl

# Generate dhparam.pem file
RUN openssl dhparam -rand - 2048 -out /etc/nginx/ssl/dhparam.pem

# Copy a configuration file from the current directory
COPY nginx.conf /etc/nginx/
