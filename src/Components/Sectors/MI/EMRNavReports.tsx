import React from 'react';
import { NavLink} from 'react-router-dom'; 


export enum pathEMREnum {
    attestation = '/attestation',
    AttestationIO = '/AttestationIO',
    
}


export const EmirNavReports = () => {
    return (
        <nav style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            backgroundColor: '#f5f5f5'
        }}>
            <div style={{
                marginBottom: '10px',
                padding: '5px'
            }}>
                <NavLink 
                    to={pathEMREnum.AttestationIO}
                    style={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                >
                    <span 
                        style={{ 
                            borderRadius: '3px',
                            border: '1px solid #ddd',
                            padding: '4px 8px',
                            display: 'inline-block',
                            backgroundColor: '#fff',
                            color: '#333',
                            fontSize: '14px',
                            fontFamily: 'Arial, sans-serif',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Атестация ИО
                    </span>
                </NavLink>
            </div>
        </nav>
    )
}