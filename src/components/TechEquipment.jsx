import { useState, useEffect } from "react";
import { techRequest, notifyMasters } from "./formBackend/Tech.js";
export const EquipmentForm = ({ setActiveTab }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;

      const user = tg.initDataUnsafe?.user;
      setUserData(user);

      tg.expand();
    }
  }, []);
  const [formData, setFormData] = useState({
    type_of_device: "Принтер",
    number: "",
    type_of_failure: "Не функционирует",
    description: "",
    status: "На рассмотрении",
    chat_id: null,
  });
  useEffect(() => {
    if (userData?.id) {
      setFormData((prev) => ({ ...prev, chat_id: userData.id }));
    }
  }, [userData]);
  const handleSubmit = async () => {
    if (!formData.chat_id) {
      alert("нет чат айди");
      return;
    }
    if (!formData.description || !formData.number) {
      alert("Заполните обязательные поля!");
      return;
    }

    try {
      const createdApp = await techRequest(formData);

      await notifyMasters(createdApp);

      alert("✅ Заявка создана! Мастера уведомлены.");
    } catch (error) {
      console.error("Ошибка:", error);
      alert(`❌ Ошибка при создании заявки ${error}`);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Свиток поломки артефактов</h2>

      <form>
        <div className="form-group">
          <label className="form-label">
            Тип оборудования:
            <select
              className="form-select"
              value={formData.type_of_device}
              onChange={(e) =>
                setFormData({ ...formData, type_of_device: e.target.value })
              }
            >
              <option value="ПК">ПК</option>
              <option value="Принтер">Принтер</option>
              <option value="Телефон">Рабочий телефон</option>
              <option value="Планшет">Планшет</option>
              <option value="Холодильник">Умный холодильник</option>
              <option value="Другое">Другое</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            Номер в кадастре:
            <input
              type="text"
              className="form-input"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            Характер поломки:
            <select
              className="form-select"
              value={formData.type_of_failure}
              onChange={(e) =>
                setFormData({ ...formData, type_of_failure: e.target.value })
              }
            >
              <option value="Не функционирует">Не функционирует</option>
              <option value="Физически поврежден">Физически поврежден</option>
              <option value="Издает странные звуки">
                Издает странные звуки
              </option>
              <option value="Обрел разум">Обрел разум</option>
              <option value="Другое">Другое</option>
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
          <button type="button" onClick={handleSubmit} className="btn-seal">
            Запечатать заявку
          </button>
        </div>
      </form>
    </div>
  );
};
