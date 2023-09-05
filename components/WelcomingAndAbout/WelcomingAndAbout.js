import Image from "next/image";

export default function WelcomingAbout() {
  return (
    <section>
      <h2>Hello and welcome to my online art gallery!</h2>
      <Image width={100} height={100} src="/img/avatar.jpg" alt="Avatar" />
      <p>
        My name is Vincent, and I am an artist who enjoys working with oil and acrylic paints. I
        strive to create paintings that incorporate vivid colors and intricate details, aiming to
        transport viewers into a world of imagination.
      </p>
    </section>
  );
}
