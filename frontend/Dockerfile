# Stage 1: Build
FROM node:14-alpine AS build 
    
# Set working directory
WORKDIR /app 

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install && npm cache clean --force

COPY public ./public
COPY server ./server
COPY src ./src
COPY .env .
# COPY . .


# Stage 2: Production
FROM node:14-alpine AS production

RUN addgroup --system appgroup && \
    adduser --system --ingroup appgroup --home /home/appuser appuser

# Tạo user và group với home directory hợp lệ
RUN mkdir -p /home/appuser /app && \
    chown -R appuser:appgroup /home/appuser /app


# Tạo home và thư mục làm việc, set quyền
RUN mkdir -p /home/appuser /app && \
    chown -R appuser:appgroup /home/appuser /app

WORKDIR /app

COPY --from=build /app /app
RUN chown -R appuser:appgroup /app

USER appuser

# Expose port
EXPOSE  3000

# Start servera
CMD ["npm", "start"]
