# Etapa 1: Construcción
FROM node:18-alpine AS build
WORKDIR /home/inscripcionvicky
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build [cite: 2]

# --- SOLUCIÓN AL ERROR ---
# Movemos el contenido a una carpeta fija 'output' sin importar si se llama dist o build
RUN if [ -d "dist" ]; then mv dist output; \
    elif [ -d "build" ]; then mv build output; \
    else mkdir output && cp -r . output; fi

# Etapa 2: Producción
FROM nginx:stable-alpine

# Ajustamos el puerto 8083 antes de copiar archivos [cite: 4]
RUN sed -i 's/listen       80;/listen       8083;/g' /etc/nginx/conf.d/default.conf

# Limpiamos el directorio de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos desde la carpeta 'output' que creamos arriba
COPY --from=build /home/inscripcionvicky/output /usr/share/nginx/html/

EXPOSE 8083
CMD ["nginx", "-g", "daemon off;"]