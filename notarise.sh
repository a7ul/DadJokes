#!/usr/bin/env bash

set -e

app_dir=deploy/darwin/build/DadJokes.app
username=""
password=""
ascProvider=""

rm -rf "deploy/darwin/build/DadJokes.zip"

echo "### creating zip"
ditto -ck --rsrc --sequesterRsrc --keepParent "${app_dir}" "deploy/darwin/build/DadJokes.zip"

echo "### uploading to apple"
xcrun altool --notarize-app -t osx --file "deploy/darwin/build/DadJokes.zip" --primary-bundle-id "com.atulr.dadjokes" --username "${username}" --password "${password}" --asc-provider ${ascProvider}
