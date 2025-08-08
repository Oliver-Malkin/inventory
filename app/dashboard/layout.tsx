import Header from "@/app/ui/header/header"

export default function Layout({
  children
}: {
  children: React.ReactNode
}
) {
  return (
    <main className="flex flex-row h-screen">
      <div className="flex flex-col grow">
        <Header />
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="flex flex-row max-w-[95%] justify-center items-center overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
