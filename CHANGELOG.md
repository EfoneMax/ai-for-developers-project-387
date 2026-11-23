# Changelog

## [0.3.0](https://github.com/EfoneMax/ai-for-developers-project-387/compare/call-booking-v0.2.0...call-booking-v0.3.0) (2026-11-23)


### Features

* **ci:** добавить ежедневный аудит приложения ([28db6f4](https://github.com/EfoneMax/ai-for-developers-project-387/commit/28db6f43c6d3310ed304b54227b1cb8c0b40fad0)), closes [#17](https://github.com/EfoneMax/ai-for-developers-project-387/issues/17)


### Bug Fixes

* **ci:** подставлять PR и SHA в prompt авторевью ([485dca2](https://github.com/EfoneMax/ai-for-developers-project-387/commit/485dca25ba7f506465c4ad7384d080cd6848d0ba)), closes [#17](https://github.com/EfoneMax/ai-for-developers-project-387/issues/17)

## [0.2.0](https://github.com/EfoneMax/ai-for-developers-project-387/compare/call-booking-v0.1.0...call-booking-v0.2.0) (2026-11-23)


### Features

* **bookings:** показывать владельцу часовой пояс гостя ([de887b4](https://github.com/EfoneMax/ai-for-developers-project-387/commit/de887b4f6440ee15bef22482912cfeff46bc8ec9))
* **bookings:** хранить снимок часового пояса гостя ([5d5c346](https://github.com/EfoneMax/ai-for-developers-project-387/commit/5d5c346f28ebdc0f3fac40305c16add8c4860b5b)), closes [#8](https://github.com/EfoneMax/ai-for-developers-project-387/issues/8)
* **ci:** добавить авторевью PR, e2e-артефакт и бюджет запусков ([0fdc956](https://github.com/EfoneMax/ai-for-developers-project-387/commit/0fdc9565c8199fd42d99ee480ce1bc695319b2bb)), closes [#6](https://github.com/EfoneMax/ai-for-developers-project-387/issues/6)
* **ci:** добавить автотриаж новых обращений ([3909a30](https://github.com/EfoneMax/ai-for-developers-project-387/commit/3909a3079972617f1334510023c49f4c5f6bfa97)), closes [#6](https://github.com/EfoneMax/ai-for-developers-project-387/issues/6)
* **ci:** подключить агента OpenCode в GitHub Actions ([23dff6f](https://github.com/EfoneMax/ai-for-developers-project-387/commit/23dff6fc36d0c576cc34b19773ef6653f86efa26))
* **ci:** подключить агента OpenCode в GitHub Actions ([6ab0304](https://github.com/EfoneMax/ai-for-developers-project-387/commit/6ab0304e3f995e6638d77008d784edd078f220ca)), closes [#1](https://github.com/EfoneMax/ai-for-developers-project-387/issues/1)
* **owner:** показывать пояс и местное время гостя ([8002f2c](https://github.com/EfoneMax/ai-for-developers-project-387/commit/8002f2cf68b0dec776a0f2c240a24afa8e8990cd)), closes [#9](https://github.com/EfoneMax/ai-for-developers-project-387/issues/9)


### Bug Fixes

* **bookings:** сравнивать пояс гостя с Москвой по канону IANA ([70d6b0b](https://github.com/EfoneMax/ai-for-developers-project-387/commit/70d6b0bb05aea1aba3fc617d47980a7cce544b4d)), closes [#9](https://github.com/EfoneMax/ai-for-developers-project-387/issues/9)
* **ci:** вернуть opencode.json, совместимый с V1 на раннере ([dd349c1](https://github.com/EfoneMax/ai-for-developers-project-387/commit/dd349c19331136ada6a069185695aeb7abeb7905)), closes [#6](https://github.com/EfoneMax/ai-for-developers-project-387/issues/6)
* **ci:** дать агенту gh и убрать зависание на внешних путях ([7eb7287](https://github.com/EfoneMax/ai-for-developers-project-387/commit/7eb728793861edd949fb09bbda6dce27c3d7fec2)), closes [#6](https://github.com/EfoneMax/ai-for-developers-project-387/issues/6)
* **ci:** называть прогон агента по номеру issue или PR ([6b24472](https://github.com/EfoneMax/ai-for-developers-project-387/commit/6b244721b6444a2cb876487b29a7cc56a02c2040)), closes [#6](https://github.com/EfoneMax/ai-for-developers-project-387/issues/6)
* **ci:** не блокировать агента на внешних путях ([402888e](https://github.com/EfoneMax/ai-for-developers-project-387/commit/402888eb6d28bbfce72c0176a71881c139fd4da3)), closes [#6](https://github.com/EfoneMax/ai-for-developers-project-387/issues/6)
* **ci:** передать GH_REPO шагу бюджета ([aaac86d](https://github.com/EfoneMax/ai-for-developers-project-387/commit/aaac86de3dc1fad95421c83b7f636e9dee131c5d)), closes [#6](https://github.com/EfoneMax/ai-for-developers-project-387/issues/6)
* **ci:** публиковать limit_exhausted в PR через pull-requests ([9b079d7](https://github.com/EfoneMax/ai-for-developers-project-387/commit/9b079d7076e94e44ec6e8204df1113f46722e6f7)), closes [#6](https://github.com/EfoneMax/ai-for-developers-project-387/issues/6)
* **release:** исключить CHANGELOG.md из oxfmt ([d848b36](https://github.com/EfoneMax/ai-for-developers-project-387/commit/d848b36908a8c89d2ae52f2834e86de13ea673a9)), closes [#6](https://github.com/EfoneMax/ai-for-developers-project-387/issues/6)
* **release:** не требовать Refs у коммита release-please ([a802bd5](https://github.com/EfoneMax/ai-for-developers-project-387/commit/a802bd593bb6312bfe452fa4d9685a69155471d8)), closes [#6](https://github.com/EfoneMax/ai-for-developers-project-387/issues/6)
