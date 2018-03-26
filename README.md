# @keyv/etcd [<img width="100" align="right" src="https://rawgit.com/lukechilds/keyv/master/media/logo.svg" alt="keyv">](https://github.com/lukechilds/keyv)

> Etcd storage adapter for Keyv

[![Build Status](https://travis-ci.org/roccomuso/keyv-etcd.svg?branch=master)](https://travis-ci.org/roccomuso/keyv-etcd)
[![Coverage Status](https://coveralls.io/repos/github/roccomuso/keyv-etcd/badge.svg?branch=master)](https://coveralls.io/github/roccomuso/keyv-etcd?branch=master)
[![npm](https://img.shields.io/npm/v/@keyv/etcd.svg)](https://www.npmjs.com/package/@keyv/etcd)

[Etcd](/coreos/etcd) storage adapter for [Keyv](https://github.com/lukechilds/keyv).

TTL functionality is handled directly by Etcd so no timestamps are stored and expired keys are cleaned up internally.


## Install

```shell
npm install --save keyv @keyv/etcd
```

## Usage

```js
const Keyv = require('keyv');

const keyv = new Keyv('etcd://127.0.0.1:2379');
keyv.on('error', handleConnectionError);
```

Any valid options will be passed directly to the [underlying store](https://github.com/stianeikeland/node-etcd#constructor-options).

e.g:

```js
const keyv = new Keyv('etcd://127.0.0.1:2379', { timeout: 1000, ssl: true });
```

Or you can manually create a storage adapter instance and pass it to Keyv:

```js
const Keyv = require('keyv');
const KeyvEtcd = require('@keyv/etcd');

const etcd = new KeyvEtcd('etcd://127.0.0.1:2379');
const keyv = new Keyv({ store: etcd });
```

## License

MIT © Rocco Musolino ([@roccomuso](https://twitter.com/roccomuso))
