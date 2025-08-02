import { Dashboard } from "Pages/Dashboard/Dashboard";
import { Layout } from "Pages/Layout";
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
