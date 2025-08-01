import m from "mithril";

import { injectAnalytics } from "lib/injectAnalytics";
import { Layout } from "Pages/Layout";
import { Dashboard } from "Pages/Dashboard/Dashboard";

injectAnalytics();
m.mount(document.body, {
    view: () => <Layout><Dashboard /></Layout>
});
