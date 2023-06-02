import { getAppVersion, isDebugEnv } from '@suite-native/config';
import { Analytics } from '@detahard/analytics';

import { SuiteNativeAnalyticsEvent } from './events';

export const analytics = new Analytics<SuiteNativeAnalyticsEvent>(getAppVersion(), 'suite');

if (isDebugEnv()) {
    // Do not send analytics in development
    analytics.report = () => {};
}
