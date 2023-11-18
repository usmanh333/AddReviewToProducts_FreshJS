import { Handlers } from "$fresh/server.ts";
import SingleProduct from "../../islands/SingleProduct.tsx";
import { fetchProduct } from "../../database/Product/operations.ts";

export const handler: Handlers = {
  async GET(_req, ctx: any) {
    try {
      const id = ctx.params._id;
      const users = await fetchProduct(id);
      return await ctx.render(users);
    } catch (error) {
      console.error(error);
    }
  },
};

export default function index(props: any) {
  return (
    <div class="my-4 mx-4">
      <SingleProduct data={props.data} id={props.params._id} />
    </div>
  );
}
