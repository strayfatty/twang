import m from "mithril";
import { Dashboard } from "~/components/dashboard";
import { injectAnalytics } from "~/lib/injectAnalytics";
import { Layout } from "~/pages/layout";

injectAnalytics();
m.mount(document.body, {
    view: () => (
        <Layout>
            <Dashboard />
        </Layout>
    ),
});
