export default function AuthLayout({
  children
}:{
  children: React.ReactNode}
){
  return(
    <main>
      <div className="flex flex-col h-screen justify-center items-center">
        {children}
      </div>
    </main>
  )
}
