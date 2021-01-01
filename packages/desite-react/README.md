<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/desite/master/about/identity/desite-logo.png" height="250px">
    <br />
    <br />
    <a target="_blank" href="https://www.npmjs.com/package/@plurid/desite-react">
        <img src="https://img.shields.io/npm/v/@plurid/desite-react.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
    </a>
    <a target="_blank" href="https://github.com/plurid/desite/blob/master/packages/desite-react/LICENSE">
        <img src="https://img.shields.io/badge/license-DEL-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: DEL">
    </a>
</p>



<h1 align="center">
    desite for React
</h1>


<h3 align="center">
    Track User Sittings
</h3>



<br />



React implementation of `desite` to track user sittings.


### Contents

+ [Install](#install)
+ [Packages](#packages)
+ [Codeophon](#codeophon)



## Install

To install run

``` bash
npm install @plurid/desite-react
```

or

``` bash
yarn add @plurid/desite-react
```



## Usage

``` typescript
import Desite, {
    INTERACT_TYPES,
} from '@plurid/desite-react';


const main = () => {
    const appID = 'obtained-application-id';

    const desite = new Desite({
        appID,
    });

    desite.visit(
        '/visited/path',
    );

    desite.interact(
        INTERACT_TYPES.click,
        'clicked-element',
    );
}


main();
```



## Packages

<a target="_blank" href="https://www.npmjs.com/package/@plurid/desite-react">
    <img src="https://img.shields.io/npm/v/@plurid/desite-react.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/desite-react][desite-react] • the `React` implementation

[desite-react]: https://github.com/plurid/desite/tree/master/packages/desite-react



## [Codeophon](https://github.com/ly3xqhl8g9/codeophon)

+ licensing: [delicense](https://github.com/ly3xqhl8g9/delicense)
+ versioning: [αver](https://github.com/ly3xqhl8g9/alpha-versioning)
