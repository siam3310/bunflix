export default function TmdbHomeSkeleton() {
  return (
    <>
      <div className=" w-full overflow-hidden">
        <div className="flex gap-4 px-2 w-fit">
          {[...Array.from(Array(8).keys())].map((i) => (
            <div
              key={i}
              style={{
                animationDelay: `${i * 0.9}s`,
                animationDuration: "2s",
              }}
              className=" rounded-lg h-[300px] w-[200px] bg-gray-400 inline-block animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
