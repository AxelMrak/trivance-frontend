export default function PhoneIcon({ className = 'w-5 h-5' }: { className?: string }) {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h2.586a1 1 0 01.707.293l2.828 2.828a1 1 0 01.293.707V9.172a1 1 0 01-.293.707L9.172 12.828a16.001 16.001 0 006 6l2.949-2.949a1 1 0 01.707-.293h2.586a1 1 0 011 1V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    );
  }
  