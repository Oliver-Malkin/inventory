import NavBar from "@/app/ui/dashboard/nav-bar"
import Header from "@/app/ui/header/header"

export default function Layout({
  children
}: {
  children: React.ReactNode
}
) {
  return (
    <div className="flex h-screen md:flex-row sm:overflow-hidden">
      <div className="flex-none hidden sm:block">
        <NavBar />
      </div>

      <div className="flex flex-col grow">
        <Header />
        <div className="flex-grow p-4 md:overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
