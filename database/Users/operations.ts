import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import { Users, Reviews } from "./schema.ts";
import { db } from "../connection.ts";

const usersCollection = db.collection<Users>("users");

export async function createProduct(params: Users) {
  try {
    const createUser = await usersCollection.insertOne(params);
    return createUser.toString();
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchUsers() {
  try {
    const users = await usersCollection.find();
    return users.toArray();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUser(id: string) {
  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(id: string, params: Users) {
  try {
    const updateUser = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: params },
    );
    return updateUser;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserReview(id: string, params: Reviews) {
  try {
    const user: Users | undefined = await usersCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!user) {
      return { error: "User not found" };
    }
    if (!user.reviews) {
        user.reviews = [];
    }
    user.reviews.push(params);
    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { reviews: user.reviews },
      },
    );
    if (updateResult.modifiedCount === 1) {
      return { success: "Review added successfully" };
    } else {
      return { error: "Failed to update the user review" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while updating the user review" };
  }
}

export async function deleteUser(id: string) {
  try {
    const deleteUser = await usersCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return deleteUser;
  } catch (error) {
    console.error(error);
  }
}
