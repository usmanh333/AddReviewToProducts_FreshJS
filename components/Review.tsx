import { Reviews } from "../database/Product/schema.ts";
import { formatDate } from "../utils/formatDate.ts";
import StarsSVG from "./StarsSVG.tsx";

export default function Review({ data, isProfilePage }: any) {
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * 2); 
    return randomIndex === 0 ? "/download2.jpg" : "/download3.jpg";
  };

  return (
    <div class='px-8 py-6'>
      <h2 class="text-2xl font-extrabold my-3">{isProfilePage ? 'User' :'Product'} Reviews</h2>
      {data?.length > 0 ? (
        data.map((review: Reviews, index: number) => (
          <article key={index} class='max-w-[450px]'>
            <div className="flex items-center mb-4 space-x-4">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={getRandomImage()}
                alt={index + "image"}
              />
              <div className="space-y-1 font-medium dark:text-white">
                <p>
                  Jese Leos {index+1}
                  <time
                    dateTime="2014-08-16 19:00"
                    className="block text-sm text-gray-500 dark:text-gray-400"
                  >
                    Joined on August 2014
                  </time>
                </p>
              </div>
            </div>
            <div className="flex items-center mb-1">
              <StarsSVG rating={review.rating} />
            </div>
            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              <p>
                <time dateTime="2017-03-03 19:00">{formatDate(review.createdAt)}</time>
              </p>
            </footer>
            <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify	">{review.remarks}</p>
            <a
              href="#"
              className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Read more
            </a>
          </article>
        ))
      ) : (
        <p>No reviews for this {isProfilePage ? 'User' :'Product'} have been posted yet.</p>
      )}
    </div>
  );
}
