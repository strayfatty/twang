import m, { ChildArrayOrPrimitive, Children } from "mithril";
import { MithrilComponent } from "~/components/mithril-component";
import { cn } from "~/lib/utils";

type Props = {
    class?: string;
    href: string;
    target?: "_self" | "_blank" | "_parent" | "_top";
};

export class Link extends MithrilComponent<Props> {
    render(
        { class: className, ...props }: Props,
        children: ChildArrayOrPrimitive | undefined,
    ): Children | null | undefined {
        return (
            <a
                class={cn(
                    "text-dracula-foreground no-underline transition-colors duration-300 ease-linear hover:text-dracula-purple",
                    className,
                )}
                rel="noopener noreferrer nofollow"
                {...props}
            >
                {children}
            </a>
        );
    }
}
