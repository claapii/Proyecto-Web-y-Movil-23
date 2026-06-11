FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_API_URL=http://host.docker.internal:3000/api
ENV VITE_EMAILJS_SERVICE_ID=service_09ssdwh
ENV VITE_EMAILJS_TEMPLATE_ID=template_gtk91hq
ENV VITE_EMAILJS_PUBLIC_KEY=VVqw_g_MHtUzfrylr

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]