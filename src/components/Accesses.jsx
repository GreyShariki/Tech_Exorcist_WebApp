import { useState } from "react";

export const AccessForm = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    system: "Почта",
    accessType: "read",
    duration: "Постоянный",
    justification: "",
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
            Система:
            <select
              className="form-select"
              value={formData.system}
              onChange={(e) =>
                setFormData({ ...formData, system: e.target.value })
              }
            >
              <option value="Почта">Почта</option>
              <option value="ERP-система">ERP-система</option>
              <option value="Сетевой доступ">Сетевой доступ</option>
              <option value="Другая">Другая</option>
            </select>
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
                  value="read"
                  checked={formData.accessType === "read"}
                  onChange={() =>
                    setFormData({ ...formData, accessType: "read" })
                  }
                />
                Только чтение
              </label>
              <label>
                <input
                  type="radio"
                  name="accessType"
                  value="write"
                  checked={formData.accessType === "write"}
                  onChange={() =>
                    setFormData({ ...formData, accessType: "write" })
                  }
                />
                Запись
              </label>
              <label>
                <input
                  type="radio"
                  name="accessType"
                  value="admin"
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
            Срок доступа:
            <select
              className="form-select"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            >
              <option value="1 день">1 день</option>
              <option value="1 неделя">1 неделя</option>
              <option value="1 месяц">1 месяц</option>
              <option value="Постоянный">Постоянный</option>
            </select>
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
