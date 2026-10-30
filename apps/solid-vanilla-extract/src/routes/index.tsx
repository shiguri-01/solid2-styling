import { Title } from "@solidjs/meta";
import Counter from "../components/Counter";
import logoSvg from "../logo.svg";
import { contentLink, logo, main } from "../styles.css";

export default function Home() {
  return (
    <main class={main}>
      <Title>Home - Solid App (vanilla-extract)</Title>
      <div>
        <img src={logoSvg} class={logo} alt="Solid logo" />
      </div>
      <h1>Hello Solid + vanilla-extract!</h1>
      <Counter />
      <p>
        Edit <code>src/routes/index.tsx</code> and save to reload.
      </p>
      <a
        class={contentLink}
        href="https://v2.solidjs.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Solid
      </a>
    </main>
  );
}
