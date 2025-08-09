import m, { ChildArrayOrPrimitive, Children } from "mithril";
import { cn } from "~/lib/utils";
import { MithrilComponent } from "./mithril-component";

type Props = {
    visible: boolean;
};

export class Spinner extends MithrilComponent<Props> {
    render(
        props: Props,
        _children: ChildArrayOrPrimitive | undefined,
    ): Children | null | undefined {
        return (
            <div
                class={cn(
                    "size-[1rem] animate-spin self-center rounded-lg border-3 border-[transparent] border-t-[var(--draculaPurple)] border-r-[var(--draculaPurple)] border-solid",
                    { hidden: !props.visible },
                )}
            />
        );
    }
}
