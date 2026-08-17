const BASE_URL = 'https://cent-graphics-production.up.railway.app/api'

export const getPalettes = () =>
    fetch(`${BASE_URL}/palettes`).then(res => res.json());

export const loginUser = (formData) =>
    fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(res => res.json());

export const registerUser = (formData) =>
    fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(res => res.json());

export const savePalette = (id, token) =>
    fetch(`${BASE_URL}/palettes/${id}/save`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json());

export const removePalette = (id, token) =>
    fetch(`${BASE_URL}/palettes/${id}/save`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json());