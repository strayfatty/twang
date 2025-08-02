import { MithrilComponent } from "components/mithril-component";
import "./Layout.css";
import { Navigation } from "pages/Navigation";
import m from "mithril";

export class Layout extends MithrilComponent {
    render(
        _: any,
        children: m.ChildArrayOrPrimitive | undefined,
    ): m.Children | null | undefined {
        return [<Navigation />, <section>{children}</section>];
    }
}
