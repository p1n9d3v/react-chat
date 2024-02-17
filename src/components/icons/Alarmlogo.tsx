import { SVGAttributes } from "react";

function AlarmIcon({ ...props }: SVGAttributes<SVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            {...props}
        >
            <rect width="28" height="28" rx="14" fill="white" />
            <path
                d="M20.1107 15.0862V13.1914C20.1115 11.9109 19.6237 10.6675 18.7263 9.66237C17.8289 8.65725 16.5743 7.94915 15.1654 7.65258C15.1762 7.61584 15.1845 7.57859 15.1904 7.541V5.05262C15.1904 4.77345 15.065 4.50571 14.8418 4.3083C14.6185 4.1109 14.3157 4 14 4C13.6842 4 13.3814 4.1109 13.1582 4.3083C12.9349 4.50571 12.8095 4.77345 12.8095 5.05262V7.541C12.8154 7.57859 12.8238 7.61584 12.8345 7.65258C11.4256 7.94915 10.171 8.65725 9.27358 9.66237C8.37618 10.6675 7.88845 11.9109 7.88925 13.1914V15.0862C7.88925 17.5977 5.66663 18.2251 5.66663 19.4808C5.66663 20.105 5.66663 20.7366 6.3071 20.7366H21.6928C22.3333 20.7366 22.3333 20.105 22.3333 19.4808C22.3333 18.2251 20.1107 17.5977 20.1107 15.0862Z"
                fill="#6B7280"
            />
            <path
                d="M10.2178 21.7892C10.5336 22.445 11.0605 23.0043 11.733 23.3973C12.4055 23.7904 13.1938 24 14 24C14.8061 24 15.5944 23.7904 16.2669 23.3973C16.9394 23.0043 17.4663 22.445 17.7821 21.7892H10.2178Z"
                fill="#6B7280"
            />
        </svg>
    );
}

export default AlarmIcon;
