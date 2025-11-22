import React from "react";
import { Bsca } from "../bsca";
import { Upolnom } from "../Upolnomochivanie/upoln";
import iso from '../../../../Pictures/iso.png'

export const LogoBlock = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "30px",
                marginTop: "34px",
                padding: "0 20px",
                boxSizing: "border-box",
            }}
        >
            <div>
                <Bsca />
            </div>

            <div>
                <Upolnom />
            </div>

            <div style={{ height: "120%" }}>
                <img
                    src={iso}
                    alt="BGCA"
                    style={{
                        height: "120%",
                        objectFit: "contain",
                    }}
                />
            </div>
        </div>
    );
};