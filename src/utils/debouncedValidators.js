import { fetchUserByEmail } from "../components/manage-users/Service";

const cache = {};
let timer = null;

export function checkEmailExists(email) {
  return new Promise((resolve, reject) => {
    if (!email) return resolve(false);

    if (cache[email]) return resolve(cache[email]);

    if (timer) clearTimeout(timer);

    timer = setTimeout(async () => {
      try {
        const response = await fetchUserByEmail(email);
        const exists = response.resultTotal > 0;
        cache[email] = exists;

        resolve(exists);
      } catch (err) {
        reject(err);
      }
    }, 600);
  });
}
