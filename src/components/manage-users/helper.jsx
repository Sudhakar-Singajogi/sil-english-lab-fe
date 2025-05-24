export const validateUserForm = () => {

}

export const  generateStrongPassword = (length = 8) => {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // no O
  const lower = "abcdefghijkmnopqrstuvwxyz"; // no l
  const numbers = "23456789"; // no 0,1
  const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?";
  
  const all = upper + lower + numbers + symbols;

  let password = "";
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = password.length; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  // Shuffle password to prevent predictable patterns
  return password.split('').sort(() => 0.5 - Math.random()).join('');
}

