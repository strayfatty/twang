import { MithrilComponent } from "components/mithril-component";
import "./Layout.css";
import m from "mithril";
import { Navigation } from "Pages/Navigation";

export class Layout extends MithrilComponent {
    render(_: {}, children: m.ChildArrayOrPrimitive | undefined): m.Children | null | void {
        return [
            <Navigation />,
            <section>{children}</section>
        ];
    }
}
