# Gunakan image Node.js untuk build
FROM node:20 as builder

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json lalu install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy semua file project dan build aplikasi dengan path /kurikulum
COPY . .
RUN npm run build

# Rename hasil build ke /kurikulum
RUN mv dist dist_tmp && mkdir -p dist/kurikulum && mv dist_tmp/* dist/kurikulum/

# Gunakan Nginx sebagai server untuk static files
FROM nginx:latest

# Hapus default config Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy hasil build React ke Nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
