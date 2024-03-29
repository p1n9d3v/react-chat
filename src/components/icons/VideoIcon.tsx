import { SVGAttributes } from "react";

function VideoIcon({ ...props }: SVGAttributes<SVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            {...props}
        >
            <g clipPath="url(#clip0_32_144383)">
                <path
                    d="M8.19999 2.25H1.9C1.1268 2.25 0.5 2.92157 0.5 3.75V11.25C0.5 12.0784 1.1268 12.75 1.9 12.75H8.19999C8.97319 12.75 9.59999 12.0784 9.59999 11.25V3.75C9.59999 2.92157 8.97319 2.25 8.19999 2.25Z"
                    fill="#1F2A37"
                />
                <path
                    d="M14.15 3.225C14.0439 3.15849 13.9234 3.12306 13.8006 3.12227C13.6777 3.12148 13.5568 3.15536 13.45 3.2205L11 4.713V10.3627L13.4255 12.0128C13.5316 12.0848 13.6539 12.1248 13.7794 12.1288C13.905 12.1328 14.0292 12.1004 14.1391 12.0352C14.249 11.97 14.3405 11.8744 14.404 11.7582C14.4675 11.6421 14.5006 11.5098 14.5 11.3752V3.87525C14.5001 3.74347 14.4678 3.61399 14.4064 3.49984C14.3449 3.38568 14.2565 3.29089 14.15 3.225Z"
                    fill="#1F2A37"
                />
            </g>
            <defs>
                <clipPath id="clip0_32_144383">
                    <rect
                        width="14"
                        height="14"
                        fill="white"
                        transform="translate(0.5 0.5)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
}

export default VideoIcon;
