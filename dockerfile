# Step 1: React app 빌드
FROM node:20 AS build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

# local 환경변수 파일에서 prod 환경변수 파일로 교체 (로컬에서 돌릴경우 주석 처리 후 빌드)
COPY .envprod /app/.env

RUN npm run build

# Step 2: nginx로 서비스
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]