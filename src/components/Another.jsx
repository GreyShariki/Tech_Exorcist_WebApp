import { useState } from "react";

export const OtherForm = ({ setActiveTab }) => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    urgency: "Низкая",
    description: "",
    attachments: [],
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachments: [...e.target.files] });
    setFiles(Array.from(e.target.files));
  };

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

        <div className="form-group">
          <label className="form-label">Приложить свитки:</label>
          <div className="file-upload-wrapper">
            <input
              type="file"
              id="file-upload"
              className="file-input"
              onChange={handleFileChange}
              multiple
            />
            <label htmlFor="file-upload" className="file-upload-btn">
              <span className="file-icon">📜</span>
              Выберите изображения (опционально)
            </label>
            <span className="file-name">
              {files.length > 0
                ? `${files.length} файлов выбрано`
                : "Ничего не выбрано"}
            </span>
          </div>
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
