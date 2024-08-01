export default async function SearchSkeleton(){
    return(
        <div className=" p-4">
            <div className=" animate-pulse w-28 lg:w-96 rounded-lg bg-gray-500 h-12 mb-4"></div>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3  xl:grid-cols-5 2xl:grid-cols-6 ">
            {[...Array.from(Array(10).keys())].map((i)=>(
                <div
                key={i}
                style={{
                    animationDelay:`${i*.9}s`,
                    animationDuration:'2s'
                }}
                className=" rounded-lg h-[400px] bg-gray-400 w-full inline-block animate-pulse"></div>
            ))}
            </div>
        </div>
    )
}