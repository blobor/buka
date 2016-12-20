FROM nginx:1.11.6-alpine

# Install required dependencies
RUN apk add --no-cache openssl

# Create directory where to store dhparam.pem
RUN mkdir -p /etc/nginx/sites-available/skipass.site/ssl

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf

# Copy configuration files
COPY /config /etc/nginx/

# Generate dhparam.pem file
RUN openssl dhparam -rand - 2048 -out /etc/nginx/sites-available/skipass.site/ssl/dhparam.pem
