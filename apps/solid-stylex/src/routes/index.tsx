import { Title } from "@solidjs/meta";
import * as stylex from "@stylexjs/stylex";
import Counter from "../components/Counter";
import logoSvg from "../logo.svg";
import { appStyles } from "../styles";

export default function Home() {
  return (
    <main class={stylex.attrs(appStyles.main).class}>
      <Title>Home - Solid App (StyleX)</Title>
      <div>
        <img src={logoSvg} class={stylex.attrs(appStyles.logo).class} alt="Solid logo" />
      </div>
      <h1>Hello Solid + StyleX!</h1>
      <Counter />
      <p>
        Edit <code>src/routes/index.tsx</code> and save to reload.
      </p>
      <a
        class={stylex.attrs(appStyles.contentLink).class}
        href="https://v2.solidjs.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Solid
      </a>
    </main>
  );
}
