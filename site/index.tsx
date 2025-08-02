import { Dashboard } from "components/dashboard";
import { injectAnalytics } from "lib/injectAnalytics";
import m from "mithril";
import { Layout } from "pages/layout";

injectAnalytics();
m.mount(document.body, {
    view: () => (
        <Layout>
            <Dashboard />
        </Layout>
    ),
});
