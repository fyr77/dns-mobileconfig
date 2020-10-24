# dns-mobileconfig
A simple website to create DoH and DoT config files for iOS. 

Might also work on macOS, I don't have a way to test that currently.

THIS IS STILL WIP. IT DOES NOT WORK YET.

## About

Encrypted DNS is getting more and more mainstream. With the release of iOS 14, Apple has included support for DoH and DoT standards, but has not provided a way of using these without an app or profiles.

This tool can generate these profiles from provided data and also provides some premade configurations.

## Thanks

- Eli Grey for [FileSaver.js](https://github.com/eligrey/FileSaver.js)
- [UUIDjs](https://github.com/uuidjs/uuid)
- Paul Miller for [his excellent article](https://paulmillr.com/posts/encrypted-dns/) and the [premade profiles](https://github.com/paulmillr/encrypted-dns).