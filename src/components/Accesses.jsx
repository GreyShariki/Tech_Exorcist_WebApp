import { useState, useEffect } from "react";
import { accessRequest, notifyAdmins } from "./formBackend/Acesses";

export const AccessForm = ({ setActiveTab }) => {
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
    accessType: "",
    justification: "",
    fname: "",
    lname: "",
    chat_id: null,
    status: "На рассмотрении",
  });

  useEffect(() => {
    if (userData?.id) {
      setFormData((prev) => ({
        ...prev,
        chat_id: userData.id,
        fname: userData.first_name || "",
        lname: userData.last_name || "",
      }));
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.chat_id) {
      alert("Ошибка: не удалось идентифицировать пользователя");
      return;
    }

    if (
      !formData.accessType ||
      !formData.justification ||
      !formData.fname ||
      !formData.lname
    ) {
      alert("Заполните все обязательные поля");
      return;
    }

    setIsSending(true);

    try {
      const requestData = {
        access_type: formData.accessType,
        description: formData.justification,
        fname: formData.fname,
        lname: formData.lname,
        chat_id: formData.chat_id,
        status: formData.status,
      };

      const createdApp = await accessRequest(requestData);
      // await notifyAdmins(createdApp);

      alert("✅ Заявка создана! Администраторы уведомлены.");
    } catch (error) {
      console.error("Ошибка:", error);
      alert(`❌ Ошибка при создании заявки: ${error.message}`);
    } finally {
      setIsSending(false);
    }
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
                  checked={formData.accessType === "Менеджер по закупкам"}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      accessType: "Менеджер по закупкам",
                    })
                  }
                />
                Менеджер по закупкам
              </label>
              <label>
                <input
                  type="radio"
                  name="accessType"
                  value="Системный администратор"
                  checked={formData.accessType === "Системный администратор"}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      accessType: "Системный администратор",
                    })
                  }
                />
                Системный администратор
              </label>
              <label>
                <input
                  type="radio"
                  name="accessType"
                  value="Администратор"
                  checked={formData.accessType === "Администратор"}
                  onChange={() =>
                    setFormData({ ...formData, accessType: "Администратор" })
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
          <button type="submit" className="btn-seal" disabled={isSending}>
            {isSending ? "Отправка..." : "Запечатать прошение"}
          </button>
        </div>
      </form>
      <div style={{ marginTop: "20px" }}>
        <h3>Не люблю дебажить, но надо:</h3>
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
                  {value !== null ? value.toString() : "null"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
