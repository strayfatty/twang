import m, { ChildArrayOrPrimitive, Children } from "mithril";
import { MithrilComponent } from "~/components/mithril-component";
import { cn } from "~/lib/utils";

type Props = {
    class?: string;
    onclick: () => void;
};

export class Button extends MithrilComponent<Props> {
    render(
        { class: className, ...props }: Props,
        children: ChildArrayOrPrimitive | undefined,
    ): Children | null | undefined {
        return (
            <button
                class={cn(
                    "cursor-pointer font-bold outline-none transition-colors duration-300 ease-linear hover:text-dracula-purple",
                    className,
                )}
                type="button"
                {...props}
            >
                {children}
            </button>
        );
    }
}
