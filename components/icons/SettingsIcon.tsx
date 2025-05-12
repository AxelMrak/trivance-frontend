export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (<svg
    width={props.width || 35}
    height={props.height || 35}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.5 17.8418V17.1582M22.9688 17.8418V17.1582M12.0312 17.8418V17.1582"
      stroke="#1E1E1E"
      strokeOpacity={0.7}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.19531 17.5C5.19531 20.7634 6.4917 23.8932 8.79927 26.2007C11.1068 28.5083 14.2366 29.8047 17.5 29.8047C20.7634 29.8047 23.8932 28.5083 26.2007 26.2007C28.5083 23.8932 29.8047 20.7634 29.8047 17.5C29.8047 14.2366 28.5083 11.1068 26.2007 8.79927C23.8932 6.4917 20.7634 5.19531 17.5 5.19531C14.2366 5.19531 11.1068 6.4917 8.79927 8.79927C6.4917 11.1068 5.19531 14.2366 5.19531 17.5Z"
      stroke="#1E1E1E"
      strokeOpacity={0.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>)
}
