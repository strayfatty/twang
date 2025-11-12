import m from "mithril";
import { Dashboard } from "~/components/dashboard";
import { Layout } from "~/pages/layout";

m.mount(document.body, {
    view: () => (
        <Layout>
            <Dashboard />
        </Layout>
    ),
});
