# Release Steps 

## Pre-Commit
* update package.json with new version
* update Changelog with version details
* update Readme version number in links

## Build and Document
    npm run build
    npm run docs

## Commit and tag
    git add ...
    git commit -m "version details"
    git push origin master
    git tag -am "version details" v1.5.7
    git push --tags

## Packaging Binaries
    npm pack
    gunzip sutton-signwriting-core-1.5.7.tgz
    tar -xvf sutton-signwriting-core-1.5.7.tar
    mv package sutton-signwriting-core-1.5.7
    zip -r sutton-signwriting-core-1.5.7.zip sutton-signwriting-core-1.5.7
    tar -zcvf sutton-signwriting-core-1.5.7.tar.gz sutton-signwriting-core-1.5.7

## Create Github Release
* Go to https://github.com/sutton-signwriting/core/tags
* Create release from Tag
* Upload .ZIP and .TAR.GZ
* Publish

## NPM Publish
    npm publish --access public
