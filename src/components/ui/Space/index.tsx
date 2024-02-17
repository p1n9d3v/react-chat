interface Props {
    h?: number;
    w?: number;
}
function Space({ h, w }: Props) {
    return (
        <div
            style={{
                height: `${h ?? 0}px`,
                width: `${w ?? 0}px`,
            }}
        ></div>
    );
}

export default Space;
