import { useState } from "react";

export const EquipmentForm = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    equipmentType: "Принтер",
    inventoryNumber: "",
    problemType: "Не функционирует",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Отправка заявки на оборудование:", formData);
    alert("Зачарование отправлено в кузницу!");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Свиток поломки артефактов</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Тип оборудования:
            <select
              className="form-select"
              value={formData.equipmentType}
              onChange={(e) =>
                setFormData({ ...formData, equipmentType: e.target.value })
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
              value={formData.inventoryNumber}
              onChange={(e) =>
                setFormData({ ...formData, inventoryNumber: e.target.value })
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
              value={formData.problemType}
              onChange={(e) =>
                setFormData({ ...formData, problemType: e.target.value })
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
          <button type="submit" className="btn-seal">
            Запечатать заявку
          </button>
        </div>
      </form>
    </div>
  );
};
