import type { FormInputInterface } from "../../utils/types/components-interface";

export function FormInput({id, label, type, name, value, handleChange, required}: FormInputInterface){
  return(
    <div className="form-control">
            <label className="label" htmlFor={id}>
              {label && <span className="label-text">{label}</span>}
            </label>
            <input
              type={type}
              id={id}
              name={name}
              className="input input-bordered"
              value={value}
              onChange={handleChange}
              required ={required ? required : false}
            />
          </div>
  )
}