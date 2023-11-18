import { Handlers } from "$fresh/server.ts";
import { updateUserReview } from "../../../database/Users/operations.ts";

export const handler: Handlers = {
  async POST(req, _) {
    try {
      const { remarks, rating, createdAt, updatedAt, id } = await req.json();
      const param = {remarks, rating, createdAt, updatedAt}
      const res = await updateUserReview(id, param)
      return new Response(JSON.stringify(res));
    } catch (error) {
      console.error(error);
      return new Response(undefined, {
        status: 500,
      });
    }
  },
};