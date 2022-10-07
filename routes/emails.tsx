import {Handlers, PageProps} from "$fresh/server.ts";

interface Data {
 email: string[]
 }

export const handler: Handlers<Data> = {
  GET(_req, ctx) {
    const emailsStorage = localStorage.getItem("email");

    const email = emailsStorage ? JSON.parse(emailsStorage) : [];

    console.log(email);

    return ctx.render({ email });
  },
};

export default function EmailPage({ data }: PageProps<Data>) {
    const { email } = data;
    return (
        <main>
            <h1>Emails</h1>
            <ul>
                {email.map((email) => (
                    <li>{email}</li>
                ))}
            </ul>
        </main>
    );
}
