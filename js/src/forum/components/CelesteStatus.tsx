import Mithril from 'mithril';
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
            刷新
          </Button>
        </div>
        {status ? (
          <div className="CelesteStatus-content">{`TA 正在玩 ${status.MapName} (${status.Side} 面)`}</div>
        ) : (
          <div className="CelesteStatus-offline">TA 当前不在游戏中</div>
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
      url: 'https://api.centralteam.cn/api/player',
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
        this.state.disabled = true;
        setTimeout(() => {
          this.state.disabled = false;
          m.redraw();
        }, 3000);
      });
  }
}
