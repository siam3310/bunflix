export default async function CategoriesSkeleton(){
    return(
        <div className=" overflow-hidden m-4 ">
            <div className=" animate-pulse w-96 rounded-lg bg-gray-500 h-16 mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-full gap-4">
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