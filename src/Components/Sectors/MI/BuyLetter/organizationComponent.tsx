import React, { useState } from "react";
import { OrganizatiosType } from "./LatterBuyEquipment";

type OdganizationComponentType = {
    organizations: OrganizatiosType;
    onSave?: (data: OrganizatiosType) => void;
    onDelete?: (id: string) => void;
};

export const OdganizationComponent = (props: OdganizationComponentType) => {
    const [formData, setFormData] = useState(props.organizations);

   
    const handleChange = (field: keyof OrganizatiosType, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (props.onSave) {
            props.onSave(formData);
        } 
    };
    const handleDelete = () => {
        if (props.onDelete) {
            props.onDelete(formData.id);
        }
    };

    return (
        <div
            style={{
                width: "300px",
                border: "1px solid #151313",
                padding: "10px",
                backgroundColor: "#fff",
                marginLeft: '10px'
            }}
        >

            <div style={{ marginBottom: "8px" }}>
                <div style={{ marginBottom: "4px", fontWeight: "bold" }}>Название:</div>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    style={{
                        width: "100%",
                        padding: "4px",
                        boxSizing: "border-box",
                        border: "1px solid #aaa",
                    }}
                />
            </div>

            <div style={{ marginBottom: "8px" }}>
                <div style={{ marginBottom: "4px", fontWeight: "bold" }}>Адрес:</div>
                <textarea
                    value={formData.adress}
                    onChange={(e) => handleChange("adress", e.target.value)}
                    rows={3}
                    style={{
                        width: "100%",
                        padding: "4px",
                        boxSizing: "border-box",
                        border: "1px solid #aaa",
                        resize: "vertical",
                    }}
                />
            </div>

            <div style={{ marginBottom: "10px" }}>
                <div style={{ marginBottom: "4px", fontWeight: "bold" }}>Email:</div>
                <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    style={{
                        width: "100%",
                        padding: "4px",
                        boxSizing: "border-box",
                        border: "1px solid #aaa",
                    }}
                />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    onClick={handleSave}
                    style={{
                        padding: "8px 16px",
                        border: "1px solid #ccc",
                        backgroundColor: "#e0e0e0",
                        cursor: "pointer",
                    }}
                >
                    Сохранить
                </button>
                <button
                    onClick={handleDelete}
                    style={{
                        padding: "8px 16px",
                        border: "1px solid #ccc",
                        backgroundColor: "#e0e0e0",
                        cursor: "pointer",
                    }}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
};