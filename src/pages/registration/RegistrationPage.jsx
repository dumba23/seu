import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputCheckbox from "../../components/form/InputCheckbox";
import InputFile from "../../components/form/InputFile";
import { fetchForm, storeForm } from "../../services/forms";

import "./RegistrationPage.css";

export default function RegistrationPage() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const callFetchForms = async () => {
      try {
        const res = await fetchForm(id);

        setData([{ title: res.data.title }, JSON.parse(res.data.fields)]);
      } catch (err) {
        console.error(err);
      }
    };

    callFetchForms();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const res = await storeForm(formValues);
    } catch (err) {
      console.error(err);
    }
  };

  if (data.length > 0)
    return (
      <div className="register-page-container">
        <div className="register-container">
          <form onSubmit={handleSubmit} className="register-form-container">
            <input type="hidden" name="form_id" value={id} />
            {data[1].map((field, idx) => {
              return (
                <div className="register-form-field" key={field.id}>
                  {idx === 0 && (
                    <h1 className="register-title">{data[0].title}</h1>
                  )}
                  {field.type !== "file" && (
                    <label className="register-form-field-label">
                      {field.label}
                    </label>
                  )}
                  {field.type === "text" && (
                    <input
                      className="register-form-field-text"
                      type={field.type}
                      name={field.label}
                      placeholder={field.label}
                    />
                  )}
                  {field.type === "select" && (
                    <select
                      name={field.label}
                      className="register-form-field-select"
                    >
                      {field.options.map((option, idx) => {
                        return (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        );
                      })}
                    </select>
                  )}
                  {field.type === "date" && (
                    <input
                      type={field.type}
                      name={field.label}
                      className="register-form-field-date"
                    />
                  )}

                  {field.type === "checkbox" && (
                    <div className="register-form-field-checkbox">
                      {field.options.map((option, idx) => {
                        return (
                          <InputCheckbox
                            option={option}
                            field={field}
                            key={idx}
                          />
                        );
                      })}
                    </div>
                  )}

                  {field.type === "file" && <InputFile label={field.label} />}
                </div>
              );
            })}
            <button type="submit" className="register-form-submit">
              გაგზავნა
            </button>
          </form>
        </div>
      </div>
    );
}
