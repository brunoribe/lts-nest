# Usar uma imagem base Node.js
FROM node:18-alpine

# Criar diretório da aplicação
WORKDIR /usr/src/app

# Instalar dependências copiando
# package.json e package-lock.json do diretório raiz do projeto
COPY package*.json ./
COPY tsconfig.json ./
COPY /src/main.ts ./
COPY prisma ./prisma
COPY ./src/types ./types

# Instalar dependências
RUN npm install

# Expor a porta
EXPOSE 3000

# Comando para executar a aplicação
CMD ["npm", "run", "start:dev"]
