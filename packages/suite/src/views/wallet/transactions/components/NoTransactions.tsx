import React from 'react';
import { Button } from '@detahard/components';
import { AccountExceptionLayout } from '@wallet-components';
import { Translation, detahardLink } from '@suite-components';
import { Account } from '@wallet-types';
import { getNetwork } from '@suite-common/wallet-utils';

interface NoTransactionsProps {
    account: Account;
}

export const NoTransactions = ({ account }: NoTransactionsProps) => {
    const network = getNetwork(account.symbol)!;
    const explorerUrl = `${network.explorer.account}${account.descriptor}`;

    return (
        <AccountExceptionLayout
            title={<Translation id="TR_TRANSACTIONS_NOT_AVAILABLE" />}
            image="CLOUDY"
            actionComponent={
                <Button variant="primary" icon="EXTERNAL_LINK" alignIcon="right">
                    <detahardLink variant="nostyle" href={explorerUrl}>
                        <Translation id="TR_SHOW_DETAILS_IN_BLOCK_EXPLORER" />
                    </detahardLink>
                </Button>
            }
        />
    );
};
