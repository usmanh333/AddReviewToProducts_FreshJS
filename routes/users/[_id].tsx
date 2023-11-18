import { Handlers } from "$fresh/server.ts";
import ProfilePage from "../../islands/ProfilePage.tsx";
import { fetchUser } from "../../database/Users/operations.ts";

export const handler: Handlers = {
    async GET(_req, ctx: any) {
      try {
        const id = ctx.params._id;
        const users = await fetchUser(id);
        return await ctx.render(users);
      } catch (error) {
        console.error(error);
      }
    },
  };

export default function index(props:any) {
    const id = props.params._id
    const data = props.data
  return (
    <div>
        <ProfilePage data={data} id={id} />
    </div>
  )
}
