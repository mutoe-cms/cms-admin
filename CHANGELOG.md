## [0.3.1](https://github.com/mutoe-cms/mutoe-cms/compare/v0.3.0...v0.3.1) (2021-03-14)


### Bug Fixes

* **auth:** should not jump to login page when reload page ([892870a](https://github.com/mutoe-cms/mutoe-cms/commit/892870a3a941d50eacc5e506b9fdb54f002b62e1))
* fix eslint ignore issues ([b22f3a5](https://github.com/mutoe-cms/mutoe-cms/commit/b22f3a5c59b737394d06bdb783a6d2875f98ac7a))
* **test:** fix import.meta transform issue ([6d73f73](https://github.com/mutoe-cms/mutoe-cms/commit/6d73f7385c003bc590b3ca03e66082cc180ed112))
* the API prefix issue ([cdba64e](https://github.com/mutoe-cms/mutoe-cms/commit/cdba64ed847e15b4d42adeea188302dedd5afa9a))
* **build:** semantic css build issue ([5663cca](https://github.com/mutoe-cms/mutoe-cms/commit/5663cca6e25c810c074fbaa3b134b4cc6c031846))
* not display error info when login failed ([ee32287](https://github.com/mutoe-cms/mutoe-cms/commit/ee322876e666cf09571b184fcc453bf612c84e82))
* **auth:** issue of token storage ([c7a37f9](https://github.com/mutoe-cms/mutoe-cms/commit/c7a37f9e2e105f67a65d86fb843f5fa3af7ff6d6))
* swagger template issue ([14bbf47](https://github.com/mutoe-cms/mutoe-cms/commit/14bbf47dc4ad3c2680fda41ed9a6fc4ed6e613db))


### Features

* add NotFound page ([0b3454b](https://github.com/mutoe-cms/mutoe-cms/commit/0b3454bd1837fb94b20f1597a0d1b976b5b8316e))



## 0.3.0 (2021-03-07)

* chore: downgrade dependencies (fix webpack compatibility) ([cf9017a](https://github.com/mutoe-cms/mutoe-cms/commit/cf9017a))
* chore: ignore codacy reporter ([a7e6596](https://github.com/mutoe-cms/mutoe-cms/commit/a7e6596))
* chore: migrate repo ([36ee214](https://github.com/mutoe-cms/mutoe-cms/commit/36ee214))
* chore: migrate to vite builder ([bc363c1](https://github.com/mutoe-cms/mutoe-cms/commit/bc363c1))
* chore: remove useless transformer ([d0b54c7](https://github.com/mutoe-cms/mutoe-cms/commit/d0b54c7))
* chore: setup commit changelog ([1a1b43d](https://github.com/mutoe-cms/mutoe-cms/commit/1a1b43d))
* chore: setup workflow ([6030628](https://github.com/mutoe-cms/mutoe-cms/commit/6030628))
* chore: upgrade dependencies ([f39c9eb](https://github.com/mutoe-cms/mutoe-cms/commit/f39c9eb))
* chore: upgrade to Nodejs 14 ([83f2e66](https://github.com/mutoe-cms/mutoe-cms/commit/83f2e66))
* chore: upgrade to React 17 ([e5feb2e](https://github.com/mutoe-cms/mutoe-cms/commit/e5feb2e))
* refactor: replace pont with swagger-typescript-api ([7a59283](https://github.com/mutoe-cms/mutoe-cms/commit/7a59283))
* refactor: update eslint rules ([bccabf4](https://github.com/mutoe-cms/mutoe-cms/commit/bccabf4))
* test: add test for fieldErrorDecorator ([9f06565](https://github.com/mutoe-cms/mutoe-cms/commit/9f06565))



# 0.2.0 (2020-08-23)


### Bug Fixes

* **assets:** remove useless import and images ([5b22919](https://github.com/mutoe/cms/commit/5b22919ab825fd9dfc9a57699442b6fe1e10956e))


### Features

* **admin:** implement login form ([d71809e](https://github.com/mutoe/cms/commit/d71809e544edd9c6541bb9bafdebf78de5c4773f))
* **auth:** implement retrieve user profile using token ([ac12eba](https://github.com/mutoe/cms/commit/ac12eba0009087cd81b9d4d21a3d6b6d95f03db4))
* **auth:** save auth status into context ([eceb162](https://github.com/mutoe/cms/commit/eceb1626c9ceab73eae37f373a30a505816a47a9))
* **util:** add storage util ([f0bd486](https://github.com/mutoe/cms/commit/f0bd4866431ae169359f8ef9cb92f4d14194c77d))
* implement server validation error ([2d0d0d4](https://github.com/mutoe/cms/commit/2d0d0d4e33ddf4736d15191da113d6e99df13934))
* **auth:** implement login feature ([7fddfc9](https://github.com/mutoe/cms/commit/7fddfc9159d5531226dbfdf9fb0e0f5b2b099326))
* implement focus on first error field utility ([cdc2ec6](https://github.com/mutoe/cms/commit/cdc2ec61ac629dfbe60f6c370eef8585ae2133ed))
* implement login form ([bde6b76](https://github.com/mutoe/cms/commit/bde6b7625dca9a1427b075def6762f296711d84c))


### BREAKING CHANGES

* **auth:** - add axios response interceptor to get data directly
