# Biblioteca Ágil
## Enunciado 1 | Biblioteca Ágil

## Tecnologias Utilizadas
### Backend
- [ ] Nodejs
- [ ] Expresjs
- [ ] PrismaORM
- [ ] Sqlite

## BackEnd
Para executar o backend entre na pasta server e execute os seguintes comandos

Instalar dependências
```
npm install
```
Dentro da pasta server crie um arquivo .env e cole o seguinte comando
```
DATABASE_URL="file:./dev.db"
```
Rodar Migrations
```
npx prisma migrate dev
```
Executar BackEnd
```
npm run dev
```
Caso queira acessar o backend o prisma disponibiliza um cliente web para editar o banco de dados, para isso execute
```
npx prisma studio
```
### Rotas
- [ ] Book
    - [ ] Retirar livro para emprestimo -> /book/withdraw
    - [ ] Devolver livro retirado -> /book/giveback
    - [ ] Doar um novo livro -> /book/donate
- [ ] User
    - [ ] Logar usuário -> /user/login
    - [ ] Criar usuário -> /user/create

### Ferramentas
- [ ] Insomnia para fazer as requisições para as rotas

O projeto não pode ser concluído por completo devido ao tempo porém a ideia seria uma aplicação frontend react e backend node de biblioteca ágil web. O backend do projeto ficou pronto com as rotas e a modelagem do banco de dados sendo assim totalmente funcional independente do frontend. Seguindo os passos acima o backend estará rodando e pronto para receber as requisições em suas rotas.
