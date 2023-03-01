<?php

/*
 * This file is part of ucw/flarum-celeste-status.
 *
 * Copyright (c) 2023 ucw.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Ucw\FlarumCelesteStatus;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),
    (new Extend\Settings())
        ->serializeToForum('ucw-celeste-status.url', 'ucw-celeste-status.url')
        ->serializeToForum('ucw-celeste-status.min_refresh_interval', 'ucw-celeste-status.min_refresh_interval', 'intval', 3000)
        ->serializeToForum('ucw-celeste-status.online_text', 'ucw-celeste-status.online_text')
        ->serializeToForum('ucw-celeste-status.offline_text', 'ucw-celeste-status.offline_text')
        ->default('ucw-celeste-status.url', 'https://api.centralteam.cn/api/player')
        ->default('ucw-celeste-status.min_refresh_interval', 3000),
];
