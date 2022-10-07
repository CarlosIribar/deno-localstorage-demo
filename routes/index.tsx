import { Handler, PageProps } from "$fresh/server.ts";

interface Data {
  email: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const email = url.searchParams.get("email") || "";
    const emailsStorage = localStorage.getItem("email");
    const emails = emailsStorage ? JSON.parse(emailsStorage) : [];

    console.log(emails);
    emails.push(email);

    localStorage.setItem("email", JSON.stringify(emails));

    console.log("email", email);

    return ctx.render({ email });
  },
};

export default function Home({ data }: PageProps<Data>) {
  const { email } = data;
  return (
    <main className="mt-20">
      <form className="flex flex-col items-center">
        <label className="text-2xl" htmlFor="email">Agrega tu Email</label>
        <input
          type="email"
          name="email"
          className="border border-blue w-64"
          value={email}
        />
        <button type="submit" className="bg-blue-500 mt-2 p-2 round text-white">
          Submit
        </button>
      </form>
      {email && <p>{email}</p>}
    </main>
  );
}
