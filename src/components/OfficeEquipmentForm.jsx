import { useState, useEffect } from "react";
import { MyButton } from "./button";
import { officeRequest, notifyOfficeManagers } from "./formBackend/Office.js";

export const OfficeEquipmentForm = ({ setActiveTab }) => {
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
    itemType: "Бумага A4",
    quantity: 1,
    location: "",
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

    if (!formData.location) {
      alert("Укажите локацию для доставки");
      return;
    }

    setIsSending(true);

    try {
      const createdApp = await officeRequest(formData);
      await notifyOfficeManagers(createdApp);

      alert("✅ Заявка создана! Менеджеры по закупкам уведомлены.");
    } catch (error) {
      console.error("Ошибка:", error);
      alert(`❌ Ошибка при создании заявки: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Заказ расходников</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Локация:
            <input
              type="text"
              className="form-input"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            Что нужно:
            <select
              className="form-select"
              value={formData.item}
              onChange={(e) =>
                setFormData({ ...formData, itemType: e.target.value })
              }
            >
              <option value="Бумага A4">Бумага A4</option>
              <option value="Картридж">Картридж</option>
              <option value="Ручки/Карандаши">Ручки/Карандаши</option>
              <option value="Другое">Другое</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            Количество:
            <input
              className="form-input"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: parseInt(e.target.value) || 1,
                })
              }
              required
            />
          </label>
        </div>

        <div className="form-actions">
          <MyButton
            type="button"
            className="btn-seal"
            onClick={() => setActiveTab(null)}
          >
            ← Назад
          </MyButton>
          <MyButton type="submit" className="btn-seal" disabled={isSending}>
            {isSending ? "Отправка..." : "Запечатать заявку"}
          </MyButton>
        </div>
      </form>
    </div>
  );
};
