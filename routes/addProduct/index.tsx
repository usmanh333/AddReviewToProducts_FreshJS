import { fileUpload } from "../../utils/file.ts";
import { Handlers, Status } from "$fresh/server.ts";
import { createProduct } from "../../database/Product/operations.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const form = await req.formData();
      const action = form.get("_action");
      if (action === "add") {
        const title = form.get("title") as string;
        const desc = form.get("desc") as string;
        let image: any = form.get("image") as File;
        if (image) {
          image = await fileUpload(image);
        }
        createProduct({
          title,
          description: desc,
          image: image,
          reviews: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      } else {
        return new Response(null, {
          status: 500,
        });
      }
      return new Response(null, {
        status: Status.Found,
        headers: {
          location: "/products",
        },
      });
    } catch (error) {
      console.error(error);
      return new Response(null, {
        status: 403,
      });
    }
  },
};

export default function index() {
  return (
    <div class="bg-[#1f2937] mx-[20%] px-20 py-20 rounded-3xl my-[3%]">
      <div class="text-4xl text-center font-bold mb-10">Add Product</div>
      <div class={"flex justify-center"}>
        <div class="form-control w-full max-w-xs">
          <form method={"post"} encType="multipart/form-data">
            <div class="label">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter your product name..."
                class="my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="title"
                id="title"
              />
            </div>
            <div class="label">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                placeholder="Enter your description..."
                class="my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="desc"
                id="desc"
              />
            </div>
            <div class="label mt-3">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Profile
              </label>
              <input
                type="file"
                class="my-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-1"
                name="image"
                accept="image/*"
              />
            </div>
            <button
              name="_action"
              value="add"
              class="my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
