import { Handlers } from "$fresh/server.ts";
import { fetchProduct } from "../../../database/Product/operations.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    try {
      const { id } = await ctx.params;
      const res = await fetchProduct(id);
      return new Response(JSON.stringify(res));
    } catch (error) {
      console.error(error);
      return new Response(undefined, {
        status: 500,
      });
    }
  },
};


// frontend
// const productResponse = await fetch(`/api/products/${id}`, {
//   method: 'POST',
//   body: JSON.stringify(id)
// });