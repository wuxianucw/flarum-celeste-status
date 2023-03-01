import Mithril from 'mithril';
import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import User from 'flarum/common/models/User';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';

export interface CelesteStatusAttrs extends ComponentAttrs {
  user: User;
}

export interface CelesteStatusState {
  loading: boolean;
  disabled: boolean;
  status: CelesteStatusInfo | null;
}

export interface CelesteStatusInfo {
  ID: number;
  Name: string;
  FullName: string;
  DisplayName: string;
  Level: string;
  Sid: string;
  Side: string;
  MapName: string;
  TCPPingMs: number | null;
  UDPPingMs: number | null;
}

export default class CelesteStatus extends Component<CelesteStatusAttrs, CelesteStatusState> {
  readonly ONLINE_TEXT = app.forum.attribute('ucw-celeste-status.online_text') as string || app.translator.trans('ucw-celeste-status.forum.default_online_text').toString();
  readonly UNKNOWN_PING = app.translator.trans('ucw-celeste-status.forum.unknown_ping').toString();
  readonly OFFLINE_TEXT = app.forum.attribute('ucw-celeste-status.offline_text') as string || app.translator.trans('ucw-celeste-status.forum.default_offline_text').toString();

  oninit(vnode: Mithril.Vnode<CelesteStatusAttrs, this>) {
    super.oninit(vnode);

    this.state = {
      loading: true,
      disabled: false,
      status: null,
    };

    this.fetch();
  }

  view() {
    const { loading, disabled, status } = this.state;

    if (loading) {
      return <div className="CelesteStatus-container">{LoadingIndicator.component({ size: 'tiny' })}</div>;
    }

    return (
      <div className="CelesteStatus-container">
        <div className="CelesteStatus-refresh">
          <Button className="Button" icon="fas fa-sync" onclick={this.fetch.bind(this)} disabled={disabled}>
            {app.translator.trans('ucw-celeste-status.forum.refresh')}
          </Button>
        </div>
        {/* use different classes for further development: content may be more complex in the future */}
        {status ? (
          <div className="CelesteStatus-content">{
            this.ONLINE_TEXT
              .replace(/\$\(name\)/, status.Name)
              .replace(/\$\(map\)/, status.MapName)
              .replace(/\$\(side\)/, status.Side)
              .replace(/\$\(ping\)/, status.TCPPingMs === null ?
                (status.UDPPingMs === null ? this.UNKNOWN_PING : `${status.UDPPingMs}ms`) : `${status.TCPPingMs}ms`)
          }</div>
        ) : (
          <div className="CelesteStatus-offline">{this.OFFLINE_TEXT}</div>
        )}
      </div>
    );
  }

  fetch() {
    const { user } = this.attrs;
    const userName = user.username();

    this.state.loading = true;

    m.request({
      method: 'GET',
      url: app.forum.attribute('ucw-celeste-status.url'),
      params: { playername: userName },
    })
      .then((data: any) => {
        this.state.status = typeof data === 'object' && typeof data.ID === 'number' ? data : null;
      })
      .catch(() => {
        this.state.status = null;
      })
      .finally(() => {
        this.state.loading = false;
        const timeout = app.forum.attribute('ucw-celeste-status.min_refresh_interval');
        if (typeof timeout !== 'number' || timeout <= 0) {
          return;
        }
        this.state.disabled = true;
        setTimeout(() => {
          this.state.disabled = false;
          m.redraw();
        }, timeout);
      });
  }
}
