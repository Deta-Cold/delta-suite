import { runCLI } from 'jest';

import { detahardUserEnvLink } from '@detahard/detahard-user-env-link';

import argv from './jest.config';

(async () => {
    // Before actual tests start, establish connection with detahard-user-env
    await detahardUserEnvLink.connect();

    // @ts-expect-error
    argv.runInBand = true;

    // @ts-expect-error
    const { results } = await runCLI(argv, [__dirname]);

    process.exit(results.numFailedTests);
})();
