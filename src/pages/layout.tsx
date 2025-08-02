import { MithrilComponent } from "components/mithril-component";
import "./layout.css";
import m from "mithril";
import { Navigation } from "pages/navigation";

export class Layout extends MithrilComponent {
    render(
        _: any,
        children: m.ChildArrayOrPrimitive | undefined,
    ): m.Children | null | undefined {
        return [<Navigation />, <section>{children}</section>];
    }
}
