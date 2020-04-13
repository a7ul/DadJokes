#!/usr/bin/env bash

set -e

app_dir=deploy/darwin/build/DadJokes.app
identity=""
entitlements="deploy/darwin/DadJokes.app/Contents/Resources/entitlements.plist"

rm -rf "${app_dir}"

npx nodegui-packer --pack dist

echo " ### Signing"

codesign --verbose=4 --strict --timestamp --sign "${identity}" --entitlements "${entitlements}" --options "runtime" ${app_dir}/Contents/Frameworks/*.framework
codesign --verbose=4 --strict --timestamp --sign "${identity}" --entitlements "${entitlements}" --options "runtime" ${app_dir}/Contents/PlugIns/*/*.dylib
codesign --verbose=4 --strict --timestamp --sign "${identity}" --entitlements "${entitlements}" --options "runtime" ${app_dir}/Contents/Resources/dist/*.node
codesign --verbose=4 --strict --timestamp --sign "${identity}" --entitlements "${entitlements}" --options "runtime" ${app_dir}/Contents/MacOS/qode.json
codesign --verbose=4 --strict --timestamp --sign "${identity}" --entitlements "${entitlements}" --options "runtime" ${app_dir}

echo "### Verifying"

codesign --verify --deep --verbose=4 "${app_dir}"

spctl -a -vvvv "${app_dir}"
