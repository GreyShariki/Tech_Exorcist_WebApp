import { useState, useEffect } from "react";
import { networkRequest, notifyNetworkMasters } from "./formBackend/Network.js";

export const NetworkForm = ({ setActiveTab }) => {
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
    location: "Главный офис",
    connectionType: "Wi-fi",
    symptoms: [],
    description: "",
    chat_id: null,
    startTime: "",
    status: "На рассмотрении",
  });

  useEffect(() => {
    if (userData?.id) {
      setFormData((prev) => ({ ...prev, chat_id: userData.id }));
    }
  }, [userData]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      symptoms: e.target.checked
        ? [...prev.symptoms, value]
        : prev.symptoms.filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.chat_id) {
      alert("Ошибка: не удалось идентифицировать пользователя");
      return;
    }

    if (!formData.description || !formData.startTime) {
      alert("Заполните обязательные поля: описание и время начала проблемы");
      return;
    }

    setIsSending(true);

    try {
      const requestData = {
        ...formData,
        signsStr: formData.symptoms.join(", "),
      };

      const createdApp = await networkRequest(requestData);
      await notifyNetworkMasters(createdApp);

      alert("✅ Заявка создана! Сетевые администраторы уведомлены.");
    } catch (error) {
      console.error("Ошибка:", error);
      alert(`❌ Ошибка при создании заявки: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Свиток разрыва магической паутины</h2>

      <form>
        <div className="form-group">
          <label className="form-label">
            Локация:
            <select
              className="form-select"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            >
              <option value="Главный офис">
                Главный офис, ул. Крупской, д.103, комната 507а
              </option>
              <option value="Филиал, Мордор">Филиал, Мордор</option>
              <option value="Филиал, Звезда смерти">
                Филиал, Звезда смерти
              </option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Тип соединения:
            <select
              className="form-select"
              value={formData.connectionType}
              onChange={(e) =>
                setFormData({ ...formData, connectionType: e.target.value })
              }
            >
              <option value="Wi-fi">Wi-fi</option>
              <option value="Кабельное соединение">Кабельное соединение</option>
              <option value="Оба вида">Оба вида</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">Симптомы:</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="Медленная передача данных"
                checked={formData.symptoms.includes(
                  "Медленная передача данных"
                )}
                onChange={handleCheckboxChange}
              />
              Медленная передача данных
            </label>
            <label>
              <input
                type="checkbox"
                value="Разрывы соединения"
                checked={formData.symptoms.includes("Разрывы соединения")}
                onChange={handleCheckboxChange}
              />
              Разрывы соединения
            </label>
            <label>
              <input
                type="checkbox"
                value="Нет доступа в сеть"
                checked={formData.symptoms.includes("Нет доступа в сеть")}
                onChange={handleCheckboxChange}
              />
              Нет доступа в сеть
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Когда началось:
            <input
              type="datetime-local"
              className="form-input"
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
            />
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
            Призвать сетевых магов
          </button>
        </div>
      </form>
      <div style={{ marginTop: "20px" }}>
        <h3>Таблица для дебага:</h3>
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Поле</th>
              <th>Значение</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(formData).map(([key, value]) => (
              <tr key={key}>
                <td style={{ padding: "5px" }}>{key}</td>
                <td style={{ padding: "5px" }}>
                  {Array.isArray(value)
                    ? value.join(", ")
                    : value !== null
                    ? value.toString()
                    : "null"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
