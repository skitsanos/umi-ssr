///https://umi-git-tweak-now-action-site.umijs.now.sh/config/


import React from 'react';
import unirest from 'unirest';

const Echo = props =>
{
    const {dcx} = props || {};

    return <div>Echo: {dcx.result}</div>;
};

Echo.getInitialProps = async ({route, location, store, isServer, req, res}) =>
{
    const url = 'http://api.skitsanos.com/getip';

    const {body} = await unirest.get(url)
        .type('json');

    return Promise.resolve({dcx: body});
};

export default Echo;