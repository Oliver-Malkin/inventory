import Header from "@/components/header/header"

export default function Layout({
  children
}: {
  children: React.ReactNode
}
) {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col grow">
        <Header />
        <div className="overflow-y-auto">
          <div className="items-center justify-center container mx-auto md:max-w-[75%] max-w-[95%] py-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
