import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import UserCard from 'flarum/forum/components/UserCard';
import CelesteStatus from './components/CelesteStatus';

app.initializers.add('ucw/flarum-celeste-status', () => {
  extend(UserCard.prototype, 'infoItems', function (items) {
    const { user } = this.attrs as any;

    if (!user) {
      return;
    }

    // priority -101 to be after the UserBio
    items.add('celesteStatus', <CelesteStatus user={user} />, -101);
  });
});
