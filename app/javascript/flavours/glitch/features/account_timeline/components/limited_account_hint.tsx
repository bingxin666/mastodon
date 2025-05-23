import { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import { revealAccount } from 'flavours/glitch/actions/accounts_typed';
import { Button } from 'flavours/glitch/components/button';
import { domain } from 'flavours/glitch/initial_state';
import { useAppDispatch } from 'flavours/glitch/store';

export const LimitedAccountHint: React.FC<{
  accountId: string;
  reason?: string;
}> = ({ accountId, reason }) => {
  const dispatch = useAppDispatch();
  const reveal = useCallback(() => {
    dispatch(revealAccount({ id: accountId }));
  }, [dispatch, accountId]);

  const message = reason ? (
    <p>
      <FormattedMessage
        id='limited_account_hint.instance_limit.title'
        defaultMessage='The server this profile is hosted on has been limited by the moderators of {domain}.'
        values={{ domain }}
      />
      <br />
      <FormattedMessage
        id='limited_account_hint.instance_limit.reason'
        defaultMessage='Reason: {reason}'
        values={{ reason }}
      />
    </p>
  ) : (
    <p>
      <FormattedMessage
        id='limited_account_hint.title'
        defaultMessage='This profile has been hidden by the moderators of {domain}.'
        values={{ domain }}
      />
    </p>
  );

  return (
    <div className='limited-account-hint'>
      {message}
      <Button onClick={reveal}>
        <FormattedMessage
          id='limited_account_hint.action'
          defaultMessage='Show profile anyway'
        />
      </Button>
    </div>
  );
};
