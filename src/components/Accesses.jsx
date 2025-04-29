import { useState } from "react";

export const AccessForm = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    accessType: "",
    justification: "",
    lname: "",
    fname: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Отправка заявки на доступ:", formData);
    alert("Прошение отправлено хранителю ключей!");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Прошение о доступе</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Имя:
            <input
              type="text"
              className="form-input"
              value={formData.fname}
              onChange={(e) =>
                setFormData({ ...formData, fname: e.target.value })
              }
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Фамилия:
            <input
              type="text"
              className="form-input"
              value={formData.lname}
              onChange={(e) =>
                setFormData({ ...formData, lname: e.target.value })
              }
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Тип доступа:
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="accessType"
                  value="Менеджер по закупкам"
                  checked={formData.accessType === "write"}
                  onChange={() =>
                    setFormData({ ...formData, accessType: "write" })
                  }
                />
                Менеджер по закупкам
              </label>
              <label>
                <input
                  type="radio"
                  name="accessType"
                  value="Системный администратор"
                  checked={formData.accessType === "write"}
                  onChange={() =>
                    setFormData({ ...formData, accessType: "write" })
                  }
                />
                Системный администратор
              </label>
              <label>
                <input
                  type="radio"
                  name="accessType"
                  value="Администратор"
                  checked={formData.accessType === "admin"}
                  onChange={() =>
                    setFormData({ ...formData, accessType: "admin" })
                  }
                />
                Администратор
              </label>
            </div>
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            Обоснование:
            <textarea
              className="form-textarea"
              value={formData.justification}
              onChange={(e) =>
                setFormData({ ...formData, justification: e.target.value })
              }
              required
            />
          </label>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-seal"
            onClick={() => setActiveTab(null)}
          >
            ← Назад
          </button>
          <button type="submit" className="btn-seal">
            Запечатать прошение
          </button>
        </div>
      </form>
    </div>
  );
};
