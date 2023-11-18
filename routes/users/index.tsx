import { Handlers } from "$fresh/server.ts";
import Users from "../../islands/Users.tsx";
import { fetchUsers } from "../../database/Users/operations.ts";

export const handler: Handlers = {
    async GET(req, ctx: any) {
      try {
        const users = await fetchUsers();
        return await ctx.render(users);
      } catch (error) {
        console.error(error);
      }
    },
  };

export default function index({data}:any) {
  return (
    <div>
      <Users data={data} />
    </div>
  )
}
