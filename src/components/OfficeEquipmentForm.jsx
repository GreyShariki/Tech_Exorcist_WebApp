import { useState } from "react";
import { MyButton } from "./button";

export const OfficeEquipmentForm = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    itemType: "Бумага",
    quantity: 1,
    location: "",
  });

  return (
    <div className="form-container">
      <h2>Заказ расходников</h2>
      <div className="form-group">
        <label className="form-label">
          Имя:
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
            value={formData.itemType}
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
              setFormData({ ...formData, quantity: e.target.value })
            }
          />
        </label>
      </div>
      <div className="form-actions">
        <MyButton className="btn-seal" onClick={() => setActiveTab(null)}>
          ← Назад
        </MyButton>
        <MyButton type="submit" className="btn-seal">
          Запечатать заявку
        </MyButton>
      </div>
    </div>
  );
};
