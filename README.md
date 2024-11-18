# Gym Buddy

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node.js Version](https://img.shields.io/badge/node.js-v16.0.0-green)
![PostgreSQL Version](https://img.shields.io/badge/postgresql-v13.0-blue)
![TypeScript Version](https://img.shields.io/badge/typescript-v4.0.0-blue)

## Descrição do Projeto

O **Gym Buddy** é uma aplicação inovadora que conecta usuários a academias, proporcionando uma experiência fluida e prática para quem busca manter a forma. Com funcionalidades que permitem o registro de usuários, autenticação, busca por academias, check-ins e muito mais, este projeto foi desenvolvido com foco em eficiência e usabilidade.

Nosso objetivo é facilitar a vida de quem deseja se exercitar, tornando a busca por academias mais acessível e a gestão de check-ins mais organizada.

## Funcionalidades Principais

- **Cadastro de Usuários**: Permite que novos usuários se registrem na plataforma com um e-mail único.
- **Autenticação Segura**: Garantia de que apenas usuários registrados possam acessar suas informações.
- **Perfil do Usuário**: Usuários podem visualizar e gerenciar seu perfil, incluindo histórico de check-ins.
- **Busca por Academias**: Usuários podem buscar academias próximas ou por nome.
- **Check-ins**: Realização de check-ins em academias com validação de distância.
- **Histórico de Check-ins**: Acompanhamento do histórico de check-ins realizados pelo usuário.

## RFs (Requisitos Funcionais)

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [X] Deve ser possível o usuário obter o seu histórico de check-ins;
- [X] Deve ser possível o usuário buscar academias próximas (até 10km);
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [X] Deve ser possível o usuário realizar check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [X] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos Não-Funcionais)

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [X] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento.
- **Fastify**: Framework web para construção de APIs.
- **Prisma**: ORM para interagir com o banco de dados PostgreSQL.
- **TypeScript**: Linguagem de programação que traz tipagem estática ao JavaScript.
- **Vitest**: Framework de testes para garantir a qualidade do código.

## Como Contribuir

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`).
3. Faça as alterações e commit (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie para o repositório remoto (`git push origin feature/nome-da-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## Publicação Prévia

### Publicação Prévia do Gym Buddy

**Fase Atual**: Desenvolvimento de Casos de Uso

**Objetivo**: Criar uma API robusta que atenda às necessidades dos usuários em busca de academias e controle de check-ins.

### Casos de Uso Implementados até Agora

- **Registro de Usuário**: Implementado com validação de e-mail único.
- **Autenticação de Usuário**: Garantindo a segurança dos dados dos usuários.
- **Busca por Academias**: Funcionalidade que permite a busca por academias próximas e por nome.
- **Check-in em Academias**: Implementação da lógica de check-in
