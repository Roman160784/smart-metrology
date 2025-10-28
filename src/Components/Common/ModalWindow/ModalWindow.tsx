import React from "react";
import st from "./confirmModal.module.css";

type ConfirmModalProps = {
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title = "Подтверждение",
  message = "Вы уверены, что хотите удалить все данные?",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={st.modalOverlay}>
      <div className={st.modalWindow}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={st.modalButtons}>
          <button className={st.btnConfirm} onClick={onConfirm}>
            Да
          </button>
          <button className={st.btnCancel} onClick={onCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};