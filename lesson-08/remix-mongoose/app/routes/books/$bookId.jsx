import { useLoaderData, useCatch, json } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ params }) {
  const db = await connectDb();
  const book = await db.models.Book.findById(params.bookId);

  if (!book) {
    throw new Response(`Couldn't find book with ID ${params.bookId}`, {
      status: 404,
    });
  }

  return json(book);
}

export default function BookPage() {
  const book = useLoaderData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p>Author: {book.author}</p>
      <br></br>
      <p>
        Price: {book.price} {book.currency}
      </p>
      <br></br>
      <p>{book.description}</p>
      {/* {book.reviews.map((review) => {
        return <p>{review.description}</p>;
      })} */}
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {caught.status} {caught.statusText}
      </h1>
      <p>{caught.data}</p>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <h1 className="text-2xl font-bold mb-4">
      {error.name}: {error.message}
    </h1>
  );
}
