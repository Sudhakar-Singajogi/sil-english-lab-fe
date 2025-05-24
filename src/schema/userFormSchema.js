import { checkEmailExists } from "../utils/debouncedValidators";

const userFormSchema = [
  {
    name: "fullName",
    label: "Full Name",
    errorMessage: "Full name is required.",
    col: 6,
    required: true,
    icon: "bi bi-person-vcard",
    section: "Basic Info",
    asyncValidate: async (value) => {
      if(value === '') throw new Error("Please enter your full name."); 
    },

  },
  {
    name: "email",
    label: "Email",
    type: "text",
    required: true,
    errorMessage: "Email is required and must be valid.",
    asyncValidate: async (value, initVal) => {
      console.log('heye')
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        throw new Error("Please enter a valid email.");
      }
      const exists = await checkEmailExists(value)
      
      if(value === initVal) return //this check to see whether user has changed their email while updating the user
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
    required:true,
    col: 6,
    icon: "bi bi-phone-vibrate",
    section: "Basic Info",
  },
  {
    name: "class",
    label: "Class",
    type: "select",
    col: 6,
    icon: "bi bi-bar-chart-steps",
    className: "cls-sec",
    options: [
      { value: 1, label: "Class I" },
      { value: 2, label: "Class II" },
      { value: 3, label: "Class III" },
      { value: 4, label: "Class IV" },
      { value: 5, label: "Class V" },
      { value: 6, label: "Class VI" },
      { value: 7, label: "Class VII" },
      { value: 8, label: "Class VIII" },
      { value: 9, label: "Class IX" },
      { value: 10, label: "Class X" },
    ],
    section: "Basic Info",
  },
  {
    name: "section",
    label: "Section",
    type: "select",
    col: 6,
    icon: "bi bi-sign-intersection-y",
    className: "cls-sec",
    options: [
      { value: "A", label: "Section-A" },
      { value: "B", label: "Section-B" },
      { value: "C", label: "Section-C" },
    ],
    section: "Basic Info",
  },
  {
    name: "school",
    label: "School",
    type: "select",
    col: 6,
    icon: "bi bi-buildings",
    className: "cls-sec",
    options: [ 
    ],
    section: "Basic Info",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    icon: "bi bi-people",
    required: true,
    asyncValidate: async (value) => {
      if(value !== 'student' && value !== 'teacher' && value !== 'system-admin' && value !== 'super-admin') {
        throw new Error("Role is required."); 

      }
    },
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
    required: true,
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
