import app from 'flarum/admin/app';

app.initializers.add('ucw/flarum-celeste-status', () => {
  app.extensionData.for('ucw-celeste-status')
    .registerSetting({
      setting: 'ucw-celeste-status.url',
      label: app.translator.trans('ucw-celeste-status.admin.url_label'),
      help: app.translator.trans('ucw-celeste-status.admin.url_help'),
      type: 'text',
    })
    .registerSetting({
      setting: 'ucw-celeste-status.min_refresh_interval',
      label: app.translator.trans('ucw-celeste-status.admin.min_refresh_interval_label'),
      help: app.translator.trans('ucw-celeste-status.admin.min_refresh_interval_help'),
      type: 'number',
    })
    .registerSetting({
      setting: 'ucw-celeste-status.online_text',
      label: app.translator.trans('ucw-celeste-status.admin.online_text_label'),
      help: app.translator.trans('ucw-celeste-status.admin.online_text_help'),
      type: 'text',
    })
    .registerSetting({
      setting: 'ucw-celeste-status.offline_text',
      label: app.translator.trans('ucw-celeste-status.admin.offline_text_label'),
      help: app.translator.trans('ucw-celeste-status.admin.offline_text_help'),
      type: 'text',
    });
});
