<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Important 

```.env``` file is uploaded for demo purposes but you should never do that in production applications. Add it in ```.gitignore``` file

## Description

[Nest REST Starter on Steroids](https://github.com/vesheff/talks/tree/master/2019/dev.bg%20-%20nest/server) with [fp-ts](https://gcanti.github.io/fp-ts/) JWT, [Swagger](https://swagger.io/), [Wallaby](https://wallabyjs.com/), [TypeORM](https://typeorm.io/), etc.

It uses ```strictNullChecks``` and Functional Programming with Monads to escape the null references [https://www.lucidchart.com/techblog/2015/08/31/the-worst-mistake-of-computer-science/](https://www.lucidchart.com/techblog/2015/08/31/the-worst-mistake-of-computer-science/)


It uses Swagger to test your api on [http://localhost:3000/api](http://localhost:3000/api).

## Resources (**Highly recommend**)
1. Basics
  - [Monads in pictures](https://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html)
  - [Functional Light JS](https://github.com/getify/Functional-Light-JS)
  - [Fun Fun Function](https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)

2. Intermediate/Advanced (intermediate here is so vague)
  - [Mostly adequate guide to FP](https://mostly-adequate.gitbook.io/mostly-adequate-guide/)
  - [Composable functional JavaScript](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript)

3. Truly Advanced
  - [Learn You Haskell](http://learnyouahaskell.com/)


## Prerequisites

- The setup uses MySQL database. Check out the ```ConfigService``` as well as ```.env``` file for the full setup.

- There is an `ormconfig.js` file also. It is used for DB migrations. 

- You have to change DB password in both `.env` and `ormconfig.js` files. 

- Create a schema in mysql and use the same name in both files. The default name is `mydb`.

## Installation

- Run the migration to create the users table

```bash
npm run migration:run
```

```bash
$ npm install
```

## Running the app

Listening on [http://localhost:3000](http://localhost:3000).

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Scripts

Check out the other scripts in `package.json`. There are some useful ones.

## Test

You could use [wallaby.js](https://wallabyjs.com/) and run your tests in an interactive mode as well as in the browser with Wallaby app 

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
