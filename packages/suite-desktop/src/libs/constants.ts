import url from 'url';

import { TOR_URLS } from '@detahard/urls';
import { isDevEnv, isCodesignBuild } from '@suite-common/suite-utils';

const getAppName = () => {
    const appName = 'detahard Suite';

    if (!isCodesignBuild) {
        return `${appName} ${isDevEnv ? 'Local' : 'Dev'}`;
    }

    return appName;
};

export const APP_NAME = getAppName();

export const FILE_PROTOCOL = 'file';

export const APP_SRC = isDevEnv
    ? 'http://localhost:8000/'
    : url.format({
          pathname: 'index.html',
          protocol: FILE_PROTOCOL,
          slashes: true,
      });

// HTTP server default origins
export const HTTP_ORIGINS_DEFAULT = [
    '127.0.0.1',
    'localhost',
    'detahard.io',
    '*.detahard.io',
    '*.sldev.cz',
    TOR_URLS['detahard.io'],
    `*.${TOR_URLS['detahard.io']}`,
];
