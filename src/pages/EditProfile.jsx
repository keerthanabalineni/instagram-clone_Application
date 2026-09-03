import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/**
 * EditProfile Page
 * Allows users to edit their profile information and avatar
 */
export default function EditProfile() {
  // ========== STATE & CONTEXT ==========
  const { profile, updateProfile } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState(profile);

  // ========== HANDLERS ==========
  /**
   * Handle input field changes
   */
  const handleInputChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handle avatar image upload
   */
  const handleAvatarChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setForm(current => ({
          ...current,
          avatar: reader.result,
        }));
      reader.readAsDataURL(file);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = e => {
    e.preventDefault();
    updateProfile(form);
    navigate('/profile');
  };

  // ========== FORM FIELDS ==========
  const inputFields = [
    ['name', 'Name'],
    ['username', 'Username'],
    ['website', 'Website'],
    ['location', 'Location'],
  ];

  // ========== RENDER ==========
  return (
    <div className="page narrow">
      <h1>Edit profile</h1>

      <form className="edit-profile" onSubmit={handleSubmit}>
        {/* Avatar Section */}
        <div className="edit-avatar">
          <img src={form.avatar} alt="" />
          <label>
            Change photo
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        {/* Text Input Fields */}
        {inputFields.map(([fieldName, label]) => (
          <label key={fieldName}>
            {label}
            <input
              name={fieldName}
              value={form[fieldName]}
              onChange={handleInputChange}
            />
          </label>
        ))}

        {/* Bio Textarea */}
        <label>
          Bio
          <textarea
            name="bio"
            rows="4"
            value={form.bio}
            onChange={handleInputChange}
          />
        </label>

        {/* Submit Button */}
        <button className="primary">Save changes</button>
      </form>
    </div>
  );
}
