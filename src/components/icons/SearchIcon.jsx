export default function SearchIcon({ color }) {
    return (
        <>
        <svg width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="input-search">
            <g clipPath="url(#clip0_809_930)">
                <path d="M10.8869 3.86667C12.331 3.86535 13.743 4.29236 14.9444 5.0937C16.1457 5.89503 17.0824 7.03467 17.636 8.36846C18.1895 9.70224 18.335 11.1702 18.0541 12.5867C17.7732 14.0032 17.0784 15.3046 16.0578 16.3262C15.0371 17.3478 13.7364 18.0437 12.3202 18.3259C10.9039 18.6081 9.43579 18.4639 8.10151 17.9116C6.76722 17.3593 5.62672 16.4236 4.82429 15.223C4.02186 14.0224 3.59355 12.6108 3.59355 11.1667C3.60231 9.23444 4.37331 7.38374 5.73899 6.01681C7.10467 4.64988 8.95466 3.87719 10.8869 3.86667ZM10.8869 2.5C9.17278 2.5 7.49717 3.00829 6.07194 3.9606C4.64672 4.9129 3.53589 6.26645 2.87993 7.85008C2.22397 9.4337 2.05234 11.1763 2.38675 12.8575C2.72115 14.5386 3.54657 16.0829 4.75863 17.2949C5.97068 18.507 7.51493 19.3324 9.1961 19.6668C10.8773 20.0012 12.6198 19.8296 14.2035 19.1736C15.7871 18.5177 17.1406 17.4068 18.093 15.9816C19.0453 14.5564 19.5536 12.8808 19.5536 11.1667C19.5536 8.86812 18.6405 6.66372 17.0151 5.03841C15.3898 3.41309 13.1854 2.5 10.8869 2.5Z" fill={color ? 'black' : 'white'} />
                <path d="M23.3331 22.6933L18.4198 17.7466L17.4731 18.6866L22.3865 23.6333C22.4482 23.6955 22.5216 23.7449 22.6024 23.7787C22.6832 23.8125 22.7699 23.83 22.8575 23.8303C22.9451 23.8307 23.0319 23.8137 23.1129 23.7805C23.1939 23.7472 23.2677 23.6984 23.3298 23.6366C23.392 23.5749 23.4414 23.5016 23.4752 23.4208C23.509 23.3399 23.5265 23.2533 23.5269 23.1657C23.5272 23.0781 23.5102 22.9913 23.477 22.9102C23.4437 22.8292 23.3949 22.7555 23.3331 22.6933Z" fill={color ? 'black' : 'white'}/>
            </g>
            <defs>
                <clipPath id="clip0_809_930">
            <rect width="24" height="24" fill={color ? 'black' : 'white'} transform="translate(0 0.5)"/>
                </clipPath>
            </defs>
        </svg>
        </>
    )
}