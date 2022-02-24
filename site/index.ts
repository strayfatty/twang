import m from "mithril";

import { Storage } from "Shared/Storage";
import { Layout } from "Pages/Layout";
import { LayoutModel } from "Pages/LayoutModel";
import { Dashboard } from "Pages/Dashboard/Dashboard";
import { DashboardModel } from "Pages/Dashboard/DashboardModel";
import { TwitchApi } from "Twitch/TwitchApi";

const storage = new Storage();
const twitchApi = new TwitchApi(storage);
//const twitchClient = new TwitchClient(twitchApi);

const layoutModel = new LayoutModel(twitchApi);
const dashboardModel = new DashboardModel(/*twitchClient*/);

m.mount(document.body, {
    view: () => m(Layout, layoutModel, m(Dashboard, dashboardModel))
});
