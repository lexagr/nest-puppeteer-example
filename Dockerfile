FROM lexagr/node-chromium-puppeteer

COPY . /app
RUN chmod -R 777 /app

USER pptruser
WORKDIR /app

RUN npm i && npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]