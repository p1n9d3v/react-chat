import { HTMLProps, PropsWithChildren, useEffect, useRef } from "react";

interface Props
    extends PropsWithChildren,
        Pick<HTMLProps<HTMLDivElement>, "style"> {
    dependencies: any[];
}

function ScrollToBottom({ children, style, dependencies }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, dependencies);
    return (
        <div
            ref={ref}
            style={{
                ...style,
                overflowY: "scroll",
            }}
        >
            {children}
        </div>
    );
}

export default ScrollToBottom;
