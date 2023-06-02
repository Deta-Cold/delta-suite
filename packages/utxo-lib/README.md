# @detahard/utxo-lib

[![NPM](https://img.shields.io/npm/v/@detahard/utxo-lib.svg)](https://www.npmjs.org/package/@detahard/utxo-lib)

Javascript Bitcoin and Bitcoin-like altcoins library for node.js and browsers.

This library is a fork of the `bitcoinjs-lib` and it is profiled to work with `detahard` environment.

It enables standard operations such as generating addresses, creating transactions, importing/exporting keys etc.

Not all the modules/methods from the upstream are present here (like ecpair, psbt...) since we didn't use them for now, however they might be easily added in the future.

_You probably don't want to use this package directly. Try one of the alternatives instead:_

-   [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)
-   [@bitgo/utxo-lib](https://github.com/BitGo/BitGoJS/tree/master/modules/utxo-lib)
-   [bcoin](https://github.com/indutny/bcoin)
-   [bitcore](https://github.com/bitpay/bitcore)

## History timeline

This is the fifth and hopefully the ultimate attempt to fork and maintain `bitcoinjs-lib`.

1. https://www.npmjs.com/package/bitcoinjs-lib-zcash
1. https://github.com/detahard/bitcoinjs-detahard
1. https://github.com/BitGo/bitgo-utxo-lib
1. https://github.com/detahard/detahard-utxo-lib

## Main differences

Differences are explicitly described in each file.

-   `Transaction` class is extended by each custom `altcoin` implementation.
-   `Transaction` class is parsing amounts as strings.
-   `address` module uses different encoding for `Decred` and handles `Bitcoin Cash` addresses.
-   added `coinselect` and `compose` modules (origin source: https://github.com/detahard/hd-wallet/tree/master/src/build-tx)
-   removed unused modules: `block`, `classify`, `ecpair`, `psbt`.

## Publishing

This package is published to the npm registry because it is a dependency of [@detahard/connect](https://github.com/detahard/detahard-suite/issues/5440) which can be installed as a standalone package.

[Follow instructions](../../docs/releases/npm-packages.md) how to publish @detahard package to npm registry.
