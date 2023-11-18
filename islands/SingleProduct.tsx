import { showFile } from "../utils/file.ts";
import Review from "../components/Review.tsx";
import { useState } from "preact/hooks";
import AddReviewModal from "../components/AddReviewModal.tsx";

export default function SingleProduct({ data, id }: any) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <>
      <div
        onClick={handleBackdropClick}
        class={`${
          showModal
            ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
            : ""
        }`}
      >
      </div>
      {
        <div class="px-8 py-6 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={showFile(data.image)}
            alt="single-product"
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data.title}
            </h5>
            <p className="max-w-[800px] mb-3 font-normal text-gray-700 dark:text-gray-400">
              {data.description}
            </p>
            <div>
              <a className=" mr-4 my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add to Cart
              </a>
              <button
                onClick={() => setTimeout(() => setShowModal(true), 100)}
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Add Review
              </button>
              <AddReviewModal
                showModal={showModal}
                closeModal={closeModal}
                id={id}
              />
            </div>
          </div>
        </div>
      }
      <div class="bg-[#1f2937] px-4 py-6">
        <Review data={data.reviews} />
      </div>
    </>
  );
}
