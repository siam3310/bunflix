export default async function TmdbInfoSkeleton() {
    return (
      <div className=" m-4">
        <div className=" lg:flex">
          <div className="lg:w-[290px] bg-gray-500 animate-pulse h-[450px] w-full rounded-lg"></div>
          <div className=" lg:ml-4 w-full">
            <div className=" animate-pulse  rounded-lg bg-gray-500 h-12 mb-4 lg:mt-0 mt-4 w-full"></div>
            <div className=" animate-pulse rounded-lg bg-gray-500 h-[385px] mb-4 w-full"></div>
          </div>
        </div>
      </div>
    );
  }
  