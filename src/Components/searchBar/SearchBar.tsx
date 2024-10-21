interface SearchBarProps {
  style: string;
  text: string;
}
export const SearchBar: React.FC<SearchBarProps> = ({ style, text }) => {
  return (
    <form className={style} role="search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        className="pl-2 w-6 h-6"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.5306 18.9694L14.8366 14.2762C17.6629 10.883 17.3204 5.86693 14.0591 2.88935C10.7978 -0.0882368 5.77134 0.0259986 2.64867 3.14867C-0.474001 6.27134 -0.588237 11.2978 2.38935 14.5591C5.36693 17.8204 10.383 18.1629 13.7762 15.3366L18.4694 20.0306C18.7624 20.3237 19.2376 20.3237 19.5306 20.0306C19.8237 19.7376 19.8237 19.2624 19.5306 18.9694ZM1.75 9C1.75 5.27208 4.77208 2.25 8.5 2.25C12.2279 2.25 15.25 5.27208 15.25 9C15.25 12.7279 12.2279 15.75 8.5 15.75C4.77379 15.7459 1.75413 12.7262 1.75 9Z"
          fill="#61788A"
        />
      </svg>
      <input
        className="w-full px-3 py-2"
        type="search"
        name="search"
        id="search"
        placeholder={text}
      />
    </form>
  );
};
