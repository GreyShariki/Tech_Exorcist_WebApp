import { useState, useEffect } from "react";
import { MyButton } from "./components/button";
import { OfficeEquipmentForm } from "./components/OfficeEquipmentForm";
import { EquipmentForm } from "./components/TechEquipment";
import { NetworkForm } from "./components/Network";
import { AccessForm } from "./components/Accesses";
import { OtherForm } from "./components/Another";

const tg = window.Telegram.WebApp;
function App() {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.enableClosingConfirmation();
    }
  }, []);

  const [activeTab, setActiveTab] = useState(null);

  const renderForm = () => {
    switch (activeTab) {
      case "office":
        return <OfficeEquipmentForm setActiveTab={setActiveTab} />;
      case "tech":
        return <EquipmentForm setActiveTab={setActiveTab} />;
      case "internet":
        return <NetworkForm setActiveTab={setActiveTab} />;
      case "admin":
        return <AccessForm setActiveTab={setActiveTab} />;
      case "another":
        return <OtherForm setActiveTab={setActiveTab} />;
      default:
        return (
          <div className="buttons-container">
            <MyButton
              className="btn-seal btn-menu"
              onClick={() => setActiveTab("office")}
            >
              Пополнение расходников
            </MyButton>
            <MyButton
              className="btn-seal btn-menu"
              onClick={() => setActiveTab("tech")}
            >
              Техническое оборудование
            </MyButton>
            <MyButton
              className="btn-seal btn-menu"
              onClick={() => setActiveTab("internet")}
            >
              Сеть и интернет
            </MyButton>
            <MyButton
              className="btn-seal btn-menu"
              onClick={() => setActiveTab("admin")}
            >
              Доступы и права
            </MyButton>
            <MyButton
              className="btn-seal btn-menu"
              onClick={() => setActiveTab("another")}
            >
              Другое
            </MyButton>
          </div>
        );
    }
  };

  return (
    <div className="app-container" style={{ minHeight: tg.viewportHeight }}>
      {renderForm()}
    </div>
  );
}

export default App;
