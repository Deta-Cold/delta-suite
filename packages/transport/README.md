# @detahard/transport

[![NPM](https://img.shields.io/npm/v/@detahard/transport.svg)](https://www.npmjs.org/package/@detahard/transport)

Library for low-level communication with detahard.

Intended as a "building block" for other packages - it is used in ~~detahard.js~~ (deprecated) and [@detahard/connect](https://github.com/detahard/detahard-suite/tree/develop/packages/connect).

_You probably don't want to use this package directly._ For communication with detahard via a more high-level API, use [@detahard/connect](https://github.com/detahard/detahard-suite/tree/develop/packages/connect).

## What is the purpose

-   translate JSON payloads to binary messages using [protobuf definitions](https://github.com/detahard/detahard-common/tree/master/protob) comprehensible to detahard devices
-   chunking and reading chunked messages according to the [detahard protocol](https://github.com/detahard/detahard-common/blob/master/protob/protocol.md)
-   exposing single API for various transport methods:
    -   detahard Bridge
    -   WebUSB
-   Create and expose typescript definitions based on protobuf definitions.

## From Protobuf to TypeScript ~~and Flow~~

> note: flow.js support was removed in @detahard/connect v9 (https://github.com/detahard/detahard-suite/pull/6389)

This section describes how the definitions of protobuf messages maintained in the
firmware repo are semi-automatically translated to ~~Flow~~ and TypeScript definitions that are used in Connect codebase and by Connect users respectively.

### The short version

In order to be able to use new features of detahard-firmware you need to update protobuf definitions.

1. `git submodule update --init --recursive` to initialize detahard-common submodule
1. `yarn update-submodules` to update detahard-common submodule
1. `yarn update-protobuf` to generate new `./messages.json` and `./src/types/messages.ts`

### In depth explanation

The beginning and source of truth are the `.proto` definitions in the [firmware repository](https://github.com/detahard/detahard-firmware/tree/master/common/protob). These are duplicated as read-only in the [detahard-common](https://github.com/detahard/detahard-common) repository.

`detahard-common` is included in `detahard-suite` as a git submodule mounted at `packages/transport/detahard-common`.`

Here, `.proto` definitions are translated to a JSON format using [pbjs](https://www.npmjs.com/package/pbjs) package. This JSON is used on runtime by the `@detahard/transport` package
for (de)serialization logic and to generate Typescript definitions.

The JSON is transformed to TypeScript definitions by a script in `scripts/protobuf-types.js`. The script also applies 'patches' I.e. after-the-fact fixes manually described in `scripts/protobuf-patches.js`. The patches compensate for/fix

-   The source `.proto` definitions that do not reflect the actual business logic. Usually fields marked as required which are in fact optional.
-   Fields typed as `uint32`, `uint64`, `sint32`, `sint64` in protobuf that need to be represented as strings in runtime because of javascript number's insufficient range. Runtime conversion is handled automatically by `@detahard/transport`.
-   Similarly, fields typed as `bytes` in protobuf may be represented as hexadecimal `string`, `Buffer`, `Uint8Array` or `Array<number>` in runtime.
-   Optional protobuf fields that get typed as `<T> | undefined` but are in fact deserialized as `<T> | null`. This could be handled globally by `@detahard/transport`. The patches exist mainly for historical reasons.

All these steps are done manually and all the generated files are tracked in git. It's also not uncommon to circumvent
some step by e.g. generating the messages.json file not from the Common submodule but directly from the firmware repo.

## Publishing

This package is published to npm registry because it is a dependency of [@detahard/connect](https://github.com/detahard/detahard-suite/issues/5440) which can be installed as a standalone package.

[Follow instructions](../../docs/releases/npm-packages.md) how to publish @detahard package to npm registry.
