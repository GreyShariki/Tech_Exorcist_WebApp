import { useState, useEffect } from "react";

export const NetworkForm = ({ setActiveTab }) => {
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
    location: "Главный офис",
    connectionType: "wifi",
    symptoms: [],
    description: "",
    chat_id: userData,
    startTime: "",
  });

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      symptoms: e.target.checked
        ? [...prev.symptoms, value]
        : prev.symptoms.filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Отправка сетевой заявки:", formData);
    alert("Сигнал послан в магическую паутину!");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Свиток разрыва магической паутины</h2>

      <form onSubmit={handleSubmit}>
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
                value="slow"
                checked={formData.symptoms.includes("slow")}
                onChange={handleCheckboxChange}
              />
              Медленная передача данных
            </label>
            <label>
              <input
                type="checkbox"
                value="disconnect"
                checked={formData.symptoms.includes("disconnect")}
                onChange={handleCheckboxChange}
              />
              Разрывы соединения
            </label>
            <label>
              <input
                type="checkbox"
                value="no_access"
                checked={formData.symptoms.includes("no_access")}
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

        <div className="form-actions">
          <button
            type="button"
            className="btn-seal"
            onClick={() => setActiveTab(null)}
          >
            ← Назад
          </button>
          <button type="submit" className="btn-seal">
            Призвать сетевых магов
          </button>
        </div>
      </form>
    </div>
  );
};
