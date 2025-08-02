import { Dashboard } from "pages/Dashboard/Dashboard";
import { Layout } from "pages/layout";
import { injectAnalytics } from "lib/injectAnalytics";
import m from "mithril";

injectAnalytics();
m.mount(document.body, {
    view: () => (
        <Layout>
            <Dashboard />
        </Layout>
    ),
});
