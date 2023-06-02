#!/usr/bin/env bash
set -e

# Fill in your path here:
BRIDGE_DIR="/Users/XXX/go/src/github.com/detahard/detahardd-go"
BASE_DIR=$(dirname "$0")

make -C "${BRIDGE_DIR}" build-release

cp "${BRIDGE_DIR}/release/linux/build/detahardd-linux-amd64" "${BASE_DIR}/linux-x64/detahardd"
cp "${BRIDGE_DIR}/release/linux/build/detahardd-linux-arm64" "${BASE_DIR}/linux-arm64/detahardd"
cp "${BRIDGE_DIR}/release/windows/build/detahardd-64b.exe" "${BASE_DIR}/win-x64/detahardd.exe"
cp "${BRIDGE_DIR}/release/macos/build/detahardd-arm64" "${BASE_DIR}/mac-arm64/detahardd"
cp "${BRIDGE_DIR}/release/macos/build/detahardd-amd64" "${BASE_DIR}/mac-x64/detahardd"
