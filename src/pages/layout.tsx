import "~/styles/globals.css";
import m from "mithril";
import { MithrilComponent } from "~/components/mithril-component";
import { Navigation } from "~/pages/navigation";

export class Layout extends MithrilComponent {
    render(
        _vnode: any,
        children: m.ChildArrayOrPrimitive | undefined,
    ): m.Children | null | undefined {
        return [<Navigation/>, <section>{children}</section>];
    }
}
