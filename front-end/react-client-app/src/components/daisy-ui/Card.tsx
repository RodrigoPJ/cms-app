import type { CardInterface } from "../../utils/types/components-interface";
export function Card({ title, body, button }: CardInterface) {
  function handleButtonClick() {
    if (button) {
      button.action();
    }
  }
  return (
    <div className="card card-border bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{body}</p>
        {button && (
          <div className="card-actions justify-center">
            <button onClick={handleButtonClick} className="btn btn-primary">
              {button.text}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
