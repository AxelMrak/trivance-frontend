FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD echo "Starting FRONTEND service..." && \
    echo "Running npm run dev..." && \
    npm run dev
    # CMD ["npm", "start"]
