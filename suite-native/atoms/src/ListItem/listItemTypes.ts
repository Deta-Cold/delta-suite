import { IconName } from '@suite-common/icons';
import { NativeStyleObject } from '@detahard/styles';

export type BaseListItem = {
    iconName?: IconName;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    style?: NativeStyleObject;
    isTextTruncated?: boolean;
};
