import { useState } from "react";

export const OtherForm = ({ setActiveTab }) => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    urgency: "Низкая",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Отправка общей заявки:", formData);
    alert("Ваше обращение попало в магический совет!");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Свиток иных проблем</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Категория проблемы:
            <input
              type="text"
              className="form-input"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            Срочность:
            <select
              className="form-select"
              value={formData.urgency}
              onChange={(e) =>
                setFormData({ ...formData, urgency: e.target.value })
              }
            >
              <option value="Низкая">Низкая (можно подождать)</option>
              <option value="Обычная">Обычная (в течение дня)</option>
              <option value="Срочная">Срочная (немедленно)</option>
              <option value="Критическая">Критическая (все сломалось!)</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            Подробное описание:
            <textarea
              className="form-textarea"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
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
            Отправить в совет
          </button>
        </div>
      </form>
    </div>
  );
};
