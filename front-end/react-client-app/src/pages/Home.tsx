import { Hero } from "../components/daisy-ui/Hero";
import pages from "../utils/content/pages";

export function Home() {
  const content = pages.home;
  return (
    <Hero
      title={content.title}
      body={content.body}
      image={content.backGroundImage}
      cta={{
        link: content.ctaLink,
        text: content.cta,
      }}
    >
      <p>hello from home</p>
    </Hero>
  );
}
