export default async function AnimeWatchPlayerInfoSkeleton() {
    return(
        <div className="h-full xl:flex gap-4">
          <div className=" rounded-lg h-[516px] animate-pulse bg-gray-400 xl:w-1/3"></div>
          <div className=" xl:w-2/3  grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-4 xl:mt-0 gap-4">
          {[...Array.from(Array(8).keys())].map((i) => (
            <div
              key={i}
              style={{
                animationDelay: `${i * .5}s`,
                animationDuration: "2s",
              }}
              className=" rounded-lg h-[250px] bg-gray-400  inline-block animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    )
}