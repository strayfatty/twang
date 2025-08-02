import { injectAnalytics } from "lib/injectAnalytics";
import m from "mithril";
import { Layout } from "pages/layout";
import { Dashboard } from "pages/page";

injectAnalytics();
m.mount(document.body, {
    view: () => (
        <Layout>
            <Dashboard />
        </Layout>
    ),
});
