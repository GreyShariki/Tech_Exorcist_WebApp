import { useState, useEffect } from "react";
import { otherRequest, notifyManagers } from "./formBackend/Another";

export const OtherForm = ({ setActiveTab }) => {
  const [userData, setUserData] = useState(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      const user = tg.initDataUnsafe?.user;
      setUserData(user);
      tg.expand();
    }
  }, []);

  const [formData, setFormData] = useState({
    category: "",
    urgency: "Низкая",
    description: "",
    chat_id: null,
    status: "На рассмотрении",
  });

  useEffect(() => {
    if (userData?.id) {
      setFormData((prev) => ({ ...prev, chat_id: userData.id }));
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.chat_id) {
      alert("Ошибка: не удалось идентифицировать пользователя");
      return;
    }

    if (!formData.category || !formData.description) {
      alert("Заполните обязательные поля: категория и описание");
      return;
    }

    setIsSending(true);

    try {
      const createdApp = await otherRequest(formData);
      await notifyManagers(createdApp);

      alert("✅ Заявка создана! Ответственные уведомлены.");
    } catch (error) {
      console.error("Ошибка:", error);
      alert(`❌ Ошибка при создании заявки: ${error.message}`);
    } finally {
      setIsSending(false);
    }
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
          <button type="submit" className="btn-seal" disabled={isSending}>
            {isSending ? "Отправка..." : "Отправить в совет"}
          </button>
        </div>
      </form>
    </div>
  );
};
