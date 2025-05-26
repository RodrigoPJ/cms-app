import { Link } from "react-router";
import type { HeroComponent } from "../../utils/types/components-interface";

export function Hero({image, title, body, cta, children}:HeroComponent){
  return (
    <div
  className="hero min-h-screen"
  style={image ? {
    backgroundImage: image
  } : {}}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">{title}</h1>
      <p className="mb-5">
        {body}
      </p>
      {children}
      {cta?.link && <Link to={cta.link} className="btn btn-primary">{cta.text}</Link>}
    </div>
  </div>
</div>
  )
}