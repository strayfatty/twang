import m, { ChildArrayOrPrimitive, Children } from "mithril";
import { MithrilComponent } from "~/components/mithril-component";
import { cn } from "~/lib/utils";

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
                    "size-[1rem] animate-spin self-center rounded-lg border-3 border-[transparent] border-t-dracula-purple border-r-dracula-purple border-solid",
                    { hidden: !props.visible },
                )}
            />
        );
    }
}
