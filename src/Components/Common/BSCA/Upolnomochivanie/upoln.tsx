import React from "react";

export const Upolnom = () => {


    const centerBlockStyle: React.CSSProperties = {
        textAlign: "center",
        // width: "10%",
        border: "1px solid: black" 
      };

      
    return (
        <>
          <div style={centerBlockStyle}>
            <div style={{ fontSize: "10pt",  }}>
              Свидетельство об
            </div>
    
            <div
              style={{
                fontSize: "10pt",
                marginTop: "2px",
                marginBottom: "2px",
              }}
            >
              уполномочивании
            </div>
    
            <div style={{ fontSize: "10pt" }}>№16</div>
          </div>
        </>
      );
}