import app from 'flarum/common/app';

app.initializers.add('ucw/flarum-celeste-status', () => {
  console.log('[ucw/flarum-celeste-status] Hello, forum and admin!');
});
