export default async function TmdbHomeSkeleton() {
  return (
    <>
      <div className=" w-full overflow-hidden">
      <div className=" m-4 animate-pulse w-96 rounded-lg bg-gray-500 h-12 mb-4"></div>
        <div className="flex gap-4 m-4 w-fit">
          {[...Array.from(Array(8).keys())].map((i) => (
            <div
              key={i}
              style={{
                animationDelay: `${i * 0.9}s`,
                animationDuration: "2s",
              }}
              className=" rounded-lg h-[400px] min-w-[250px]   bg-gray-400 w-full inline-block animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
