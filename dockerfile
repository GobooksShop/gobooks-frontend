# 로컬에서 빌드 후 nginx로 서비스
FROM nginx:alpine

# 로컬 빌드 결과물을 Docker 이미지에 복사
COPY ./build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]