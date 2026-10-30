import { Title } from "@solidjs/meta";
import Counter from "../components/Counter";
import logoSvg from "../logo.svg";
import { contentLink, logo, main } from "../styles";

export default function Home() {
  return (
    <main class={main().class}>
      <Title>Home - Solid App (Zyzz)</Title>
      <img src={logoSvg} class={logo().class} alt="Solid logo" />
      <h1>Hello Solid + Zyzz!</h1>
      <Counter />
      <p>
        Edit <code>src/routes/index.tsx</code> and save to reload.
      </p>
      <a
        class={contentLink().class}
        href="https://v2.solidjs.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Solid
      </a>
    </main>
  );
}
