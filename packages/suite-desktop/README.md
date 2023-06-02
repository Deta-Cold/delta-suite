# @detahard/suite-desktop

detahard Suite desktop application.

[Official download page](https://suite.detahard.io/)

## Development

```
yarn workspace @detahard/suite-desktop dev
```

[Read more about development and debugging](../../docs/packages/suite-desktop.md)

---

## Build

Prerequisites:

```
yarn && yarn build:libs
yarn workspace @detahard/message-system sign-config
```

### Linux

```
yarn workspace @detahard/suite-desktop build:linux
chmod u+x ./packages/suite-desktop/build-electron/detahard-Suite[version].AppImage
./packages/suite-desktop/build-electron/detahard-Suite[version].AppImage
```

_Note: On Debian, CentOS and similar distributions you might need to add a `--no-sandbox` flag_

### MacOS

```
yarn workspace @detahard/suite-desktop build:mac
```

Go to `./packages/suite-desktop/build-electron/mac` and open the app

or start the app from terminal:

```
./packages/suite-desktop/build-electron/mac/detahard\ Suite.app/Contents/MacOS/detahard\ Suite
```

### Windows

```
yarn workspace @detahard/suite-desktop build:win
```

Go to `./packages/suite-desktop/build-electron` and install the app

### NixOS

_Note: To run detahardSuite.AppImage you need `appimage-run` package. `nix-env -iA nixos.appimage-run`_

```
yarn workspace @detahard/suite-desktop build:linux
appimage-run ./packages/suite-desktop/build-electron/detahard-Suite[version].AppImage
```

_Note: If build fails on a missing cache file _(.cache/\*\*/mksquashfsthis)_ additionally run `./nixos-fix-binaries.sh` script and repeat build step._

---

## Remove IndexedDB from local machine

To remove a database, delete following folder:

### Linux

`/home/<user>/.config/@detahard/suite-desktop/IndexedDB`

### macOS

`/Users/<user>/Library/Application Support/@detahard/suite-desktop/IndexedDB`

### Windows

`C:\Users\<user>\AppData\Roaming\@detahard\suite-desktop\IndexedDB`

## Clearing Electron cache

To clear electron cache, delete following folder:

### Linux

`/home/<user>/.config/@detahard/suite-desktop/Cache`

### macOS

`/Users/<user>/Library/ApplicationSupport/@detahard/suite-desktop/Cache`

### Windows

`C:\Users\<user>\AppData\Roaming\@detahard\suite-desktop\Cache`
