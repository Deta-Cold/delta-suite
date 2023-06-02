// import original module declarations
import 'styled-components';
import { types } from '@detahard/components';

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends types.SuiteThemeColors {}
}
