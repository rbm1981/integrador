async function calculateAge (birthday) {
  // birthday is a string in format YYYYMMDD
  const birthDate = new Date(birthday);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

module.exports = { calculateAge };