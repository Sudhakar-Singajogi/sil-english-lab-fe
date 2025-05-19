const userFormSchema = [
  {
    name: "fullName",
    label: "Full Name",
    required: true,
    errorMessage: "Full name is required.",
    col: 6,
    icon: "bi bi-person-vcard",
    section: "Basic Info",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    errorMessage: "Email is required and must be valid.",
    asyncValidate: async (value) => {
      // simulate API check (replace with real one)
      const exists = ["sudhakar@example.com"].includes(value.toLowerCase());
      if (exists) throw new Error("This email is already taken.");
    },
    col: 6,
    icon: "bi bi-envelope",
    section: "Basic Info",
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    col: 12,
    icon: "bi bi-phone-vibrate",
    section: "Basic Info",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    icon: "bi bi-people",
    options: [
      { label: "System Admin", value: "system-admin" },
      { label: "Super Admin", value: "super-admin" },
      { label: "Teacher", value: "teacher" },
      { label: "Student", value: "student" },
    ],
    col: 6,
    section: "Access Info",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    icon: "bi bi-toggle-on",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
    col: 6,
    section: "Access Info",
  },
];

export default userFormSchema;
