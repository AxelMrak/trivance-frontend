export const MainHeader = ({
  title,
}: {
  title: string;
}) => {
  return (
    <header className="flex items-center justify-between p-4 bg-primary-base text-white w-full rounded-md">
      <h1 className="text-4xl font-normal">{title}</h1>
      <p className="text-4xl text-white font-normal">
        {
          new Date().toLocaleTimeString("es-AR", {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        }
        <span className="text-2xl font-thin ml-2">
          {
            new Date().toLocaleDateString(['es-AR'], {
              day: '2-digit',
              month: '2-digit',
            })
          }
        </span>
      </p>
    </header>
  )
}
